import {
  MaximizeIcon,
  MinimizeIcon,
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon,
} from "lucide-react";
import { memo } from "react";
import useCardStore, { ColumnId, Direction } from "../hooks/useCardStore";
import { CardItem } from "../interfaces/CardItem";
import "./card-component.css";

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
          <MoveLeftIcon className="card-icon" onClick={() => move("left")} />
          <MoveDownIcon className="card-icon" onClick={() => move("down")} />
          <MoveUpIcon className="card-icon" onClick={() => move("up")} />
          <MoveRightIcon className="card-icon" onClick={() => move("right")} />
          {cardItem.collapsed ? (
            <MaximizeIcon onClick={collapse} />
          ) : (
            <MinimizeIcon onClick={collapse} />
          )}
        </span>
      </div>
      {!cardItem.collapsed && <div className="card-body" />}
    </div>
  );
}

export const MemoizedCardComponent = memo(CardComponent);
