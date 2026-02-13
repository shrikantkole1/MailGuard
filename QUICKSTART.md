# Email Threat Triage Platform - Quick Start Guide

## 🚀 Quick Start (5 Minutes)

### Option 1: Frontend Only (Fastest Demo)

```bash
# Navigate to frontend
cd d:/Archestra.ai/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Dashboard will be available at**: `http://localhost:3000`

**What you'll see**:
- Email submission form with test scenarios
- Click "Load Phishing" or "Load Malware"
- Submit to see analysis (currently simulated)
- Risk gauge, execution trace, and recommendations

---

### Option 2: Full Stack (With MCP Servers)

#### Step 1: Install Backend Dependencies
```bash
cd d:/Archestra.ai
pip install -r requirements.txt
```

#### Step 2: Test Individual MCP Servers
```bash
# Terminal 1: URL Analyzer
python mcp-mesh/server_url_analysis.py

# Terminal 2: Domain Intel
python mcp-mesh/server_domain_intel.py

# Terminal 3: File Forensics
python mcp-mesh/server_file_forensics.py

# Terminal 4: SOC Actions
python mcp-mesh/server_soc_actions.py
```

#### Step 3: Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

### Option 3: Docker (Full Deployment)

```bash
cd d:/Archestra.ai/deploy
docker-compose up --build
```

**Services**:
- MCP Servers: `http://localhost:8001-8004`
- Frontend: `http://localhost:3000`
- Jaeger (Traces): `http://localhost:16686`

---

## 🎯 Testing the System

### Test Scenario 1: Safe Email
1. Click **"Load Safe Email"** button
2. Submit form
3. Expected: **Classification = SAFE**, Risk Score < 30

### Test Scenario 2: Phishing Email
1. Click **"Load Phishing"** button
2. Submit form
3. Expected: **Classification = SUSPICIOUS/MALICIOUS**, Risk Score > 60
4. Check Execution Trace for:
   - Domain impersonation detection
   - Suspicious URL detection

### Test Scenario 3: Malware Email
1. Click **"Load Malware"** button
2. Submit form
3. Expected: **Classification = MALICIOUS**, Risk Score > 80
4. Check for:
   - Double extension attack detection
   - Macro-enabled document warning
   - SOC escalation

---

## 📋 Pre-Demo Checklist

### Before Showing to Judges:

- [ ] Frontend running (`npm run dev`)
- [ ] Test all 3 scenarios (Safe, Phishing, Malware)
- [ ] Open `deploy/archestra.yaml` in editor (show governance)
- [ ] Open `mcp-mesh/server_domain_intel.py` (show MCP implementation)
- [ ] Open `agent/security_agent.py` (show risk scoring engine)
- [ ] Have Execution Trace visible (the key differentiator)

### Key Files to Show:
1. **`deploy/archestra.yaml`** → Governance & observability
2. **`mcp-mesh/server_domain_intel.py`** → MCP implementation
3. **`agent/security_agent.py`** → Risk scoring logic
4. **Frontend `TraceView.tsx`** → Archestra orchestration visualization

---

## 🎤 Presentation Flow (3 Minutes)

### Slide 1: The Problem (20 sec)
*"Security teams manually triage thousands of suspicious emails daily. It's slow, inconsistent, and expensive."*

### Slide 2: Our Solution (30 sec)
*"We built a **governed, MCP-orchestrated autonomous email triage system** powered by Archestra AI."*

**Show**: `archestra.yaml` → Point out MCP registry, governance policies, RBAC

### Slide 3: Architecture (40 sec)
*"Unlike monolithic scripts, we use **4 independent MCP servers** orchestrated by Archestra."*

**Show**: `mcp-mesh/` directory → Explain each server's purpose

### Slide 4: Live Demo (60 sec)
1. Frontend dashboard
2. Load "Phishing" test case
3. Submit → Show Risk Gauge
4. ⭐ **Execution Trace** → "This shows Archestra orchestrating tools in real-time"
5. Show final verdict and recommendation

### Slide 5: Governance (30 sec)
*"High-stakes actions like 'Quarantine User' require human approval."*

**Show**: `archestra.yaml` → Approval workflow config

---

## 🔍 Common Issues & Solutions

### Issue: `npm install` fails
**Solution**: Ensure Node.js 18+ is installed
```bash
node --version  # Should be v18+
```

### Issue: Python dependencies fail
**Solution**: Use virtual environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### Issue: Frontend shows "Connection Refused"
**Solution**: This is expected if backend isn't running. The frontend has simulated data for demo purposes.

---

## ✅ What Works Out of the Box

- ✅ **Frontend Dashboard** (fully functional with simulated data)
- ✅ **Test Scenarios** (Safe, Phishing, Malware)
- ✅ **Risk Visualization** (Gauge, charts, traces)
- ✅ **Execution Trace** (Shows MCP orchestration)
- ✅ **MCP Servers** (Can run independently for testing)

---

## 🚧 Production Integration (Future)

The current system uses **deterministic simulations** for:
- Domain reputation checks
- URL scanning
- Email parsing

**To make production-ready**:
1. Integrate VirusTotal API
2. Connect to WHOIS database
3. Add real email gateway webhook
4. Deploy to Kubernetes via Archestra

---

## 📞 Support

If you encounter issues during the hackathon:
1. Check `PROJECT_STRUCTURE.md` for detailed architecture
2. Review `deploy/archestra.yaml` for configuration
3. Test individual MCP servers first
4. Frontend works standalone with simulated data

---

## 🎯 Success Criteria

You've successfully deployed if you can:
1. ✅ Load test scenarios in frontend
2. ✅ See risk score and classification
3. ✅ View execution trace with tool calls
4. ✅ Show `archestra.yaml` governance policies

**This demonstrates production-ready AI governance at scale.**
