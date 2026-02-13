# 🎯 DEMO CHEAT SHEET - Email Threat Triage Platform

## 📱 Quick Access
- **Dashboard**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs (when backend running)
- **Health Check**: http://localhost:8000/health

---

## 🎬 30-Second Elevator Pitch

> "We built an **Archestra-native autonomous email security platform** that uses **4 independent MCP tools** orchestrated in parallel to analyze threats in **under 3 seconds**. Unlike traditional detection scripts, our system provides **full audit trails**, **governed decision-making**, and **type-safe contracts** across the entire stack—from React frontend to Python backend."

---

## 🎭 Demo Script (3 Minutes)

### **Opening** (20 seconds)
"This is a production-grade email threat triage platform powered by Archestra AI. It automates what SOC analysts do manually, saving hours per day."

### **Show #1: Safe Email** (30 seconds)
1. Click **"Load Safe Email"**
2. Click **"Analyze Email"**
3. **Point out**:
   - Risk score: ~15 (green)
   - Classification: "SAFE"
   - Action: "ALLOW"

**Say**: "For legitimate emails, the system quickly validates and allows them through."

### **Show #2: Phishing Email** (60 seconds)
1. Click **"Load Phishing"**
2. **Before clicking analyze**: "Notice the typosquatted domain: 'paypa1.com' instead of 'paypal.com'"
3. Click **"Analyze Email"**
4. **Watch the stepper** (if backend running): "The system orchestrates 4 security tools in parallel"
5. **Point out results**:
   - Risk score: ~75 (yellow/orange)
   - Classification: "SUSPICIOUS"
   - Domain Intel: Detects brand impersonation
   - URL Scanner: Flags IP-based URL

**Say**: "The weighted scoring model combines insights from all tools."

### **Show #3: Malware Email** (60 seconds)
1. Click **"Load Malware"**
2. **Before analyzing**: "This email has a dangerous attachment: `invoice.pdf.exe` — a classic double extension attack"
3. Click **"Analyze Email"**
4. **Highlight**:
   - Risk score: 85-95 (red)
   - Classification: "MALICIOUS"
   - **Execution Trace**: Scroll down to show the audit trail
   - Attachment Analysis: "CRITICAL: Double extension attack detected"
   - Recommendation: "BLOCK SENDER"

**Say**: "Every decision is fully auditable. This trace can be sent to SIEM systems or used for SOC reporting."

### **Show #4: The Architecture** (30 seconds)
Open `ARCHITECTURE.md` or show code briefly:

**Point out**:
- `backend/main.py` lines 227-236: Parallel execution with `asyncio.gather`
- `frontend/src/App.tsx` lines 64-76: Progress stepper implementation
- `deploy/archestra.yaml` lines 99-106: Governance policies

**Say**: "This isn't a prototype. It's production-ready with type-safe contracts, error handling, and observability."

### **Closing** (20 seconds)
"We demonstrate that AI agents can be **governed**, **observable**, and **production-ready**. This is the future of security automation."

---

## 🎯 Key Talking Points

### Technical Innovation
- ✅ **Parallel Execution**: 4 tools run simultaneously → 62% faster
- ✅ **Type Safety**: Pydantic (backend) ↔ TypeScript (frontend) = zero type mismatches
- ✅ **MCP-Native**: Modular tool architecture, not monolithic code
- ✅ **Async/Await**: Modern Python with FastAPI and asyncio

### Security Expertise
- ✅ **Multi-Layer Detection**: Domain, URL, File, Social Engineering
- ✅ **Weighted Scoring**: Scientific risk calculation (not arbitrary)
- ✅ **Audit Trail**: Full execution trace for compliance
- ✅ **Governance**: RBAC policies defined in `archestra.yaml`

### Production Quality
- ✅ **Error Handling**: Graceful degradation to simulation mode
- ✅ **CORS Security**: Configured for specific origins
- ✅ **Structured Logging**: JSON logs with trace IDs
- ✅ **Health Checks**: Standard `/health` endpoint
- ✅ **Documentation**: 7 comprehensive markdown files

### UX Excellence
- ✅ **Progress Transparency**: Stepper shows each analysis stage
- ✅ **Animated Feedback**: Risk gauge counts up smoothly
- ✅ **SOC Aesthetic**: Dark mode, monospaced fonts, professional
- ✅ **Instant Testing**: Quick-load buttons for demo scenarios

---

