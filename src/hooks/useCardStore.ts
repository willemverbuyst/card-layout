import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { defaultCardLayout } from "../config/defaultCardLayout";
import { CardItem } from "../interfaces/CardItem";

type ColumnId = 1 | 2 | 3;

type Direction = "up" | "down" | "left" | "right";

type CardLayout = Record<ColumnId, CardItem[]>;

type CardLayoutData = {
  layout: CardLayout;
};

type CardLayoutActions = {
  handleCollapse: (column: ColumnId, index: number) => void;
  handleMove: (input: {
    direction: Direction;
    column: ColumnId;
    index: number;
  }) => void;
};

export type CardLayoutState = CardLayoutData & CardLayoutActions;

const initialState: CardLayoutData = {
  layout: defaultCardLayout,
};

const moveWithinColumn = (
  columnItems: CardItem[],
  fromIndex: number,
  toIndex: number,
): CardItem[] => {
  const nextItems = [...columnItems];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
};

const cardStore = createStore<CardLayoutState>((set) => ({
  ...initialState,
  handleCollapse: (column, index) =>
    set((state) => {
      const columnItems = state.layout[column];
      const target = columnItems[index];
      if (!target) {
        return state;
      }

      const updatedColumn: CardItem[] = columnItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, collapsed: !item.collapsed } : item,
      );

      return {
        layout: {
          ...state.layout,
          [column]: updatedColumn,
        },
      };
    }),
  handleMove: ({ direction, column, index }) =>
    set((state) => {
      const currentColumnItems = state.layout[column];
      const cardItem = currentColumnItems[index];

      if (!cardItem) {
        return state;
      }

      let nextLayout: CardLayout = {
        ...state.layout,
      };

      switch (direction) {
        case "left": {
          if (column === 1) {
            return state;
          }

          const sourceColumnItems = [...state.layout[column]];
          const [movedItem] = sourceColumnItems.splice(index, 1);
          const targetColumnId = (column - 1) as ColumnId;
          const targetColumnItems = [movedItem, ...state.layout[targetColumnId]];

          nextLayout = {
            ...state.layout,
            [column]: sourceColumnItems,
            [targetColumnId]: targetColumnItems,
          };
          break;
        }
        case "right": {
          if (column === 3) {
            return state;
          }

          const sourceColumnItems = [...state.layout[column]];
          const [movedItem] = sourceColumnItems.splice(index, 1);
          const targetColumnId = (column + 1) as ColumnId;
          const targetColumnItems = [movedItem, ...state.layout[targetColumnId]];

          nextLayout = {
            ...state.layout,
            [column]: sourceColumnItems,
            [targetColumnId]: targetColumnItems,
          };
          break;
        }
        case "up": {
          if (index === 0) {
            return state;
          }

          nextLayout = {
            ...state.layout,
            [column]: moveWithinColumn(state.layout[column], index, index - 1),
          };
          break;
        }
        case "down": {
          if (index === state.layout[column].length - 1) {
            return state;
          }

          nextLayout = {
            ...state.layout,
            [column]: moveWithinColumn(state.layout[column], index, index + 1),
          };
          break;
        }
        default:
          return state;
      }

      return { layout: nextLayout };
    }),
}));

const useCardStore = () => useStore(cardStore);

export default useCardStore;
