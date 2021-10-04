/* eslint-disable no-param-reassign */
import React from 'react';

const List = ({ listKey, title, listCards = [], dropHandler = () => {}, dragoverHandler = () => {}, onAdd = () => {}, onRemove = () => {}, onListRemove = () => {} }) => (
	<ul id={listKey} style={{ border: '1px solid #f2f2f2', marginRight: 16, borderRadius: 10, padding: 8, overflow: 'auto' }}>
		<div style={{
			borderBottom : '1px solid #e0e0e0',
			margin       : '0px -8px 8px -8px',
			padding      : '0px 8px',

		}}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<p>{title}</p>
				<button
					onClick={() => onListRemove(listKey)}
					type="button"
					style={{ border: 'none', padding: 'none', background: 'none', cursor: 'pointer' }}
				>
					X
				</button>
			</div>
		</div>
		{listCards.map((card) => (
			<li
				onDrop={dropHandler}
				onDragOver={dragoverHandler}
				id={card?.id}
				key={card?.id}
				draggable
				style={{
					listStyleType : 'none',
					border        : '1px solid #828282',
					borderRadius  : '4px',
					boxShadow     : '0px 4px 40px rgb(0 0 0 / 15%)',
					padding       : 8,
					marginBottom  : 10,
				}}
			>
				<div>
					<div style={{ display: 'flex' }}>
						<span>{card?.created_at}</span>
						<button
							onClick={() => onRemove(card)}
							type="button"
							style={{ border: 'none', padding: 'none', background: 'none', cursor: 'pointer' }}
						>
							X
						</button>
					</div>
					<h5>{card.title}</h5>
					<p>{card?.desc}</p>
				</div>
			</li>
		))}
		<button
			onClick={() => onAdd(listKey)}
			type="button"
			style={{ border: 'none', padding: 'none', background: 'none', cursor: 'pointer', fontSize: 20 }}
		>
			+
		</button>
	</ul>
);
export default List;
