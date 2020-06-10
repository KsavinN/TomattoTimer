import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";

export function ProgressBar({ className = "", percent = 0, trackRemaining = false , color = null }) {
    let progressClassName = classnames(
        "progress ",
        className,
        {
            "progress--reverse": trackRemaining === true,
            "progress--color-red": color === "red",
            "progress--color-blue": color === "blue",
            "progress--color-green": color === "green",
        }
    )
    percent = (trackRemaining) ? 100 - percent : percent;
    return (<div className={progressClassName}>
        <div className={`progress__bar`} style={{ width: `${percent}%` }}></div>
    </div>);
}

const properPercentProp = (props, propName, componentName) => {
    const percent = props[propName];
    if (percent < 0 || percent > 100 || percent == null) {
        throw new Error(`invalid prop ${propName} in ${componentName} should be greater than 0 less than 100`);
    }
}

ProgressBar.propTypes = {
    percent: properPercentProp,
    color:  PropTypes.oneOf(['red','green','blue'])
}