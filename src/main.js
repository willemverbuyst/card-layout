import $ from "jquery";
import { renderCardLayout } from "./components/card-layout.js";
import { createInitialLayout, moveCard, toggleCardCollapse } from "./utils/card-layout.js";
import "./index.css";

const root = $("#root");
let layout = createInitialLayout();

function render() {
  root.html(renderCardLayout(layout));
}

function handleCardAction(event) {
  const actionButton = $(event.target).closest("button[data-action]");

  if (actionButton.length === 0) {
    return;
  }

  const column = Number(actionButton.data("column"));
  const index = Number(actionButton.data("index"));
  const action = actionButton.data("action");

  if (action === "collapse") {
    layout = toggleCardCollapse(layout, column, index);
    render();
    return;
  }

  const direction = actionButton.data("direction");

  if (!direction) {
    return;
  }

  layout = moveCard(layout, { direction, column, index });
  render();
}

root.on("click", "button[data-action]", handleCardAction);
render();
