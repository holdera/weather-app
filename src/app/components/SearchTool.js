'use client';
import { forwardRef, useState } from 'react';

const searchTool = forwardRef(function searchTool({ searchHandler }, ref) {
	const [searchInput, setSearchInput] = useState(true);

	function validate() {
		return searchInput == '' ? true : false;
	}

	function changeHandler(e) {
		const value = e.target.value;
		setSearchInput(value);
	}

	function submitHandler(e) {
		e.preventDefault();
		searchInput == '' ? true : false;
		searchHandler();
	}

	return (
		<div id='search-city' className=''>
			<form className='mb-5 mx-auto flex items-center justify-center w-full flex-wrap'>
				<label className='pr-2.5' htmlFor='city'>
					Search City
				</label>
				<input
					type='text'
					id='city'
					name='city'
					// aria-valid={searchInput}
					ref={ref}
					placeholder='Search City, eg: Vancouver'
					required
					className='text-white accent-blue-800/25 rounded-md p-2.5 bg-blue-800/25 mr-3 w-[70%]'
					onChange={changeHandler}
				/>
				<button
					className='font-bold rounded-lg bg-blue-800/75 p-2.5'
					onClick={submitHandler}
				>
					Search
				</button>
			</form>
		</div>
	);
});

export default searchTool;
