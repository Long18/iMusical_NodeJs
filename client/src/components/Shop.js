import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import { getProductsByFilter } from '../redux/actions/filterActions';
import Card from './Card';

const Shop = () => {
	const [text, setText] = useState(''); // lấy dữ liệu từ input
	const [categoryIds, setCategoryIds] = useState([]); // lấy dữ liệu từ input

	const dispatch = useDispatch(); // để gọi action

	useEffect(() => { // gọi api
		dispatch(getProducts()); // lấy danh sách sản phẩm
	}, [dispatch]);

	useEffect(() => { // gọi api
		dispatch(getCategories()); // lấy danh sách danh mục
	}, [dispatch]);

	const { products } = useSelector(state => state.products); // lấy dữ liệu từ redux
	const { categories } = useSelector(state => state.categories); // lấy dữ liệu từ redux

	const handleSearch = e => { // sự kiện khi user nhập vào form
		resetState(); // xóa dữ liệu cũ

		setText(e.target.value); // lấy dữ liệu mới

		dispatch(getProductsByFilter({ type: 'text', query: e.target.value })); // gọi api lấy sản phẩm theo từ khóa
	};

	const handleCategory = e => { // sự kiện khi user nhập vào form
		resetState(); // xóa dữ liệu cũ

		const currentCategoryChecked = e.target.value; // lấy dữ liệu mới
		const allCategoriesChecked = [...categoryIds]; // lấy dữ liệu cũ
		const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked); // tìm index của categoryIds 

		let updatedCategoryIds;
		if (indexFound === -1) { // nếu indexFound không tồn tại
			// add
			updatedCategoryIds = [...categoryIds, currentCategoryChecked]; // lấy dữ liệu cũ
			setCategoryIds(updatedCategoryIds); // lấy dữ liệu mới
		} else { // nếu indexFound tồn tại
			// remove
			updatedCategoryIds = [...categoryIds]; // lấy dữ liệu cũ
			updatedCategoryIds.splice(indexFound, 1); // xóa phần tử tại indexFound
			setCategoryIds(updatedCategoryIds); // lấy dữ liệu mới
		}

		dispatch(
			getProductsByFilter({ type: 'category', query: updatedCategoryIds }) // gọi api lấy sản phẩm theo danh mục
		);
	};

	const resetState = () => { // xóa dữ liệu cũ
		setText('');
		setCategoryIds([]);
	};

	return (
		<section className='shop-page m-4'>
			<div className='jumbotron'>
				<h1 className='display-4'>Shop</h1>
			</div>
			<div className='row'>
				<div className='col-md-3 border-right'>
					<div className='text-muted mb-2'>
						Filters <span className='fas fa-sliders-h'></span>
					</div>

					<nav className='navbar navbar-expand-lg navbar-light bg-light border-top p-3'>
						<form className='form-inline my-2 my-lg-0'>
							<input
								className='form-control mr-sm-2'
								type='search'
								placeholder='Search'
								aria-label='Search'
								name='search'
								value={text}
								onChange={handleSearch}
							/>
							<button
								className='btn btn-outline-success my-2 my-sm-0'
								type='submit'
								disabled={false}
							>
								Search
							</button>
						</form>
					</nav>

					<div className='border-top border-bottom bg-light p-3'>
						{categories &&
							categories.map(c => (
								<div key={c._id} className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										name='category'
										value={c._id}
										id='flexCheckChecked'
										checked={categoryIds.includes(c._id)}
										onChange={handleCategory}
									/>
									<label
										className='form-check-label'
										htmlFor='flexCheckChecked'
									>
										{c.category}
									</label>
								</div>
							))}
					</div>
				</div>
				<div className='col-md-9'>
					<div className='row'>
						{products &&
							products.map(p => (
								<Card key={p._id} product={p} homePage={true} />
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Shop;
