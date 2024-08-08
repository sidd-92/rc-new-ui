import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { CSSProperties } from "react";

const grid = 8;

const getListStyle = (isDraggingOver: boolean): CSSProperties => ({
	background: isDraggingOver ? "lightblue" : "grey",
	padding: grid,
	width: 250,
});

interface ListProps {
	droppableId: string;
	items: { id: string; content: string; checked: boolean }[];
	onChange: (id: string, checked: boolean) => void;
}

const List: React.FC<ListProps> = ({ droppableId, items, onChange }) => (
	<Droppable droppableId={droppableId}>
		{(provided, snapshot) => (
			<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
				{items.map((item, index) => (
					<Item key={item.id} item={item} index={index} onChange={onChange} />
				))}
				{provided.placeholder}
			</div>
		)}
	</Droppable>
);

export default List;
