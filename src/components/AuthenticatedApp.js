import React from 'react'
import Header from './Header';
import TimeBoxList from './TimeBoxList';
import InspirationQuote from './inspirationalQuote';
import ReactDOM from 'react-dom';


function AuthenticatedApp({ onLogout }) {
    return (
        (<>
            <Portal>
                <Header onLogout={onLogout} />
            </Portal>
            <TimeBoxList />
            <InspirationQuote />
        </>)
    )
}

export default AuthenticatedApp;


class Portal extends React.Component {

    element = document.createElement('div');
    root = document.getElementById('root');

    componentDidMount() {
        document.body.insertBefore(this.element, this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.element);
    }

    render() {
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.element)
    }

}