import axios from 'axios';

export const signup = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // Truyền data và config vào api đăng ký
    const response = await axios.post('/api/auth/signup', data, config);

    // Nếu thành công thì trả về 
    return response;
};

export const signin = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Truyền data và config vào api đăng nhập
    const response = await axios.post('/api/auth/signin', data, config);

    // Nếu thành công thì trả về 
    return response;
};
