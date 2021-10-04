import React, { useState } from 'react';

const CreateCard = ({ listKey = '', setList, list, onClose }) => {
	const [values, setValues] = useState({});

	const controls = {
		title: {
			name        : 'title',
			label       : 'Title of card',
			placeholder : 'Type here...',
			value       : values.title,
			onChange    : (e) => setValues({ ...values, title: e?.target?.value }),
		},
		desc: {
			name        : 'desc',
			label       : 'Description of card',
			placeholder : 'Type here...',
			value       : values.desc,
			onChange    : (e) => setValues({ ...values, desc: e?.target?.value }),

		},
	};
	const handleSave = (e) => {
		e.preventDefault();
		const newList = { ...(list || {}) };
		const listItems = newList[listKey]?.list || [];
		const newValue = {
			...values,
			id         : new Date().toISOString(),
			created_at : new Date().toDateString(),
		};
		newList[listKey].list = [...listItems, newValue];
		setList(newList);
		localStorage.setItem('list_items', JSON.stringify(newList));
		onClose();
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<p>{controls.title.label}</p>
			<input {...controls.title} />
			<p>{controls.desc.label}</p>
			<textarea {...controls.desc} />
			<button onClick={handleSave} type="button" style={{ marginTop: 16 }}>ADD CARD</button>
		</div>
	);
};
export default CreateCard;
