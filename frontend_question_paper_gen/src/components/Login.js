import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";


function Login(props) {
    const history = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
        errors: {},
    });

    useEffect(() => {

        if (props.auth.isAuthenticated) {
            history("/home");
        }
        if (props.errors) {
            setState((prevState) => ({
                ...prevState,
                errors: props.errors,
            }));
            if (props.errors.email) {
                const timer = setTimeout(() => {
                    setState((prevState) => ({
                        ...prevState,
                        errors: { ...prevState.errors, email: "" },
                    }));
                }, 2000);
                return () => clearTimeout(timer);
            }

            if (props.errors.password) {
                const timer = setTimeout(() => {
                    setState((prevState) => ({
                        ...prevState,
                        errors: { ...prevState.errors, password: "" },
                    }));
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [props.auth.isAuthenticated, props.errors, history]);


    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value,
        });
    };

    const signIn = e => {
        e.preventDefault();

        const userData = {
            email: state.email,
            password: state.password,
        };

        props.loginUser(userData);
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className='login mx-auto max-w-lg'>

                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Generate Question Papers
                </h1>
                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    We provide best question paper generation service.
                </p>
                <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={signIn} >
                    <p className="text-center text-lg font-medium">Sign in to your account</p>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <span className="text-red-500">{state.errors.email}</span>
                        <div className="relative">
                            <input type='email' value={state.email} onChange={onChange} className={classnames(
                                "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
                                {
                                    invalid: state.errors.email || state.errors.emailnotfound,
                                }
                            )} placeholder="Enter email" id="email" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <span className="text-red-500">{state.errors.password}</span>
                        <div className="relative">
                            <input type='password' value={state.password} onChange={onChange} className={classnames(
                                "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
                                {
                                    invalid: state.errors.password || state.errors.passwordincorrect,
                                }
                            )} placeholder="Enter password" id="password" />  </div></div>

                    <button type='submit' className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-lg font-medium text-white">Sign In</button>
                    <p className="text-center text-sm text-gray-500">
                        No account?
                        <Link to="/register" className="underline w-full text-blue-700 rounded-lg px-5 py-3 cursor-pointer" >Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);