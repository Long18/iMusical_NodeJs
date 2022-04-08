import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loadingReducers';
import messageReducer from './reducers/messageReducers';
import categoryReducer from './reducers/categoryReducers';
import productReducer from './reducers/productReducers';
import filterReducer from './reducers/filterReducers';
import cartReducer from './reducers/cartReducers';


const reducer = combineReducers({ // tạo reducer
	loading: loadingReducer, // loadingReducer là reducer của loading
	messages: messageReducer, // messageReducer là reducer của message
	categories: categoryReducer, // categoryReducer là reducer của category
	products: productReducer, // productReducer là reducer của product
	filters: filterReducer, // filterReducer là reducer của filter
	cart: cartReducer, // cartReducer là reducer của cart
});

const initialState = {}; // khởi tạo state ban đầu

const middleware = [thunk]; // middleware thêm thunk vào để gọi action async

// 
const store = createStore( // tạo store
	reducer, 
	initialState, // state ban đầu
	composeWithDevTools(applyMiddleware(...middleware)) // middleware vào store để gọi action async
);

export default store;


// để t giải thích một xíu về Redux nha || store này là dùng redux đó
// cứ hiểu redux là một cloud store, dữ liệu sẽ được lưu ở đó

// Thì để chia ra, redux sẽ có 3 thành phần cơ bản: Actions, Reducers và Store. 

// Actions
// m có thể hiểu Actions là các events và chúng là cách cần thiết mà m cần làm 
// để send data từ app đến Redux store, data xuất hiện thông qua các tương tác của user
// hoặc qua app, API call hoặc từ form submission.

// Reducers
// Reducers là những function dạng nguyên thủy và chúng thường lấy state hiện tại của app
// Từ đó, thực hiện một action rồi trả về dưới dạng một state mới
// Các states này sẽ được lưu trữ như objects và chúng sẽ định rõ các state của ứng dụng thay đổi khi phản hồi một action gửi đến store. 

// Store
// Store là loại lưu trạng thái ứng dụng và là duy nhất trong bất kỳ ứng dụng Redux nào
// Người dùng có thể access các state đã được lưu, update hoặc đăng ký cũng như hủy đăng ký các listeners thông qua helper methods. 

// Cuối cùng là cái constants 
// 