import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";


function Register(props) {

    const history = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {},
    });

    useEffect(() => {
        if (props.errors) {
            setState((prevState) => ({
                ...prevState,
                errors: props.errors,
            }));
            if (props.errors.name) {
                const timer = setTimeout(() => {
                    setState((prevState) => ({
                        ...prevState,
                        errors: { ...prevState.errors, name: "" },
                    }));
                }, 2000);
                return () => clearTimeout(timer);
            }

            if (props.errors.email) {
                const timer = setTimeout(() => {
                    setState((prevState) => ({
                        ...prevState,
                        errors: { ...prevState.errors, email: "" },
                    }));
                }, 2000);
                return () => clearTimeout(timer);
            }

            // Clear the timer when the component unmounts

        }
    }, [props.errors]);


    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value,
        });
    };


    const register = (e) => {
        e.preventDefault();
        const newUser = {
            name: state.name,
            email: state.email,
            password: state.password,
            password2: state.password2,
        };
        props.registerUser(newUser, history);
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className='login mx-auto max-w-lg'>

                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Generate Question Papers
                </h1>
                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    We provide best question paper generation service.
                </p>
                <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={register}>
                    <p className="text-center text-lg font-medium">Register</p>
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <span className="text-red-500">{state.errors.name}</span>
                        <div className="relative">
                            <input type='name' value={state.name} onChange={onChange}

                                className={classnames(
                                    "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
                                    {
                                        invalid: state.errors.name,
                                    }
                                )} placeholder="Enter name" id="name" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <span className="text-red-500">{state.errors.email}</span>
                        <div className="relative">
                            <input type='email' value={state.email} onChange={onChange} className={classnames(
                                "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
                                {
                                    invalid: state.errors.email,
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
                                    invalid: state.errors.password,
                                }
                            )} placeholder="Enter password" id="password" />  </div>
                    </div>
                    <div>
                        <label htmlFor="password2" className="sr-only">Confirm Password</label>
                        <span className="text-red-500">{state.errors.password2}</span>
                        <div className="relative">
                            <input type='password' value={state.password2} onChange={onChange} className={classnames(
                                "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
                                {
                                    invalid: state.errors.password2,
                                }
                            )} placeholder="Confirm password" id="password2" />
                        </div>
                    </div>

                    <button type='submit' className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-lg font-medium text-white">Create Account</button>
                    <p className="text-center text-sm text-gray-500">
                        Already registered?
                        <Link to="/login" className="underline w-full text-blue-700 rounded-lg px-5 py-3 cursor-pointer" >Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});


export default connect(
    mapStateToProps,
    { registerUser }
)(Register);