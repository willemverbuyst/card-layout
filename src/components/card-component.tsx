import {
  MaximizeIcon,
  MinimizeIcon,
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon
} from "lucide-react";
import React, { memo } from "react";
import useCardStore from "../hooks/useCardStore";
import { CardItem } from "../interfaces/CardItem";
import "./card-component.css";

function CardComponent({
  index,
  cardItem,
  column,
}: {
  index: number;
  cardItem: CardItem;
  column: 1 | 2 | 3;
}) {
  const { handleCollapse, handleMove } = useCardStore();

  function collapse() {
    handleCollapse(column, index);
  }

  function move(direction: "up" | "down" | "left" | "right") {
    handleMove({ direction, column, index, cardItem });
  }

  return (
    <div className={`${cardItem.color} card`}>
        <div className="card-header">
          <span>{cardItem.name}</span>
          <span className="card-actions">
            <MoveLeftIcon
              className="card-icon"
              onClick={() => move("left")}
            />
            <MoveDownIcon
              className="card-icon"
              onClick={() => move("down")}
            />
            <MoveUpIcon className="card-icon" onClick={() => move("up")} />
            <MoveRightIcon
              className="card-icon"
              onClick={() => move("right")}
            />
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
