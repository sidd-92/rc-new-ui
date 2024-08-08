import React, { CSSProperties } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Checkbox } from "evergreen-ui";

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: CSSProperties = {}): CSSProperties => ({
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	background: isDragging ? "lightgreen" : "red",
	...draggableStyle,
});

interface ItemProps {
	item: { id: string; content: string };
	index: number;
}

const Item: React.FC<ItemProps> = ({ item, index }) => {
	const [checked, setChecked] = React.useState(true);
	return (
		<Draggable key={item.id} draggableId={item.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
				>
					<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label={item.content} />
				</div>
			)}
		</Draggable>
	);
};

export default Item;
