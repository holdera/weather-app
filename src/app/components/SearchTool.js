'use client';
import { forwardRef, useState } from 'react';

const SearchTool = forwardRef(function SearchTool({ searchHandler }, ref) {
	const [searchInput, setSearchInput] = useState('');
	const [error, setError] = useState(false);

	function changeHandler(e) {
		const value = e.target.value;
		setSearchInput(value);
		if (!value) {
			setError(true);
		} else {
			setError(false);
		}
	}

	function submitHandler(e) {
		e.preventDefault();
		if (!searchInput) {
			setError(true);
		} else {
			setError(false);
			searchHandler(searchInput);
			setSearchInput('');
		}
	}

	return (
		<div id='search-city' className='md:pb-4'>
			<form
				className='mb-5 mx-auto flex items-center justify-center w-full flex-wrap'
				onSubmit={submitHandler}
				noValidate
			>
				<label
					className='pr-2.5 absolute opacity-0 md:relative md:opacity-100'
					htmlFor='city'
				>
					Search City
				</label>
				<div className='relative w-[71%] mr-1 md:w-[70%]'>
					<input
						type='text'
						id='city'
						name='city'
						aria-invalid={error}
						ref={ref}
						placeholder='Search City, eg: Rome'
						required
						className={`text-white border border-transparent rounded-md p-2.5 bg-blue-800/25 mr-3 w-full ${
							error && 'border border-red'
						}`}
						onChange={changeHandler}
					/>
					{error && (
						<p className='md:absolute md:-bottom-[2.375rem]'>
							Please add a city in the text field above.
						</p>
					)}
				</div>
				<button
					type='button'
					className='font-bold border border-transparent rounded-lg bg-blue-800/75 p-2.5'
					onClick={submitHandler}
				>
					Search
				</button>
			</form>
		</div>
	);
});

export default SearchTool;
