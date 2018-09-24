import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav className="login">
        <p>Sign in to manage your store's inventory.</p>
        <button className="github" onClick={() => props.authenticate('GitHub')}>Log In With Github</button>
        <button className="anonymous" onClick={() => props.anonAuth()}>Skip Authentication</button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;