"""
Security Triage Agent - Pydantic AI Implementation
Archestra-Native Orchestration Layer

This agent orchestrates MCP tools to perform autonomous email threat triage.
Uses Pydantic AI for structured outputs and type-safe orchestration.
"""

from typing import List, Optional, Dict, Any
from enum import Enum
from pydantic import BaseModel, Field, EmailStr
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
import structlog
from datetime import datetime

# Initialize structured logging
logger = structlog.get_logger()


# ============================================================================
# STRUCTURED OUTPUT MODELS (Type-Safe Agent Responses)
# ============================================================================

class ThreatClassification(str, Enum):
    """Email threat classification levels"""
    SAFE = "safe"
    SUSPICIOUS = "suspicious"
    MALICIOUS = "malicious"


class RecommendedAction(str, Enum):
    """Recommended security actions"""
    ALLOW = "allow"
    WARN_USER = "warn_user"
    QUARANTINE = "quarantine"
    BLOCK_SENDER = "block_sender"
    ESCALATE_TO_SOC = "escalate_to_soc"


class ToolExecutionTrace(BaseModel):
    """Single tool execution record for audit trail"""
    tool_name: str
    called_at: str
    input_params: Dict[str, Any]
    output_summary: str
    execution_time_ms: Optional[int] = None


class AggregatedScores(BaseModel):
    """Risk scores from all analysis tools"""
    url_risk: int = Field(ge=0, le=100, default=0)
    domain_risk: int = Field(ge=0, le=100, default=0)
    attachment_risk: int = Field(ge=0, le=100, default=0)
    social_engineering_risk: int = Field(ge=0, le=100, default=0)


class SecurityVerdict(BaseModel):
    """
    Primary structured output from the Security Agent.
    This is what Archestra returns to the frontend.
    """
    email_metadata: Dict[str, str]
    tool_execution_trace: List[ToolExecutionTrace]
    aggregated_scores: AggregatedScores
    final_risk_score: int = Field(ge=0, le=100, description="Weighted total risk")
    classification: ThreatClassification
    recommended_action: RecommendedAction
    reasoning_summary: str = Field(description="Human-readable explanation")
    confidence_percentage: int = Field(ge=0, le=100, default=85)
    archestra_metadata: Dict[str, Any] = Field(default_factory=dict)


# ============================================================================
# RISK SCORING ENGINE
# ============================================================================

class RiskScoringEngine:
    """
    Deterministic risk scoring based on weighted threat indicators.
    
    Weights:
    - Malicious Attachment: 35
    - Blacklisted Domain: 30
    - Newly Registered Domain: 20
    - Suspicious URL: 20
    - Social Engineering: 15
    """
    
    WEIGHTS = {
        "attachment": 35,
        "domain_blacklist": 30,
        "domain_new": 20,
        "url": 20,
        "social_engineering": 15
    }
    
    @staticmethod
    def calculate_risk(scores: AggregatedScores) -> int:
        """
        Calculate weighted risk score from component scores.
        Returns: 0-100 normalized risk score
        """
        # Weighted sum
        total = 0
        
        # Attachment risk (weight: 35)
        total += (scores.attachment_risk / 100) * RiskScoringEngine.WEIGHTS["attachment"]
        
        # Domain risk (weight: 30 for blacklist, 20 for new domain)
        # Simplified: use full domain risk with combined weight
        total += (scores.domain_risk / 100) * (RiskScoringEngine.WEIGHTS["domain_blacklist"])
        
        # URL risk (weight: 20)
        total += (scores.url_risk / 100) * RiskScoringEngine.WEIGHTS["url"]
        
        # Social engineering (weight: 15)
        total += (scores.social_engineering_risk / 100) * RiskScoringEngine.WEIGHTS["social_engineering"]
        
        # Normalize to 0-100
        return min(int(total), 100)
    
    @staticmethod
    def classify_risk(risk_score: int) -> ThreatClassification:
        """Classify risk score into threat category"""
        if risk_score >= 61:
            return ThreatClassification.MALICIOUS
        elif risk_score >= 31:
            return ThreatClassification.SUSPICIOUS
        else:
            return ThreatClassification.SAFE
    
    @staticmethod
    def recommend_action(
        classification: ThreatClassification,
        scores: AggregatedScores
    ) -> RecommendedAction:
        """Determine recommended action based on classification and scores"""
        
        if classification == ThreatClassification.MALICIOUS:
            # Critical attachment or blacklisted domain → Block
            if scores.attachment_risk > 80 or scores.domain_risk > 80:
                return RecommendedAction.BLOCK_SENDER
            else:
                return RecommendedAction.QUARANTINE
        
        elif classification == ThreatClassification.SUSPICIOUS:
            # Moderate threat → Warn or escalate
            if scores.social_engineering_risk > 60:
                return RecommendedAction.ESCALATE_TO_SOC
            else:
                return RecommendedAction.WARN_USER
        
        else:
            return RecommendedAction.ALLOW


