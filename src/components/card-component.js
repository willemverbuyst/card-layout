import "./card-component.css";

const moveButtons = [
  { direction: "left", label: "L" },
  { direction: "down", label: "D" },
  { direction: "up", label: "U" },
  { direction: "right", label: "R" },
];

export function renderCardComponent({ index, cardItem, column }) {
  const moveButtonsMarkup = moveButtons
    .map(({ direction, label }) => {
      return `
        <button
          type="button"
          class="card-icon-button"
          data-action="move"
          data-direction="${direction}"
          data-column="${column}"
          data-index="${index}"
          aria-label="Move ${cardItem.name} ${direction}"
        >
          <span class="card-icon">${label}</span>
        </button>
      `;
    })
    .join("");

  const collapseLabel = cardItem.collapsed
    ? `Expand ${cardItem.name}`
    : `Collapse ${cardItem.name}`;
  const bodyMarkup = cardItem.collapsed ? "" : '<div class="card-body"></div>';

  return `
    <div class="${cardItem.color} card">
      <div class="card-header">
        <span>${cardItem.name}</span>
        <span class="card-actions">
          ${moveButtonsMarkup}
          <button
            type="button"
            class="card-icon-button"
            data-action="collapse"
            data-column="${column}"
            data-index="${index}"
            aria-label="${collapseLabel}"
          >
            <span class="card-icon">${cardItem.collapsed ? "+" : "-"}</span>
          </button>
        </span>
      </div>
      ${bodyMarkup}
    </div>
  `;
}