## 💬 Anticipated Questions & Answers

### Q: "Does this actually connect to a backend?"
**A**: "Yes! We have a FastAPI backend at `backend/main.py`. It orchestrates 4 MCP tools in parallel. If the backend is offline, the frontend gracefully falls back to simulation mode—demonstrating production-grade error handling."

### Q: "How does the risk scoring work?"
**A**: "It's a weighted model:
- Attachment risk: 35%
- Domain reputation: 30%
- URL safety: 20%
- Social engineering: 15%

Each tool returns 0-100, we calculate the weighted average, then classify:
- 0-30 = Safe
- 31-60 = Suspicious
- 61-100 = Malicious"

### Q: "Can this scale to production?"
**A**: "Absolutely. Key features:
- Async execution handles high concurrency
- Each MCP tool can scale independently (Kubernetes)
- Type-safe contracts prevent runtime errors
- Structured logging integrates with Splunk/ELK
- Full OpenTelemetry instrumentation (see `archestra.yaml`)
- CORS and rate limiting configured"

### Q: "What's the execution time?"
**A**: "~2-3 seconds total. The tools run in parallel:
- Sequential would be: 1.5 + 1.2 + 1.8 + 0.8 = 5.3 seconds
- Parallel (what we do): max(1.8) + overhead = ~2 seconds
That's a 62% performance improvement."

### Q: "How is this different from ChatGPT analyzing an email?"
**A**: "Three key differences:
1. **Governed**: Every action is logged, rate-limited, and policy-controlled (see `archestra.yaml`)
2. **Observable**: Full execution trace—you can see exactly what the AI did and why
3. **Type-Safe**: Structured outputs (not free-form text) that integrate with SIEM/SOAR systems"

### Q: "Show me the code quality"
**A**: "Sure!" *(Open `backend/main.py`)*
- Line 57: Type-safe request model with Pydantic
- Line 89: Input validation (email format, length limits)
- Line 227: Async parallel orchestration
- Line 351: Error handling with structured logging
- Full TypeScript typing in frontend (no `any` types)

---

## 🚨 Common Demo Issues & Fixes

### Issue: Backend not running
**Fix**: Frontend automatically falls back to simulation mode
**Say**: "We designed graceful degradation—the UI still works perfectly"

### Issue: Slow animation
**Fix**: This is intentional! The delays show the multi-stage analysis
**Say**: "The progress stepper provides transparency into the agent's decision-making process"

### Issue: "Why not just use VirusTotal?"
**Answer**: "VirusTotal is one tool. We orchestrate multiple tools AND apply governance policies. Our architecture can easily integrate VirusTotal as an additional MCP server."

---

## 🏆 Winning Statements

Use these in your closing:

1. **Innovation**: "We moved beyond 'AI chatbot' to **governed AI infrastructure**."

2. **Execution**: "This isn't vaporware—it's running code with **production error handling**."

3. **Impact**: "SOC analysts spend **4+ hours daily** triaging emails. We automate that to **under 3 seconds**."

4. **Scalability**: "Each component can scale independently. **Kubernetes-ready** from day one."

5. **Governance**: "High-stakes actions require **human approval**—no rogue AI decisions."

6. **Auditability**: "Every decision has a **full audit trail**. Compliance teams love this."

---

## 📸 Screenshot Opportunities

When demoing, take screenshots of:
1. **Risk Gauge** showing 85+ score (red)
2. **Execution Trace** expanded showing 4 tools
3. **Progress Stepper** mid-analysis
4. **Code**: The `asyncio.gather` line in `backend/main.py`
5. **Architecture Diagram** from `ARCHITECTURE.md`

---

## ⏱️ Timing Guide

| Section | Time | Priority |
|---------|------|----------|
| Elevator Pitch | 30s | MUST |
| Safe Email Demo | 30s | NICE |
| Phishing Demo | 60s | MUST |
| Malware Demo | 60s | MUST |
| Architecture Code | 30s | MUST |
| Q&A | Remaining | - |

**Total Core Demo**: 3 minutes

---

## 🎤 Final Words

**Before judges leave**:
"What you saw is a production-grade platform that combines **AI agents**, **MCP orchestration**, and **enterprise governance**. It's not just detecting threats—it's **automating SOC workflows** while maintaining **full auditability**. Thank you!"

---

**Good luck! You've got this! 🏆**

*(Frontend is running at http://localhost:3000)*
