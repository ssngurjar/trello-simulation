import React, { useState } from 'react';

const CreateList = ({ setList, list, onClose }) => {
	const [values, setValues] = useState({});
	const [err, setError] = useState(null);

	const controls = {
		title: {
			name        : 'title',
			label       : 'Title of card',
			placeholder : 'Type here...',
			value       : values.title,
			onChange    : (e) => setValues({ ...values, title: e?.target?.value }),
		},
	};
	const handleSave = (e) => {
		const key = values?.title?.replaceAll(' ', '_');
		if (!Object.keys(list).includes(key)) {
			e.preventDefault();
			if (err) {
				setError(null);
			}
			const newList = { ...(list || {}), [key]: { title: values.title, list: [] } };
			setList(newList);
			localStorage.setItem('list_items', JSON.stringify(newList));
			onClose();
		} else {
			setError('List Name already exists. Try different name');
		}
	};
	return (
		<div>
			<p>{controls.title.label}</p>
			<input {...controls.title} />
			{err ? <p>{err}</p> : null}
			<button
				onClick={handleSave}
				type="button"
				style={{ border: 'none', background: 'none', padding: 0, marginTop: 16, cursor: 'pointer' }}
			>
				ADD LIST
			</button>
		</div>
	);
};
export default CreateList;
