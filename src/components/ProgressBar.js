import React from 'react';
export function ProgressBar({ className = "", percent = 0, trackRemaining = false }) {
    percent = (trackRemaining) ? 100 - percent : percent;
    return (<div className={`ProgressBar ${className} ${trackRemaining ? 'reverse' : ''}`}>
        <div style={{ width: `${percent}%` }}></div>
    </div>);
}
