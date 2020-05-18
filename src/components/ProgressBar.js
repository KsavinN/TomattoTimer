import React from 'react';
export function ProgressBar({ className = "", percent = 0, trackRemaining = false }) {
    percent = (trackRemaining) ? 100 - percent : percent;
    return (<div className={`progress ${className} ${trackRemaining ? 'progress--reverse' : ''}`}>
        <div className={`progress__bar progress--color-red`} style={{ width: `${percent}%` }}></div>
    </div>);
}
