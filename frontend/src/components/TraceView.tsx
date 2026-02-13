/**
 * TraceView Component - Archestra Execution Trace Visualization
 * 
 * This is THE KEY DIFFERENTIATOR for the hackathon.
 * It shows judges how Archestra orchestrates MCP tools.
 * 
 * Displays:
 * - Agent decision flow
 * - MCP tool invocations
 * - Timing and latency
 * - Tool outputs
 */

import React from 'react';
import { Clock, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface ToolExecution {
    tool_name: string;
    called_at: string;
    input_params: Record<string, any>;
    output_summary: string;
    execution_time_ms?: number;
}

interface TraceViewProps {
    trace: ToolExecution[];
    finalVerdict?: {
        classification: string;
        risk_score: number;
        recommended_action: string;
    };
}

export const TraceView: React.FC<TraceViewProps> = ({ trace, finalVerdict }) => {

    const getToolIcon = (toolName: string) => {
        const iconMap: Record<string, string> = {
            'scan_urls': '🔗',
            'check_domain_reputation': '🌐',
            'analyze_attachments': '📎',
            'escalate_to_soc': '🚨',
            'quarantine_user': '🔒',
            'block_sender_domain': '🚫'
        };
        return iconMap[toolName] || '⚙️';
    };

    const getToolColor = (toolName: string) => {
        if (toolName.includes('url')) return 'border-blue-500/30 bg-blue-500/5';
        if (toolName.includes('domain')) return 'border-purple-500/30 bg-purple-500/5';
        if (toolName.includes('attachment')) return 'border-orange-500/30 bg-orange-500/5';
        if (toolName.includes('soc') || toolName.includes('block')) return 'border-red-500/30 bg-red-500/5';
        return 'border-gray-500/30 bg-gray-500/5';
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Archestra Execution Trace</h3>
                <span className="ml-auto text-xs text-gray-400">
                    {trace.length} tool{trace.length !== 1 ? 's' : ''} executed
                </span>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-cyan-500/20" />

                {/* Timeline entries */}
                <div className="space-y-4">

                    {/* Start Node */}
                    <div className="flex items-start gap-4">
                        <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">
                            AI
                        </div>
                        <div className="flex-1 pt-2">
                            <div className="text-sm font-medium text-white">Agent Started</div>
                            <div className="text-xs text-gray-400">Analyzing email content...</div>
                        </div>
                    </div>

                    {/* Tool Executions */}
                    {trace.map((execution, index) => {
                        const icon = getToolIcon(execution.tool_name);
                        const colorClass = getToolColor(execution.tool_name);

                        return (
                            <div key={index} className="flex items-start gap-4">

                                {/* Tool Icon Node */}
                                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-2xl shadow-lg">
                                    {icon}
                                </div>

                                {/* Tool Details Card */}
                                <div className="flex-1">
                                    <div className={`border rounded-lg p-4 ${colorClass}`}>

                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-white mb-1">
                                                    {execution.tool_name.replace(/_/g, ' ').toUpperCase()}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(execution.called_at).toLocaleTimeString()}
                                                </div>
                                            </div>

                                            {execution.execution_time_ms && (
                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Clock className="w-3 h-3" />
                                                    {execution.execution_time_ms}ms
                                                </div>
                                            )}
                                        </div>

                                        {/* Input Parameters (Collapsed) */}
                                        {Object.keys(execution.input_params).length > 0 && (
                                            <div className="mb-2">
                                                <div className="text-xs text-gray-500 mb-1">Input:</div>
                                                <div className="text-xs font-mono text-gray-300 bg-black/20 rounded px-2 py-1 truncate">
                                                    {JSON.stringify(execution.input_params)}
                                                </div>
                                            </div>
                                        )}

                                        {/* Output Summary */}
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            <div className="text-xs text-gray-300 leading-relaxed">
                                                {execution.output_summary}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Final Verdict Node */}
                    {finalVerdict && (
                        <div className="flex items-start gap-4">
                            <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${finalVerdict.classification === 'malicious'
                                    ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/30'
                                    : finalVerdict.classification === 'suspicious'
                                        ? 'bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/30'
                                        : 'bg-gradient-to-br from-green-500 to-green-700 shadow-green-500/30'
                                }`}>
                                {finalVerdict.classification === 'malicious' ? '⛔' : finalVerdict.classification === 'suspicious' ? '⚠️' : '✅'}
                            </div>

                            <div className="flex-1 pt-2">
                                <div className="text-sm font-semibold text-white mb-1">
                                    Final Verdict: {finalVerdict.classification.toUpperCase()}
                                </div>
                                <div className="text-xs text-gray-400">
                                    Risk Score: {finalVerdict.risk_score}/100 • Action: {finalVerdict.recommended_action}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Metadata Footer */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3 h-3" />
                    <span>Powered by Archestra AI • MCP-Native Orchestration</span>
                </div>
            </div>
        </div>
    );
};
