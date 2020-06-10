import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
    
    state = {
        hasError: false
    };

    // static getDerivedStateFromError(error) {
    //     return { hasError: true };
    // }

    componentDidCatch(error, info) {
        console.log("Error apear :", error, info);
    };

    render() {
        const { message, children } = this.props;
        return ( <ErrorMessage message={message} children={children} />)
    }

}

ErrorBoundary.propTypes = {
    // @ts-ignore
    message: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}


export class ErrorMessage extends React.Component {
    render() {
        const { hasError, message, children } = this.props
        return hasError ? message : children;
    }
}