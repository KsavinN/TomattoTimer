import React from 'react';
// import classnames from 'classnames';
import PropTypes from "prop-types";

export function ProgressArc({ className = "", percent = 0, trackRemaining = false , color = null }) {
    
    // let progressClassName = classnames(
    //     "progress ",
    //     className,
    //     {
    //         "progress--reverse": trackRemaining === true,
    //         "progress--color-red": color === "red",
    //         "progress--color-blue": color === "blue",
    //         "progress--color-green": color === "green",
    //     }
    // )
    percent = (trackRemaining) ? 100 - percent : percent;
    return <CanvasProgressArc percent={percent} size={200} />
}


class CanvasProgressArc extends React.Component {
    constructor (props) {
        super(props)
        this.canvas = React.createRef();
        this.time = 0;
    }

    draw() {
        const ctx = this.canvas.current.getContext('2d');
        const { percent, size, color } = this.props;
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = color || 'red';
        ctx.beginPath();
        ctx.arc(size/2,size/2,50,0,Math.PI*2*percent/100);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(size/2,size/2,25,0,Math.PI*2);
        ctx.fill();
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    render() {
        const { size } = this.props;
        return (<canvas ref={this.canvas} width={size} height={size} />)
    }
}


const properPercentProp = (props, propName, componentName) => {
    const percent = props[propName];
    if (percent < 0 || percent > 100 || percent == null) {
        throw new Error(`invalid prop ${propName} in ${componentName} should be greater than 0 less than 100`);
    }
}

ProgressArc.propTypes = {
    percent: properPercentProp,
    color:  PropTypes.oneOf(['red','green','blue'])
}