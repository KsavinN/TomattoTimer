import React from 'react';
import classnames from 'classnames';

export function ProgressBar({ className = "", percent = 0, trackRemaining = false , color = null }) {
    let progressClassName = classnames(
        "progress ",
        className,
        {
            "progress--reverse": trackRemaining === true,
            "progress--color-red": color === "red"
        }
    )
    percent = (trackRemaining) ? 100 - percent : percent;
    return (<div className={progressClassName}>
        <div className={`progress__bar`} style={{ width: `${percent}%` }}></div>
    </div>);
}
