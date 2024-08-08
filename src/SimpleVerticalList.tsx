import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import List from "./List";

// fake data generator
const getItems = (count: number, offset: number = 0) =>
	Array.from({ length: count }, (v, k) => k + offset).map((k) => ({
		id: `item-${k}`,
		content: `item ${k}`,
		checked: true,
	}));

// a little function to help us with reordering the result
const reorder = <TList extends unknown[]>(list: TList, startIndex: number, endIndex: number): TList => {
	const result = Array.from(list) as TList;
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

// Moves an item from one list to another list.
const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result: any = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const SimpleVerticalList: React.FC = () => {
	const [state, setState] = useState<{
		[key: string]: { id: string; content: string; checked: boolean }[];
	}>({
		items1: getItems(10),
		items2: getItems(5, 10),
	});

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(state[source.droppableId], source.index, destination.index);

			setState((prevState) => ({
				...prevState,
				[source.droppableId]: items,
			}));
		} else {
			const result = move(state[source.droppableId], state[destination.droppableId], source, destination);

			setState({
				items1: result.items1,
				items2: result.items2,
			});
		}
	};

	const handleCheckboxChange = (id: string, checked: boolean) => {
		setState((prevState) => {
			const newState = { ...prevState };
			for (const list in newState) {
				const itemIndex = newState[list].findIndex((item) => item.id === id);
				if (itemIndex !== -1) {
					newState[list][itemIndex].checked = checked;
				}
			}
			return newState;
		});
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<List droppableId="items1" items={state.items1} onChange={handleCheckboxChange} />
			<List droppableId="items2" items={state.items2} onChange={handleCheckboxChange} />
		</DragDropContext>
	);
};

export default SimpleVerticalList;
