import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const data = [
  { id: "item-1", content: "Item-1" },
  { id: "item-2", content: "Item-2" },
  { id: "item-3", content: "Item-3" },
  { id: "item-4", content: "Item-4" },
  { id: "item-5", content: "Item-5" },
  { id: "item-6", content: "Item-6" },
  { id: "item-7", content: "Item-7" },
  { id: "item-8", content: "Item-8" },
  { id: "item-9", content: "Item-9" },
];

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className=" w-[200px] p-[30px] bg-gray-500 space-y-2">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className=" border-black border-2 h-[50px] bg-slate-500 text-white text-center "
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
    </div>
  );
};

export default App;
