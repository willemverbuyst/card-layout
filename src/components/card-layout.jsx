import { useState } from "react";
import { createInitialLayout, moveCard, toggleCardCollapse } from "../utils/card-layout.js";
import { MemoizedCardComponent } from "./card-component.jsx";
import "./card-layout.css";

export default function CardLayout() {
  const [layout, setLayout] = useState(() => createInitialLayout());

  function handleCollapse(column, index) {
    setLayout((currentLayout) => toggleCardCollapse(currentLayout, column, index));
  }

  function handleMove(direction, column, index) {
    setLayout((currentLayout) => moveCard(currentLayout, { direction, column, index }));
  }

  return (
    <main className="card-layout-root">
      {Object.entries(layout).map(([column, cardItems]) => {
        return (
          <section className="card-layout-column" key={column}>
            {cardItems.map((cardItem, index) => (
              <MemoizedCardComponent
                key={cardItem.name}
                cardItem={cardItem}
                index={index}
                column={Number(column)}
                onCollapse={handleCollapse}
                onMove={handleMove}
              />
            ))}
          </section>
        );
      })}
    </main>
  );
}
