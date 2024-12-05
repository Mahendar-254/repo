import React, { useState } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, useNavigate } from 'react-router-dom';


 

interface FormData {

    email: string;

    username: string;

    password: string;

    confirmPassword: string;

}


 

interface ErrorMessages {

    email: string;

    username: string;

    password: string;

    confirmPassword: string;

}


 

interface Messages {

    REQUIRED: string;

    INVALID_EMAIL: string;

    INVALID_USERNAME: string;

    INVALID_PASSWORD: string;

    PASSWORDS_NOT_MATCH: string;

    EMAIL_IN_USE: string;

    SUCCESS: string;

    ERROR: string;

}


 

const Register: React.FC = () => {

    const initialFormValues: FormData = {

        email: '',

        username: '',

        password: '',

        confirmPassword: '',

    };


 

    const initialErrorMessages: ErrorMessages = {

        email: '',

        username: '',

        password: '',

        confirmPassword: '',

    };


 

    const messages: Messages = {

        REQUIRED: 'Field is Required',

        INVALID_EMAIL: 'Invalid Email format. Use .com, .org, or .in domains.',

        INVALID_USERNAME: 'Username should contain only lowercase letters, digits, and special characters.',

        INVALID_PASSWORD: 'Password must contain lowercase, uppercase, digits, and special characters with 8 to 16 characters length.',

        PASSWORDS_NOT_MATCH: 'Passwords do not match',

        EMAIL_IN_USE: 'The email is already in use.',

        SUCCESS: 'Successfully Registered',

        ERROR: 'Error Occurred',

    };


 

    const [formData, setFormData] = useState<FormData>(initialFormValues);

    const [errorMessages, setErrorMessages] = useState<ErrorMessages>(initialErrorMessages);

    const [disable, setDisable] = useState<boolean>(true);

    const [submitMessage, setSubmitMessage] = useState<string>();

    const [errors, setErrors] = useState('');

    const navigate = useNavigate();


 

    const validateEmail = (email: string): boolean => {

        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in)$/;

        return re.test(email);

    };


 

    const validateUsername = (username: string): boolean => {

        const re = /^[a-z0-9!@#$%^&*_-]+$/;

        return re.test(username);

    };


 

    const validatePassword = (password: string): boolean => {

        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

        return re.test(password);

    };


 

    const onEveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        validate(name, value);

    };


 

    const validate = (fieldName: string, fieldValue: string) => {

        let errors = { ...errorMessages };

        switch (fieldName) {

            case 'email': {

                if (!fieldValue) {

                    errors.email = messages.REQUIRED;

                } else if (!validateEmail(fieldValue)) {

                    errors.email = messages.INVALID_EMAIL;

                } else {

                    errors.email = '';

                }

                break;

            }

            case 'username': {

                if (!fieldValue) {

                    errors.username = messages.REQUIRED;

                } else if (!validateUsername(fieldValue)) {

                    errors.username = messages.INVALID_USERNAME;

                } else {

                    errors.username = '';

                }

                break;

            }

            case 'password': {

                if (!fieldValue) {

                    errors.password = messages.REQUIRED;

                } else if (!validatePassword(fieldValue)) {

                    errors.password = messages.INVALID_PASSWORD;

                } else {

                    errors.password = '';

                }

                break;

            }

            case 'confirmPassword': {

                if (!fieldValue) {

                    errors.confirmPassword = messages.REQUIRED;

                } else if (fieldValue !== formData.password) {

                    errors.confirmPassword = messages.PASSWORDS_NOT_MATCH;

                } else {

                    errors.confirmPassword = '';

                }

                break;

            }

        }

        setErrorMessages(errors);


 

        const allValid = !errors.email && !errors.username && !errors.password && !errors.confirmPassword;

        setDisable(!allValid);

    };


 

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();


 

        axios

            .post('http://localhost:8700/api/users/', formData)

            .then((response) => {

                setSubmitMessage(messages.SUCCESS);

                navigate('/login'); // This should be replaced with your actual welcome page route

                return response.data;

            })

            .catch((error) => {

                console.log(error.response.data.errorMessage)

                setErrors(messages.EMAIL_IN_USE);

                setSubmitMessage(messages.ERROR);

            });


 

        setFormData(initialFormValues);

        setErrorMessages(initialErrorMessages);

    };


 

    return (

        <div className="d-flex justify-content-center align-items-center vh-100 back-Image">

           

            <div className="card border-danger" style={{ width: '30rem' }}>

            {errors && <span className="alert alert-danger alerting">{errors}</span>}

                <div className="card-body">

                    <h2 className="card-title text-center" style={{ textDecorationLine: 'underline' }}>

                        Register

                    </h2>

                    <form onSubmit={handleRegister}>

                        <div className="form-group mb-3">

                            <label htmlFor="email" className="form-label">Enter Your Email</label>

                            <input

                                type="email"

                                id="email"

                                placeholder="abc@gmail.com"

                                className="form-control"

                                name="email"

                                value={formData.email}

                                onChange={onEveryChange}

                                required

                            />

                            {errorMessages.email && <p className="text-danger">{errorMessages.email}</p>}

                        </div>

                        <div className="form-group mb-3">

                            <label htmlFor="username" className="form-label">Enter Your Username</label>

                            <input

                                type="text"

                                id="username"

                                placeholder="Username"

                                className="form-control"

                                name="username"

                                value={formData.username}

                                onChange={onEveryChange}

                                required

                            />

                            {errorMessages.username && <p className="text-danger">{errorMessages.username}</p>}

                        </div>

                        <div className="form-group mb-3">

                            <label htmlFor="password" className="form-label">Enter Your Password</label>

                            <input

                                type="password"

                                id="password"

                                placeholder="Password"

                                className="form-control"

                                name="password"

                                value={formData.password}

                                onChange={onEveryChange}

                                required

                            />

                            {errorMessages.password && <p className="text-danger">{errorMessages.password}</p>}

                        </div>

                        <div className="form-group mb-3">

                            <label htmlFor="confirmPassword" className="form-label">Confirm Your Password</label>

                            <input

                                type="password"

                                id="confirmPassword"

                                placeholder="Confirm Password"

                                className="form-control"

                                name="confirmPassword"

                                value={formData.confirmPassword}

                                onChange={onEveryChange}

                                required

                            />

                            {errorMessages.confirmPassword && <p className="alert alert-danger">{errorMessages.confirmPassword}</p>}

                        </div>

                        {submitMessage && <div className="alert alert-info">{submitMessage}</div>}

                        <button type="submit" className="btn btn-danger w-100" disabled={disable}>

                            Register

                        </button>

                        <div className="text-center mt-3">

                            <span>Already have an account? </span> <Link to="/login" className="btn btn-link">Login</Link> </div>

                    </form>

                </div>

            </div>

        </div>

    );

};


 

export default Register;