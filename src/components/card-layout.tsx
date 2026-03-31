import { useState } from "react";
import {
  CardLayout as CardLayoutState,
  ColumnId,
  Direction,
  createInitialLayout,
  moveCard,
  toggleCardCollapse,
} from "../utils/card-layout";
import { MemoizedCardComponent } from "./card-component";
import "./card-layout.css";

export default function CardLayout() {
  const [layout, setLayout] = useState<CardLayoutState>(() => createInitialLayout());

  function handleCollapse(column: ColumnId, index: number) {
    setLayout((currentLayout) => toggleCardCollapse(currentLayout, column, index));
  }

  function handleMove(direction: Direction, column: ColumnId, index: number) {
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
                column={Number(column) as ColumnId}
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
