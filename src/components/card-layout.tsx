import useCardStore, { ColumnId } from "../hooks/useCardStore";
import { MemoizedCardComponent } from "./card-component";
import "./card-layout.css";

export default function CardLayout() {
  const layout = useCardStore((state) => state.layout);

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
              />
            ))}
          </section>
        );
      })}
    </main>
  );
}
