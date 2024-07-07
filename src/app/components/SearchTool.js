'use client';
import { forwardRef, useState } from 'react';
import { buttonStyles } from '../styles/ui';

const SearchTool = forwardRef(function SearchTool({ searchHandler }, ref) {
	const [searchInput, setSearchInput] = useState('');
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const pattern = /[^\w\s]/;

	function validate(item) {
		if (!item) {
			setError(true);
			setErrorMsg('Please enter a valid city in the field above.');
		} else if (pattern.test(item)) {
			setError(true);
			setErrorMsg('Only letters and spaces allowed.');
		} else {
			setError(false);
			setErrorMsg('');
		}
	}

	function changeHandler(e) {
		const value = e.target.value;
		setSearchInput(value);
		validate(value);
	}

	function submitHandler(e) {
		e.preventDefault();

		validate(searchInput);
		if (!error && searchInput) {
			searchHandler(searchInput);
			setSearchInput('');
		}
	}

	return (
		<div id='search-city' className='md:pb-4'>
			<form
				className='mb-5 mx-auto flex  justify-center w-full flex-wrap md:items-center'
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
						className={`text-black border border-transparent rounded-md p-2.5 bg-blue-800/25 mr-3 w-full ${
							error && 'border border-red'
						}  dark:text-white`}
						onChange={changeHandler}
					/>
					{error && (
						<p
							data-test='error-city'
							className='pt-1.5 md:absolute md:-bottom-[2.375rem]'
						>
							{errorMsg}
						</p>
					)}
				</div>
				<button
					type='button'
					id='search-btn'
					className={buttonStyles}
					onClick={submitHandler}
				>
					Search
				</button>
			</form>
		</div>
	);
});

export default SearchTool;
