import React, { useState } from 'react';

import axios from 'axios';

import { Navigate, useNavigate } from 'react-router-dom';


 

type User = {

    userId:number;

    password : string;

}


 

const ForgotPassword: React.FC = () => {


 

    const Navigate = useNavigate();


 

    const [user, setUser] = useState<User>({ userId:0, password:''})


 

    const [mobileNumber, setMobileNumber] = useState('');

    const [otp, setOtp] = useState('');

    const [email, setEmail] = useState("");

    const [newPassword, setNewPassword] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [otpSent, setOtpSent] = useState(false);

    const [resetSuccess, setResetSuccess] = useState('');

    const [resetError, setResetError] = useState('');

    const handleGetOtp = () => {

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        alert(`Your OTP is: ${generatedOtp}`);

        setOtp(generatedOtp); setOtpSent(true);

    };


 

    const enterEmail = (e:React.ChangeEvent<HTMLInputElement>) =>{

        setEmail(e.target.value)

    }


 

    const handleResetPassword = async () => {

        if (newPassword !== confirmNewPassword) {

            setResetError('Passwords do not match');

            return;

        }

        try {


 

            await axios.get("http://localhost:8700/api/users/email/" + email ).then(response => {

                console.log(email)

                setUser({

                    userId: response.data.id,

                    password: confirmNewPassword

                })

                console.log(user.userId)

               

            })

                .catch(error => {

                    console.log(error);

                })


 

           await axios.patch('http://localhost:8700/api/users/changepassword', user)

            .then(response=>{

                setResetSuccess('Password reset successful');

                setResetError('');

                Navigate("/login")

            }).catch(error=>{

                setResetError(error.data.message);

            })

        }

        catch (error) { setResetError('Error Occurred'); }

    };

    return (<div className="d-flex justify-content-center align-items-center vh-100">

        <div className="card border-danger" style={{ width: '30rem' }}>

            <div className="card-body"> <h2 className="card-title text-center" style={{ textDecoration: "underline" }}>Forgot Password</h2> <div className="form-group mb-3">

                <label>Mobile Number</label>

                <input type="text" className="form-control" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />

            </div>

                {otpSent && (<> <div className="form-group mb-3"> <label>OTP</label>

                    <input type="text" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                </div>

                <div className="form-group mb-3">

                        <label htmlFor='email'>email</label>

                        <input type="email" className="form-control" id='email' name="email" value={email} onChange={enterEmail} required />

                    </div>

                    <div className="form-group mb-3">

                        <label>New Password</label>

                        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                    </div>

                    <div className="form-group mb-3"> <label>Confirm New Password</label> <input type="password" className="form-control" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required /> </div> </>)}

                {!otpSent ? (<button type="button" className="btn btn-danger w-100" onClick={handleGetOtp}> Get OTP </button>) : (<button type="button" className="btn btn-danger w-100" onClick={handleResetPassword}> Reset Password </button>)}

                {resetError && <small className="text-danger">{resetError}</small>}

                {resetSuccess && <small className="text-success">{resetSuccess}</small>} </div> </div> </div>);

};

export default ForgotPassword;