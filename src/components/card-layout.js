import { renderCardComponent } from "./card-component.js";
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