# ============================================================================
# PYDANTIC AI AGENT DEFINITION
# ============================================================================

# Define the agent with structured output
security_agent = Agent(
    "openai:gpt-4o",  # Or use Archestra's configured model
    result_type=SecurityVerdict,
    system_prompt="""
You are an autonomous security triage agent operating within Archestra AI.

Your purpose is to analyze suspicious email content and produce structured security assessments.

OPERATIONAL RULES:
1. Parse the email input into structured components
2. Determine which MCP tools to invoke based on email content
3. Call tools in logical order (can parallelize independent checks)
4. Aggregate all tool outputs
5. Calculate weighted risk score using the defined scoring model
6. Classify the threat level
7. Recommend an appropriate security action
8. Provide clear reasoning for your decision

STRUCTURED OUTPUT REQUIREMENTS:
- You MUST return a SecurityVerdict object
- All risk scores must be 0-100
- Classification must be: safe, suspicious, or malicious
- Reasoning must be concise and evidence-based

GOVERNANCE:
- Never fabricate evidence
- All conclusions must be based on tool outputs
- Maintain full audit trail
- Flag high-stakes actions for human approval

You operate under strict governance policies enforced by Archestra.
""",
    deps_type=str  # Could inject MCP client here
)


# ============================================================================
# AGENT ORCHESTRATION FUNCTION
# ============================================================================

async def analyze_email(
    sender_email: str,
    subject: str,
    body: str,
    attachments: Optional[List[Dict[str, str]]] = None
) -> SecurityVerdict:
    """
    Main orchestration function for email threat triage.
    
    This function:
    1. Prepares email data
    2. Runs Pydantic AI agent
    3. Agent orchestrates MCP tool calls
    4. Returns structured verdict
    
    Args:
        sender_email: Sender's email address
        subject: Email subject line
        body: Email body content
        attachments: Optional list of attachments [{filename, mime_type}]
        
    Returns:
        SecurityVerdict with full analysis and recommendation
    """
    logger.info(
        "agent.analysis_started",
        sender=sender_email,
        subject=subject,
        has_attachments=bool(attachments)
    )
    
    # Prepare email metadata
    email_data = {
        "sender_email": sender_email,
        "subject": subject,
        "body": body,
        "attachments": attachments or [],
        "received_at": datetime.utcnow().isoformat()
    }
    
    # Create analysis prompt for agent
    prompt = f"""
Analyze this suspicious email for security threats:

SENDER: {sender_email}
SUBJECT: {subject}
BODY:
{body}

ATTACHMENTS: {len(attachments) if attachments else 0}
{[att['filename'] for att in (attachments or [])] if attachments else 'None'}

Perform complete security triage using available MCP tools:
1. analyze_attachments() if attachments present
2. check_domain_reputation() for sender verification
3. scan_urls() to check for malicious links
4. detect_social_engineering() for psychological manipulation

Return structured SecurityVerdict with full reasoning.
"""
    
    try:
        # Run Pydantic AI agent
        result = await security_agent.run(prompt)
        
        # Enhance verdict with metadata
        verdict = result.data
        verdict.email_metadata = {
            "sender": sender_email,
            "subject": subject,
            "analyzed_at": datetime.utcnow().isoformat()
        }
        verdict.archestra_metadata = {
            "agent_version": "1.0.0",
            "runtime": "archestra",
            "execution_id": f"exec-{datetime.utcnow().timestamp()}"
        }
        
        logger.info(
            "agent.analysis_completed",
            classification=verdict.classification.value,
            risk_score=verdict.final_risk_score,
            action=verdict.recommended_action.value
        )
        
        return verdict
        
    except Exception as e:
        logger.error("agent.analysis_failed", error=str(e))
        raise


# ============================================================================
# TOOL INTEGRATION HELPERS (For MCP Tool Calls)
# ============================================================================

# These would be injected by Archestra's MCP client
# For now, showing structure

async def call_url_analyzer(body: str) -> Dict:
    """Call URL Analysis MCP server"""
    # In production: mcp_client.call_tool("url_analyzer", "scan_urls", {"email_body": body})
    pass


async def call_domain_analyzer(sender_email: str) -> Dict:
    """Call Domain Reputation MCP server"""
    # In production: mcp_client.call_tool("domain_intel", "check_domain_reputation", {"sender_email": sender_email})
    pass


async def call_attachment_analyzer(attachments: List[Dict]) -> Dict:
    """Call File Forensics MCP server"""
    # In production: mcp_client.call_tool("file_forensics", "analyze_attachments", {...})
    pass


if __name__ == "__main__":
    import asyncio
    
    # Example usage
    async def test():
        verdict = await analyze_email(
            sender_email="attacker@malicious.com",
            subject="URGENT: Verify your account now!",
            body="Click here: http://192.168.1.1/phishing to verify your account immediately.",
            attachments=[{"filename": "invoice.pdf.exe", "mime_type": "application/x-msdownload"}]
        )
        print(verdict.model_dump_json(indent=2))
    
    asyncio.run(test())
