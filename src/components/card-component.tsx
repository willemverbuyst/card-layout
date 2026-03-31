import { memo } from "react";
import useCardStore, { ColumnId, Direction } from "../hooks/useCardStore";
import { CardItem } from "../interfaces/CardItem";
import "./card-component.css";

const moveButtons: Array<{ direction: Direction; label: string }> = [
  { direction: "left", label: "L" },
  { direction: "down", label: "D" },
  { direction: "up", label: "U" },
  { direction: "right", label: "R" },
];

function CardComponent({
  index,
  cardItem,
  column,
}: {
  index: number;
  cardItem: CardItem;
  column: ColumnId;
}) {
  const handleCollapse = useCardStore((state) => state.handleCollapse);
  const handleMove = useCardStore((state) => state.handleMove);

  function collapse() {
    handleCollapse(column, index);
  }

  function move(direction: Direction) {
    handleMove({ direction, column, index });
  }

  return (
    <div className={`${cardItem.color} card`}>
      <div className="card-header">
        <span>{cardItem.name}</span>
        <span className="card-actions">
          {moveButtons.map(({ direction, label }) => (
            <button
              type="button"
              className="card-icon-button"
              key={direction}
              onClick={() => move(direction)}
              aria-label={`Move ${cardItem.name} ${direction}`}
            >
              <span className="card-icon">{label}</span>
            </button>
          ))}
          <button
            type="button"
            className="card-icon-button"
            onClick={collapse}
            aria-label={
              cardItem.collapsed ? `Expand ${cardItem.name}` : `Collapse ${cardItem.name}`
            }
          >
            <span className="card-icon">{cardItem.collapsed ? "+" : "-"}</span>
          </button>
        </span>
      </div>
      {!cardItem.collapsed && <div className="card-body" />}
    </div>
  );
}

export const MemoizedCardComponent = memo(CardComponent);
