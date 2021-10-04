/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import List from './List';
import CreateCard from './CreateCard';
import CreateList from './CreateList';

const getTargetList = (currentTarget) => {
	let nodeToTarget = currentTarget;
	while (nodeToTarget && (nodeToTarget.nodeName !== 'UL' || nodeToTarget.nodeName !== 'BODY')) {
		if (nodeToTarget.nodeName === 'UL') {
			return nodeToTarget?.id;
		}
		if (nodeToTarget.nodeName === 'BODY') {
			return null;
		}
		nodeToTarget = nodeToTarget.parentNode;
	}
	return null;
};

const TrelloSim = () => {
	const [list, setList] = useState({});

	const [show, setShow] = useState({ type: null, listKey: null });

	const dragStartHandler = (ev) => {
		ev.dataTransfer.dropEffect = 'move';
		ev.dataTransfer.setData('text/plain', ev.target.id);
	};

	const dragoverHandler = (ev) => {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	};
	const dropHandler = (ev) => {
		ev.preventDefault();
		const id = ev.dataTransfer.getData('text/plain');
		const targetId = getTargetList(ev.target);
		if (targetId) {
			let currentListOfItem = null;
			Object.keys(list).forEach((key) => {
				const listOfKey = list[key].list || [];
				const card = listOfKey.find((item) => item?.id === id);
				if (card) {
					currentListOfItem = key;
				}
			});
			const filteredList = list[currentListOfItem]?.list?.filter((card) => card.id !== id);
			const cardNew = list[currentListOfItem]?.list.find((item) => item?.id === id);
			list[currentListOfItem].list = filteredList;
			list[targetId].list = [...(list[targetId].list || []), cardNew];
			setList({ ...list });
			window.localStorage.setItem('list_items', JSON.stringify(list));
		}
	};

	useEffect(() => {
		const items = [];
		Object.keys(list).forEach((key) => {
			items.push(...(list[key]?.list || []));
		});
		if (items) {
			items.forEach((item) => {
				const element = document.getElementById(item?.id);
				element.addEventListener('dragstart', dragStartHandler);
			});
		}
		return () => {
			if (items) {
				items.forEach((item) => {
					const element = document.getElementById(item?.id);
					if (element) {
						element.removeEventListener('dragstart', dragStartHandler);
					}
				});
			}
		};
	}, [JSON.stringify(list)]);

	const handleRemove = (key, card) => {
		const newList = list;
		const totalList = list[key]?.list;
		const newProductList = totalList.filter((item) => item.id !== card.id);
		newList[key].list = newProductList;
		setList({ ...newList });
		window.localStorage.setItem('list_items', JSON.stringify(newList));
	};

	const handleRemoveList = (listKey) => {
		delete list[listKey];
		setList({ ...list });
		window.localStorage.setItem('list_items', JSON.stringify(list));
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const listItems = window.localStorage.getItem('list_items');
			if (listItems) {
				const parsedItems = JSON.parse(listItems);
				setList(parsedItems);
			}
		}
	}, []);

	const createCard = {
		list : <CreateList setList={setList} list={list} onClose={() => setShow({ type: null, listKey: null })} />,
		card : <CreateCard listKey={show.listKey} setList={setList} list={list} onClose={() => setShow({ type: null, listKey: null })} />,
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<h4> Trello Board</h4>
			{!show.type ? (
				<div style={{ border: '1px solid #e0e0e0', padding: 16, borderRadius: 10, width: '100%' }}>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<button type="button" onClick={() => setShow({ type: 'list', listKey: null })}>ADD LIST</button>
					</div>
					<div style={{ display: 'flex', height: '70vh' }}>
						{
							Object.keys(list).map((key) => (
								<List
									onAdd={(listKey) => setShow({ type: 'card', listKey })}
									listKey={key}
									listCards={list[key]?.list}
									title={list[key].title}
									onRemove={(card) => handleRemove(key, card)}
									onListRemove={(listKey) => handleRemoveList(listKey)}
									dragoverHandler={dragoverHandler}
									dropHandler={dropHandler}
								/>
							))
						}
					</div>
				</div>
			) : createCard[show.type]}
		</div>
	);
};
export default TrelloSim;
