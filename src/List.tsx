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
	items: { id: string; content: string }[];
}

const List: React.FC<ListProps> = ({ droppableId, items }) => (
	<Droppable droppableId={droppableId}>
		{(provided, snapshot) => (
			<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
				{items.map((item, index) => (
					<Item key={item.id} item={item} index={index} />
				))}
				{provided.placeholder}
			</div>
		)}
	</Droppable>
);

export default List;
