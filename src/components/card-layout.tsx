import React from "react";
import useCardStore from "../hooks/useCardStore";
import { MemoizedCardComponent } from "./card-component";
import "./card-layout.css";

export default function CardLayout() {
  const { layout } = useCardStore();

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
                column={Number(column) as 1 | 2 | 3}
              />
            ))}
          </section>
        );
      })}
    </main>
  );
}
