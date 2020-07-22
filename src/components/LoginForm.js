import React from 'react';

export default class LoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.EmailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.form = React.createRef();
    }
  
    handleSubmit = (event) => {
        const { email, password } = this.form.current.elements;
        event.preventDefault();
        this.props.onLogin({
            email: email.value,
            password: password.value,
        });
        email.value = "";
        password.value = "";
    };
    render() {
        const { errorMessage } = this.props;
        return (
            <form ref={this.form} onSubmit={this.handleSubmit} className={`LoginForm`}>
                {errorMessage
                    ?
                    <div className="LoginForm__error-message">
                        Incorrect attempt of Login :( Please try again
                    </div>
                    : null
                }
            <label>
                Email
                    <input id="email"
                    ref={this.EmailInput}
                    defaultValue="Example@domain.com"
                    type="text" />
            </label>
            <br />
            <label>
                Password
                    <input
                    id="password"
                    ref={this.passwordInput}
                    defaultValue="secret"
                    type="password" />
            </label>
            <br />
            <button>Login</button>
        </form>);
    }
}
