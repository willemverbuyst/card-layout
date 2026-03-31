import { useState } from "react";
import { createInitialLayout, moveCard, toggleCardCollapse } from "../utils/card-layout.js";
import { renderCardComponent } from "./card-component.jsx";
import "./card-layout.css";

export function renderCardLayout(layout) {
  const columnsMarkup = Object.entries(layout)
    .map(([column, cardItems]) => {
      const cardsMarkup = cardItems
        .map((cardItem, index) =>
          renderCardComponent({
            cardItem,
            index,
            column: Number(column),
          }),
        )
        .join("");

      return `
        <section class="card-layout-column">
          ${cardsMarkup}
        </section>
      `;
    })
    .join("");

  return `
    <main class="card-layout-root">
      ${columnsMarkup}
    </main>
  `;
}

export default function CardLayout() {
  const [layout, setLayout] = useState(() => createInitialLayout());

  function handleCollapse(column, index) {
    setLayout((currentLayout) => toggleCardCollapse(currentLayout, column, index));
  }

  function handleMove(direction, column, index) {
    setLayout((currentLayout) => moveCard(currentLayout, { direction, column, index }));
  }

  function handleCardAction(event) {
    const actionButton = event.target.closest("button[data-action]");

    if (!actionButton) {
      return;
    }

    const column = Number(actionButton.dataset.column);
    const index = Number(actionButton.dataset.index);

    if (actionButton.dataset.action === "collapse") {
      handleCollapse(column, index);
      return;
    }

    const { direction } = actionButton.dataset;

    if (!direction) {
      return;
    }

    handleMove(direction, column, index);
  }

  return (
    <div
      onClick={handleCardAction}
      dangerouslySetInnerHTML={{ __html: renderCardLayout(layout) }}
    />
  );
}
