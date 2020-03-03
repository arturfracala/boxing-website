import React, {useState} from 'react'
import './Login.css';
import {Redirect} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFromData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFromData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();

        login(email, password);
    }

    // Redirect if logged in

    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

    return (
        <div className='loginContainer'>
            <p className='loginParagraph'>Sign in</p>
            <form onSubmit={e => onSubmit(e)}>
                <input
                  className='loginEmailInput'
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />

                <input
                  className='loginPasswordInput'
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
                <input type="submit" className="loginSubmitInput" value="C O N T I N U E"/>
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);