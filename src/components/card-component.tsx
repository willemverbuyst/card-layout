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
import { cn } from "../lib/utils";

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
    <div className={cn(cardItem.color, "text-white border rounded-lg p-4")}>
        <div className="text-3xl flex items-center justify-between">
          <span>{cardItem.name}</span>
          <span className="flex gap-2">
            <MoveLeftIcon
              className="cursor-pointer hidden lg:block"
              onClick={() => move("left")}
            />
            <MoveDownIcon
              className="cursor-pointer"
              onClick={() => move("down")}
            />
            <MoveUpIcon className="cursor-pointer" onClick={() => move("up")} />
            <MoveRightIcon
              className="cursor-pointer hidden lg:block"
              onClick={() => move("right")}
            />
            {cardItem.collapsed ? (
              <MaximizeIcon onClick={collapse} />
            ) : (
              <MinimizeIcon onClick={collapse} />
            )}
          </span>
        </div>
      {!cardItem.collapsed && <div className="h-[80px]" />}
    </div>
  );
}

export const MemoizedCardComponent = memo(CardComponent);
