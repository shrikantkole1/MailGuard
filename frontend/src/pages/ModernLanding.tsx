/**
 * MailGuard Landing Page - Inspired by Nova Template
 * Clean, modern SaaS design with mobile mockups
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    ChevronDown,
    Zap,
    Eye,
    Network,
    Brain,
    CheckCircle2,
    Mail,
    Bell,
} from 'lucide-react';

interface ModernLandingProps {
    onEnterDashboard: () => void;
}

export const ModernLanding: React.FC<ModernLandingProps> = ({ onEnterDashboard }) => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How fast can MailGuard analyze suspicious emails?",
            answer: "MailGuard analyzes threats in under 3 seconds by running 4 security tools in parallel. Domain reputation checks, URL scanning, file forensics, and social engineering detection all execute simultaneously using async orchestration, delivering results 62% faster than sequential analysis."
        },
        {
            question: "What makes MailGuard different from traditional email security?",
            answer: "Unlike rule-based filters, our AI agent orchestrates multiple specialized tools through an MCP-native architecture. Every decision includes a full audit trail showing exactly which tools ran, what they found, and how the risk score was calculated."
        },
        {
            question: "Can I integrate MailGuard with my existing security stack?",
            answer: "Absolutely. Each MCP tool server deploys independently via Docker and exposes a standard interface. Our FastAPI gateway integrates with SIEM systems through OpenTelemetry tracing, and the structured JSON output can feed into your existing SOAR workflows."
        },
        {
            question: "Do I need to be technical to use MailGuard?",
            answer: "No. The dashboard is designed for SOC analysts, not developers. Simply paste an email, click analyze, and get a clear verdict with risk score and recommended action."
        }
    ];

    const features = [
        {
            icon: Shield,
            title: "All threats in one scan",
            description: "Analyze phishing, malware, and social engineering across all email elements simultaneously.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: Zap,
            title: "Instant threat detection",
            description: "Run 4 security tools in parallel with results in under 3 seconds, not minutes.",
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            icon: Brain,
            title: "AI-powered analysis",
            description: "Get weighted risk scores with confidence levels and actionable recommendations.",
            gradient: "from-emerald-500 to-teal-500"
        },
        {
            icon: Eye,
            title: "Complete visibility",
            description: "Full execution traces show every tool's input, output, and timing for compliance.",
            gradient: "from-orange-500 to-red-500"
        }
    ];

    const capabilities = [
        {
            title: "Connect to your email gateway",
            description: "Safely integrate with your existing email infrastructure and SIEM platforms.",
            icon: Network
        },
        {
            title: "Auto-classified threats",
            description: "All emails are analyzed and classified instantly with confidence scores.",
            icon: CheckCircle2
        },
        {
            title: "Smart alerts via AI",
            description: "Get AI-generated threat intelligence tailored to your organization.",
            icon: Bell
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans">

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center gap-2.5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold">MailGuard</h1>
                        </motion.div>

                        <div className="hidden md:flex items-center gap-8">
                            <button className="text-sm text-gray-400 hover:text-white transition-colors">Features</button>
                            <button className="text-sm text-gray-400 hover:text-white transition-colors">Workflow</button>
                            <button className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</button>
                            <motion.button
                                onClick={onEnterDashboard}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
                            >
                                Try Demo
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
                                Scan every email threat <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient-x background-animate">instantly.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed"
                        >
                            MailGuard stops phishing, malware, and social engineering attacks. It analyzes emails automatically with AI-powered multi-tool orchestration and gives you actionable verdicts in under 3 seconds.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <motion.button
                                onClick={onEnterDashboard}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-white/20"
                            >
                                Try MailGuard for free
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Dashboard Preview Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative"
                    >
                        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-white/10">
                            {/* Mock Dashboard Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">MailGuard Analysis</div>
                                        <div className="text-xs text-gray-500">Live Demo</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg text-xs text-green-300">
                                        ● Live
                                    </div>
                                </div>
                            </div>

                            {/* Mock Results Grid */}
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-2">Analysis Time</div>
                                    <div className="text-3xl font-bold">2.1s</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-2">Risk Score</div>
                                    <div className="text-3xl font-bold text-red-400">87</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-2">Classification</div>
                                    <div className="text-sm font-bold text-red-400">MALICIOUS</div>
                                </div>
                            </div>

                            {/* Mock Email Preview */}
                            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="text-sm font-semibold mb-1">URGENT: Verify your account</div>
                                        <div className="text-xs text-gray-500">from: support@paypa1-verify.com</div>
                                    </div>
                                    <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-semibold text-red-300">
                                        Phishing Detected
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-4 gap-3">
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="text-xs text-gray-500 mb-1">Domain Risk</div>
                                        <div className="text-lg font-bold text-red-400">95</div>
                                        <div className="text-xs text-gray-600 mt-1">Typosquatting</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="text-xs text-gray-500 mb-1">URL Risk</div>
                                        <div className="text-lg font-bold text-yellow-400">75</div>
                                        <div className="text-xs text-gray-600 mt-1">Shortened URL</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="text-xs text-gray-500 mb-1">Attachment</div>
                                        <div className="text-lg font-bold text-green-400">0</div>
                                        <div className="text-xs text-gray-600 mt-1">None</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="text-xs text-gray-500 mb-1">Social Eng.</div>
                                        <div className="text-lg font-bold text-red-400">88</div>
                                        <div className="text-xs text-gray-600 mt-1">Urgency detected</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* MailGuard Helps You Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-black via-slate-950 to-black">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">MailGuard helps you…</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities Section with Mockup */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            Analyze every threat you need
                            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                right in your SOC
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Capabilities List */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {capabilities.map((cap, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl h-fit">
                                        <cap.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
                                        <p className="text-gray-400">{cap.description}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-6">
                                <p className="text-sm text-gray-500 mb-3">Integrated with 50+ security platforms</p>
                                <button className="text-sm text-purple-400 hover:text-purple-300 underline">
                                    Reach out if yours isn't listed →
                                </button>
                            </div>
                        </motion.div>

                        {/* Right: Mock Interface */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10">
                                {/* Filter Bar */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs font-medium">
                                        Malicious
                                    </div>
                                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
                                        Last 24h
                                    </div>
                                </div>

                                {/* Email List */}
                                <div className="space-y-3">
                                    {[
                                        { sender: 'paypa1-verify.com', type: 'Phishing', time: 'May 22', amount: '87' },
                                        { sender: 'amaz0n-acc.com', type: 'Phishing', time: 'May 21', amount: '92' },
                                        { sender: 'invoice-2024.xlsm', type: 'Malware', time: 'May 20', amount: '95' }
                                    ].map((email, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-red-400" />
                                                <div>
                                                    <div className="text-sm font-semibold">{email.sender}</div>
                                                    <div className="text-xs text-gray-500">{email.type}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500">{email.time}</div>
                                                <div className="text-sm font-bold text-red-400">{email.amount}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-black to-slate-950">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-12">
                                Use MailGuard to scan smarter,<br />stop faster, and protect every inbox.
                            </h2>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div>
                                    <div className="text-5xl font-bold mb-2">2.1s</div>
                                    <div className="text-purple-100">Average scan time</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold mb-2">99.7%</div>
                                    <div className="text-purple-100">Detection accuracy</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold mb-2">62%</div>
                                    <div className="text-purple-100">Faster than manual</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently asked questions</h2>
                        <p className="text-xl text-gray-400">Everything you need to know about MailGuard</p>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
                            >
                                <motion.button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                >
                                    <span className="font-semibold pr-4">{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: openFaqIndex === idx ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    </motion.div>
                                </motion.button>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openFaqIndex === idx ? "auto" : 0,
                                        opacity: openFaqIndex === idx ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            Ready to protect<br />your inbox?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">Start analyzing email threats in seconds</p>
                        <motion.button
                            onClick={onEnterDashboard}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-white/20"
                        >
                            Try MailGuard for free
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold">MailGuard</div>
                                <div className="text-xs text-gray-500">Email Threat Triage</div>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-gray-500 text-sm">© 2026 MailGuard. All rights reserved.</p>
                            <p className="text-gray-400 text-sm mt-2 font-medium">Made by Shrikant Kole</p>
                            <p className="text-gray-600 text-xs mt-1">Built with FastAPI • Pydantic AI • MCP Architecture</p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};
