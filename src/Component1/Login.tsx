import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Logo from '../Assests/logo.png';


 

export const isAuthenticated = () => {

  const user = localStorage.getItem("credentials");

  return user !== null;

};


 

const Login: React.FC = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');

  const [passwordError, setPasswordError] = useState('');

  const [error, setError] = useState('');

  const [failedAttempts, setFailedAttempts] = useState(0);

  const [isLocked, setIsLocked] = useState(false);

  const [lockTime, setLockTime] = useState(0);

  const navigate = useNavigate();


 

  const messages = {

    REQUIRED: 'Field is Required',

    INVALID_EMAIL: 'Invalid Email format. Use .com, .org, or .in domains.',

    INVALID_PASSWORD: 'Password must contain lowercase, uppercase, digits, and special characters with 8 to 16 characters length.',

    ERROR: 'Error Occurred',

    INCORRECT: 'Wrong Password',

    LOCKED: 'Account is locked. Please try again after 60 seconds.',

  };


 

  const validateEmail = (email: string): boolean => {

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in)$/;

    return re.test(email);

  };


 

  const validatePassword = (password: string): boolean => {

    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    return re.test(password);

  };


 

  const onEveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;


 

    if (name === 'email') {

      setEmail(value);

      if (!value) {

        setEmailError(messages.REQUIRED);

      } else if (!validateEmail(value)) {

        setEmailError(messages.INVALID_EMAIL);

      } else {

        setEmailError('');

      }

    } else if (name === 'password') {

      setPassword(value);

      if (!value) {

        setPasswordError(messages.REQUIRED);

      } else if (!validatePassword(value)) {

        setPasswordError(messages.INVALID_PASSWORD);

      } else {

        setPasswordError('');

      }

    }

  };


 

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();


 

    if (isLocked) {

      const remainingLockTime = Math.floor((lockTime + 60 - Date.now() / 1000));

      setError(`${messages.LOCKED} (${remainingLockTime}s remaining)`);

      return;

    }


 

    axios.post('http://localhost:8700/api/users/login/', { email, password })

      .then((response) => {

        setFailedAttempts(0);

        setIsLocked(false);

        setLockTime(0);

        localStorage.setItem("credentials", JSON.stringify(response.data));

        navigate('/home');

      })

      .catch(() => {

        setFailedAttempts(prev => prev + 1);

        setError(messages.INCORRECT);


 

        if (failedAttempts + 1 >= 3) {

          // Lock the account for 60 seconds

          setIsLocked(true);

          setLockTime(Math.floor(Date.now() / 1000));

          setFailedAttempts(0); // Reset failed attempts after lockout

        }

      });

  };


 

  useEffect(() => {

    if (isLocked) {

      const timer = setInterval(() => {

        const elapsed = Math.floor(Date.now() / 1000) - lockTime;

        const remainingLockTime = 60 - elapsed;


 

        if (remainingLockTime <= 0) {

          setIsLocked(false);

          setError('');

        } else {

          setError(`${messages.LOCKED} (${remainingLockTime}s remaining)`);

        }

      }, 1000);


 

      return () => clearInterval(timer);

    }

  }, [isLocked, lockTime]);


 

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 back-Image">

      <div className="card border-danger" style={{ width: '30rem' }}>

        <div className="card-body">

          <h2 className="card-title text-center" style={{ textDecoration: "underline" }}>

            <img src={Logo} alt="Logo" className='fixed-size' />

          </h2>


 

          {isLocked && (

            <div className="alert alert-danger text-center mb-4">

              <strong>{messages.LOCKED}</strong>

              <p>Please wait a moment before trying again.</p>

            </div>

          )}


 

          <form onSubmit={handleLogin}>

            <div className="form-group mb-3">

              <label>Email address</label>

              <input

                type="email"

                name="email"

                className="form-control mb-3"

                value={email}

                onChange={onEveryChange}

                required

                autoComplete='off'

                disabled={isLocked} // Disable email input during lockout

              />

              {emailError && <p className="text-danger">{emailError}</p>}

            </div>


 

            <div className="form-group mb-3">

              <label>Password</label>

              <input

                type="password"

                name="password"

                className="form-control"

                value={password}

                onChange={onEveryChange}

                required

                disabled={isLocked} // Disable password input during lockout

              />

              {passwordError && <p className="text-danger">{passwordError}</p>}

            </div>


 

            {error && <small className="text-danger">{error}</small>}


 

            <button

              type="submit"

              className="btn btn-danger w-100 mb-3"

              disabled={isLocked}

            >

              Login

            </button>


 

            <Link to="/update-password" className="btn btn-link w-100">Forgot Password?</Link>


 

            <div className="text-center mt-3">

              <span>Don't have an account? </span>

              <Link to="/register" className="btn btn-link">Create new Account</Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};


 

export default Login;


 