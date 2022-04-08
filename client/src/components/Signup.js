import React, { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { isAuthenticated } from '../helpers/auth';
import { Link, useHistory } from 'react-router-dom';
import { signup,google } from '../api/auth';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Signup = () => {
    

    let history = useHistory(); // để điều hướng sau khi đăng ký thành công

    useEffect(() => { // để kiểm tra xem user đã đăng nhập chưa
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/user/dashboard');
        }
    }, [history]); // 

    //  formData là 1 object để lưu trữ dữ liệu của form khi user nhập vào
    // setFormData là 1 function để set lại formData
    const [formData, setFormData] = useState({ // useState là hook để lưu trữ dữ liệu
        username: '',
        email: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false,
    }); // để lưu trữ dữ liệu được nhập vào

    const { 
        username,
        email,
        password,
        password2,
        successMsg,
        errorMsg,
        loading,
    } = formData; // để lấy dữ liệu từ formData

    /****************************
     * EVENT HANDLERS
     ***************************/
    const handleChange = (evt) => { // sự kiện khi user nhập vào form
        //console.log(evt);
        setFormData({
            ...formData, // lấy dữ liệu cũ
            [evt.target.name]: evt.target.value, // lấy dữ liệu mới
            successMsg: '', // xóa successMsg
            errorMsg: '', // xóa errorMsg
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // client-side validation
        if (
            isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)
        ) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        } else if (!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg: 'Invalid email',
            });
        } else if (!equals(password, password2)) {
            setFormData({
                ...formData,
                errorMsg: 'Passwords do not match',
            });
        } else {
            const { username, email, password } = formData;
            const data = { username, email, password };

            setFormData({ ...formData, loading: true });

            signup(data) // gọi api đăng ký
                .then((response) => { // nếu thành công
                    console.log('Axios signup success: ', response);
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
                })
                .catch((err) => { // nếu thất bại
                    console.log('Axios signup error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });
        }
    };

    const googleSuccess = (res) => {
        alert("Chưa xong má ơi");
        
    
    };

    const googleFailure = (response) => {
        console.log('Login failed: ',response);
    };
    
    /****************************
     * VIEWS
     ***************************/
    const showSignupForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
            {/* username */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
                <input
                    name='username'
                    value={username}
                    className='form-control'
                    placeholder='Username'
                    type='text'
                    onChange={handleChange}
                />
            </div>
            {/* email */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                </div>
                <input
                    name='email'
                    value={email}
                    className='form-control'
                    placeholder='Email address'
                    type='email'
                    onChange={handleChange}
                />
            </div>
            {/* password */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password'
                    value={password}
                    className='form-control'
                    placeholder='Create password'
                    type='password'
                    onChange={handleChange}
                />
            </div>
            {/* password2 */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password2'
                    value={password2}
                    className='form-control'
                    placeholder='Confirm password'
                    type='password'
                    onChange={handleChange}
                />
            </div>
            {/* signup button */}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Signup
                </button>
            </div>
            <hr/>
            <h1>{process.env.REACT_APP_GOOGLE_CLIENT_ID}</h1>
            <GoogleLogin
            clientId = '265377345213-imj5ae78iuhpn9k6k9jlu8oiukvna2fj.apps.googleusercontent.com'
            buttonText="Login with Google"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
            {/* already have account */}
            <p className='text-center text-white'>
                Have an account? <Link to='/signin'>Log In</Link>
            </p>
        </form>
    );

    /****************************
     * RENDERER
     ***************************/
    return (
        <div className='signup-container'>
            <div className='row px-3 vh-100'>
                <div className='col-md-5 mx-auto align-self-center'>
                    {successMsg && showSuccessMsg(successMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && (
                        <div className='text-center pb-4'>{showLoading()}</div>
                    )}
                    {showSignupForm()}
                    {/* <p style={{ color: 'white' }}>{JSON.stringify(formData)}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Signup;
