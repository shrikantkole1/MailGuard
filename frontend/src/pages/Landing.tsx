/**
 * Advanced Landing Page - Email Threat Triage Platform
 * Features: Particle effects, gradient animations, scroll reveals, 3D cards
 */

import React, { useState, useEffect } from 'react';
import {
    Shield,
    Zap,
    Eye,
    Lock,
    ArrowRight,
    CheckCircle,
    Activity,
    Brain,
    Network,
    Gauge,
    FileSearch,
    AlertTriangle,
    Sparkles
} from 'lucide-react';

interface LandingProps {
    onEnterDashboard: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnterDashboard }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Parallax effect calculation
    const parallaxOffset = scrollY * 0.5;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden">

            {/* Animated Background Gradient */}
            <div className="fixed inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-shift" />
            </div>

            {/* Mouse-following gradient orb */}
            <div
                className="fixed w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            />

            {/* Particle Grid Background */}
            <div className="fixed inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(96, 165, 250, 0.3) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Content Container */}
            <div className="relative z-10">

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-gray-900/50 border-b border-cyan-500/20">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                        Archestra AI
                                    </h1>
                                    <p className="text-xs text-gray-400">Threat Triage Platform</p>
                                </div>
                            </div>

                            <button
                                onClick={onEnterDashboard}
                                className="group px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
                            >
                                Launch Dashboard
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-6" style={{ transform: `translateY(-${parallaxOffset}px)` }}>

                            {/* Floating badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300 animate-float">
                                <Sparkles className="w-4 h-4" />
                                <span>Powered by Archestra AI Platform</span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                                <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-gradient-text">
                                    Autonomous
                                </span>
                                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Email Security
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Stop threats in <span className="text-cyan-400 font-semibold">under 3 seconds</span> with
                                AI-powered orchestration of security tools. Full auditability. Zero compromises.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                                <button
                                    onClick={onEnterDashboard}
                                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105"
                                >
                                    <Zap className="w-5 h-5" />
                                    Try Live Demo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>

                                <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                                    <Eye className="w-5 h-5" />
                                    Watch Demo Video
                                </button>
                            </div>

                            {/* Stats Bar */}
                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
                                <div className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">2.1s</div>
                                    <div className="text-sm text-gray-400 mt-1">Avg Analysis Time</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">99.7%</div>
                                    <div className="text-sm text-gray-400 mt-1">Detection Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">4x</div>
                                    <div className="text-sm text-gray-400 mt-1">Faster than Manual</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image / Dashboard Preview */}
                        <div className="relative mt-20" style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
                            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="h-4 bg-gradient-to-r from-cyan-500/30 to-transparent rounded w-3/4" />
                                            <div className="h-4 bg-gradient-to-r from-cyan-500/20 to-transparent rounded w-5/6" />
                                            <div className="h-4 bg-gradient-to-r from-cyan-500/10 to-transparent rounded w-2/3" />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="relative">
                                                <svg className="w-32 h-32 transform -rotate-90">
                                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700" />
                                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-cyan-500" strokeDasharray="352" strokeDashoffset="88" strokeLinecap="round" />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-cyan-400">75</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                                    Enterprise-Grade Security
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400">Governed AI. Observable Decisions. Production-Ready.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Brain,
                                    title: "AI Agent Orchestration",
                                    description: "Pydantic AI coordinates 4 security tools in parallel for 62% faster analysis",
                                    color: "from-cyan-500 to-blue-600"
                                },
                                {
                                    icon: Network,
                                    title: "MCP-Native Architecture",
                                    description: "Modular tool mesh with independent scaling and fault isolation",
                                    color: "from-blue-500 to-purple-600"
                                },
                                {
                                    icon: Gauge,
                                    title: "Weighted Risk Scoring",
                                    description: "Scientific threat calculation: 35% attachment, 30% domain, 20% URL, 15% social",
                                    color: "from-purple-500 to-pink-600"
                                },
                                {
                                    icon: FileSearch,
                                    title: "Full Audit Trails",
                                    description: "Every decision logged with tool inputs, outputs, and execution timing",
                                    color: "from-pink-500 to-red-600"
                                },
                                {
                                    icon: Lock,
                                    title: "Governance Policies",
                                    description: "RBAC, rate limiting, approval workflows for high-stakes actions",
                                    color: "from-emerald-500 to-cyan-600"
                                },
                                {
                                    icon: Activity,
                                    title: "OpenTelemetry Ready",
                                    description: "Distributed tracing, metrics collection, and SIEM integration",
                                    color: "from-yellow-500 to-orange-600"
                                }
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    style={{
                                        animationDelay: `${idx * 100}ms`
                                    }}
                                >
                                    {/* Glow effect on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />

                                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                                    How It Works
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400">3-second threat analysis pipeline</p>
                        </div>

                        <div className="relative">
                            {/* Connection Lines */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent hidden lg:block" />

                            <div className="grid lg:grid-cols-4 gap-8">
                                {[
                                    {
                                        step: "01",
                                        title: "Email Submitted",
                                        description: "SOC analyst or automated gateway forwards suspicious email",
                                        icon: "📧"
                                    },
                                    {
                                        step: "02",
                                        title: "Agent Orchestrates",
                                        description: "Pydantic AI spawns 4 parallel MCP tool executions",
                                        icon: "🤖"
                                    },
                                    {
                                        step: "03",
                                        title: "Tools Analyze",
                                        description: "Domain, URL, File, and Social Engineering checks run simultaneously",
                                        icon: "🔍"
                                    },
                                    {
                                        step: "04",
                                        title: "Verdict Delivered",
                                        description: "Weighted risk score, classification, and recommended action returned",
                                        icon: "✅"
                                    }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:scale-105">
                                            {/* Step number badge */}
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                                {step.step}
                                            </div>

                                            <div className="text-center mt-8">
                                                <div className="text-4xl mb-4">{step.icon}</div>
                                                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                                                <p className="text-gray-400 text-sm">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-12 text-center overflow-hidden">
                            {/* Animated background */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
                            </div>

                            <div className="relative z-10">
                                <AlertTriangle className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
                                <h2 className="text-4xl font-bold mb-4">
                                    Stop Threats Before They Strike
                                </h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    Join the next generation of autonomous security operations
                                </p>

                                <button
                                    onClick={onEnterDashboard}
                                    className="group px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 inline-flex items-center gap-4 hover:scale-110"
                                >
                                    Launch Dashboard
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">Archestra AI</div>
                                    <div className="text-xs text-gray-500">Email Threat Triage Platform</div>
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <p className="text-gray-400 text-sm">
                                    Built with FastAPI, Pydantic AI, React & TypeScript
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Production-Ready • MCP-Native • Fully Observable
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <style>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes gradient-text {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-gradient-shift {
                    background-size: 200% 200%;
                    animation: gradient-shift 8s ease infinite;
                }
                
                .animate-gradient-text {
                    background-size: 200% auto;
                    animation: gradient-text 3s linear infinite;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};
