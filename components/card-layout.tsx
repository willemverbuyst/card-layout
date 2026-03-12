"use client";

import useCardStore from "../hooks/useCardStore";
import { MemoizedCardComponent } from "./card-component";

export default function CardLayout() {
  const { layout } = useCardStore();

  return (
    <main className="flex flex-col justify-center lg:flex-row items-stretch gap-2 p-4 lg:p-12 xl:p-24">
      {Object.entries(layout).map(([column, cardItems]) => {
        return (
          <section className="flex flex-col gap-2 lg:w-1/3" key={column}>
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
