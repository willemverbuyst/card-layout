import { defaultCardLayout } from "../config/defaultCardLayout";
import { CardItem } from "../interfaces/CardItem";

export type ColumnId = 1 | 2 | 3;

export type Direction = "up" | "down" | "left" | "right";

export type CardLayout = Record<ColumnId, CardItem[]>;

type MoveInput = {
  direction: Direction;
  column: ColumnId;
  index: number;
};

function moveWithinColumn(columnItems: CardItem[], fromIndex: number, toIndex: number): CardItem[] {
  const nextItems = [...columnItems];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
}

export function createInitialLayout(): CardLayout {
  return {
    1: [...defaultCardLayout[1]],
    2: [...defaultCardLayout[2]],
    3: [...defaultCardLayout[3]],
  };
}

export function toggleCardCollapse(
  layout: CardLayout,
  column: ColumnId,
  index: number,
): CardLayout {
  const columnItems = layout[column];
  const target = columnItems[index];

  if (!target) {
    return layout;
  }

  return {
    ...layout,
    [column]: columnItems.map((item, itemIndex) =>
      itemIndex === index ? { ...item, collapsed: !item.collapsed } : item,
    ),
  };
}

export function moveCard(layout: CardLayout, input: MoveInput): CardLayout {
  const { direction, column, index } = input;
  const currentColumnItems = layout[column];
  const cardItem = currentColumnItems[index];

  if (!cardItem) {
    return layout;
  }

  switch (direction) {
    case "left": {
      if (column === 1) {
        return layout;
      }

      const sourceColumnItems = [...layout[column]];
      const [movedItem] = sourceColumnItems.splice(index, 1);
      const targetColumnId = (column - 1) as ColumnId;

      return {
        ...layout,
        [column]: sourceColumnItems,
        [targetColumnId]: [movedItem, ...layout[targetColumnId]],
      };
    }
    case "right": {
      if (column === 3) {
        return layout;
      }

      const sourceColumnItems = [...layout[column]];
      const [movedItem] = sourceColumnItems.splice(index, 1);
      const targetColumnId = (column + 1) as ColumnId;

      return {
        ...layout,
        [column]: sourceColumnItems,
        [targetColumnId]: [movedItem, ...layout[targetColumnId]],
      };
    }
    case "up": {
      if (index === 0) {
        return layout;
      }

      return {
        ...layout,
        [column]: moveWithinColumn(layout[column], index, index - 1),
      };
    }
    case "down": {
      if (index === layout[column].length - 1) {
        return layout;
      }

      return {
        ...layout,
        [column]: moveWithinColumn(layout[column], index, index + 1),
      };
    }
    default:
      return layout;
  }
}
