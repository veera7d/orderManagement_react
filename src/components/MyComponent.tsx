import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Your data for draggable items
const items = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
];

function MyComponent() {
  const [data, setData] = useState(items);

  const handleOnDragEnd = (result: {
    destination: { index: number } | null | undefined;
    source: { index: number };
  }) => {
    console.log(JSON.stringify(result));
    // Update data based on drag and drop events
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable key={item.id} index={index} draggableId={item.id}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default MyComponent;
