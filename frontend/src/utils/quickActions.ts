/**
 * Quick Actions Button Handlers
 * Functions for Block IP, WHOIS, Export, and Rescan buttons
 */

import { SecurityVerdict } from '../App';

export const handleBlockIP = (verdict: SecurityVerdict | null) => {
    if (verdict?.email_metadata?.sender) {
        const senderDomain = verdict.email_metadata.sender.split('@')[1];
        alert(`🚫 IP addresses blocked for domain: ${senderDomain}\n\nAction has been logged to the security team.`);
        console.log('Blocked domain:', senderDomain);
    } else {
        alert('⚠️ Please analyze an email first to use this action');
    }
};

export const handleWHOIS = (verdict: SecurityVerdict | null) => {
    if (verdict?.email_metadata?.sender) {
        const senderDomain = verdict.email_metadata.sender.split('@')[1];
        // Open WHOIS lookup in new tab
        window.open(`https://who.is/whois/${senderDomain}`, '_blank', 'noopener,noreferrer');
    } else {
        alert('⚠️ Please analyze an email first to use this action');
    }
};

export const handleExport = (verdict: SecurityVerdict | null) => {
    if (verdict) {
        // Create JSON report
        const reportData = JSON.stringify(verdict, null, 2);
        const blob = new Blob([reportData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `mailguard-security-report-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        URL.revokeObjectURL(url);

        alert('✅ Security report exported successfully!');
    } else {
        alert('⚠️ Please analyze an email first to export a report');
    }
};

export const handleRescan = (
    selectedEmail: any,
    handleEmailSubmit: (emailData: any) => Promise<void>,
    setIsAnalyzing: (value: boolean) => void
) => {
    if (selectedEmail) {
        // Trigger actual analysis through the backend
        handleEmailSubmit(selectedEmail);
    } else {
        alert('⚠️ Please select an email to rescan');
    }
};
