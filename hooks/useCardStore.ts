import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { defaultCardLayout } from "../config/defaultCardLayout";
import { CardItem } from "../interfaces/CardItem";

interface CardLayoutState {
  layout: {
    [key: number]: CardItem[];
  };
  handleCollapse: (column: number, index: number) => void;
  handleMove: (args: {
    direction: "up" | "down" | "left" | "right";
    column: 1 | 2 | 3;
    index: number;
    cardItem: CardItem;
  }) => void;
}

const initialState: CardLayoutState = {
  layout: defaultCardLayout,
  handleCollapse: () => {},
  handleMove: () => {},
};

const cardStore = createStore<CardLayoutState>((set) => ({
  ...initialState,
  handleCollapse: (column, index) =>
    set((state) => {
      const newLayout = { ...state.layout };
      newLayout[column][index].collapsed = !newLayout[column][index].collapsed;
      return { layout: newLayout };
    }),
  handleMove: ({ direction, column, index, cardItem }) =>
    set((state) => {
      const newLayout = {
        1: [...state.layout[1]],
        2: [...state.layout[2]],
        3: [...state.layout[3]],
      };

      switch (direction) {
        case "left":
          if (column === 1) return state;
          newLayout[(column - 1) as 1 | 2].unshift(cardItem);
          newLayout[column].splice(index, 1);
          break;
        case "right":
          if (column === 3) return state;
          newLayout[(column + 1) as 2 | 3].unshift(cardItem);
          newLayout[column].splice(index, 1);
          break;
        case "up":
          if (index === 0) return state;
          newLayout[column].splice(index, 1);
          newLayout[column].splice(index - 1, 0, cardItem);
          break;
        case "down":
          if (index === newLayout[column].length - 1) return state;
          newLayout[column].splice(index, 1);
          newLayout[column].splice(index + 1, 0, cardItem);
          break;
        default:
          break;
      }

      return { layout: newLayout };
    }),
}));

const useCardStore = () => useStore(cardStore);

export default useCardStore;
