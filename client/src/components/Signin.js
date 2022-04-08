import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';

const Signin = () => {
    let history = useHistory(); // để điều hướng sau khi đăng ký thành công

    useEffect(() => { // để kiểm tra xem user đã đăng nhập chưa
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/user/dashboard');
        }
    }, [history]);

    const [formData, setFormData] = useState({ // useState là hook để lưu trữ dữ liệu
        email: '',
        password: '',
        errorMsg: false,
        loading: false,
    }); // để lưu trữ dữ liệu được nhập vào

    const { email, password, errorMsg, loading } = formData; // để lấy dữ liệu từ formData

    /****************************
     * EVENT HANDLERS
     ***************************/
    const handleChange = (evt) => { // sự kiện khi user nhập vào form
        setFormData({
            ...formData, // lấy dữ liệu cũ
            [evt.target.name]: evt.target.value, // lấy dữ liệu mới
            errorMsg: '', // xóa errorMsg
        });
    };

    const handleSubmit = (evt) => { // sự kiện khi user nhấn nút submit
        evt.preventDefault();

        // client-side validation
        if (isEmpty(email) || isEmpty(password)) { // nếu email hoặc password rỗng
            setFormData({ 
                ...formData, // lấy dữ liệu cũ
                errorMsg: 'All fields are required', // thông báo lỗi
            });
        } else if (!isEmail(email)) { // nếu email không hợp lệ
            setFormData({
                ...formData, // lấy dữ liệu cũ
                errorMsg: 'Invalid email', // thông báo lỗi 
            });
        } else {
            const { email, password } = formData; // lấy dữ liệu từ formData
            const data = { email, password }; // tạo data

            setFormData({ ...formData, loading: true }); // thay đổi loading

            signin(data) // gọi api đăng nhập
                .then((response) => { // nếu thành công
                    setAuthentication(response.data.token, response.data.user);

                    if (isAuthenticated() && isAuthenticated().role === 1) { // nếu user là admin
                        console.log('Redirecting to admin dashboard');
                        history.push('/admin/dashboard');
                    } else { // nếu là user
                        console.log('Redirecting to user dashboard');
                        history.push('/');
                    }
                })
                .catch((err) => { // nếu thất bại
                    console.log('signin api function error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });
        }
    };

    /****************************
     * VIEWS
     ***************************/
    const showSigninForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
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
            {/* signin button */}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Signin
                </button>
            </div>
            {/* already have account */}
            <p className='text-center text-white'>
                Don't have an account? <Link to='/signup'>Register here</Link>
            </p>
        </form>
    );

    /****************************
     * RENDERER
     ***************************/
    return (
        <div className='signin-container'>
            <div className='row px-3 vh-100'>
                <div className='col-md-5 mx-auto align-self-center'>
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && (
                        <div className='text-center pb-4'>{showLoading()}</div>
                    )}
                    {showSigninForm()}
                </div>
            </div>
        </div>
    );
};

export default Signin;
