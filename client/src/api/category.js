import axios from 'axios';

export const createCategory = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Truyền data và config vào api category
    const response = await axios.post('/api/category', formData, config);

    // Nếu thành công thì trả về 
    return response;
};

export const getCategories = async () => {
    const response = await axios.get('/api/category');

    return response;
};
