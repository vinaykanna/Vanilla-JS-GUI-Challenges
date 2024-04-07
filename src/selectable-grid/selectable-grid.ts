const grid = document.querySelector(".grid")!;
const output = document.querySelector(".output span")!;

generateGrid();

const gridItems = document.querySelectorAll(".grid-item")!;
let selectedStartIndex: number | null = null;
let selectedEndIndex: number | null = null;
let mouseDown = false;

// Efficiently selecting grid items using event delegation
grid.addEventListener("mousedown", (event: any) => {
  if (event.target.classList.contains("grid-item")) {
    clearSelection();
    selectedStartIndex = event.target.dataset.index;
    mouseDown = true;
  }
});

grid.addEventListener("mousemove", (event: any) => {
  if (event.target.classList.contains("grid-item")) {
    if (mouseDown) {
      selectedEndIndex = event.target.dataset.index;
      clearSelection;
      renderSelection();
    }
  }
});

document.addEventListener("mouseup", () => {
  mouseDown = false;
  showOutput();
});

// Core Implementation Functions
function generateGrid() {
  for (let i = 0; i < 100; i++) {
    const gridItem = document.createElement("div");
    gridItem.textContent = `${i + 1}`;
    gridItem.classList.add("grid-item");
    gridItem.setAttribute("data-index", i.toString());
    grid.appendChild(gridItem);
  }
}

function clearSelection() {
  gridItems.forEach((gridItem) => {
    gridItem.classList.remove("selected");
  });
}

function renderSelection() {
  gridItems.forEach((gridItem, index) => {
    const rowStart = Math.floor(selectedStartIndex! / 10);
    const rowEnd = Math.floor(selectedEndIndex! / 10);
    const colStart = selectedStartIndex! % 10;
    const colEnd = selectedEndIndex! % 10;

    if (
      Math.floor(index / 10) >= Math.min(rowStart, rowEnd) &&
      Math.floor(index / 10) <= Math.max(rowStart, rowEnd) &&
      index % 10 >= Math.min(colStart, colEnd) &&
      index % 10 <= Math.max(colStart, colEnd)
    ) {
      gridItem.classList.add("selected");
    } else {
      gridItem.classList.remove("selected");
    }
  });
}

function showOutput() {
  const selectedItems = [...gridItems]
    .filter((gridItem) => {
      return gridItem.classList.contains("selected");
    })
    .map((gridItem) => gridItem.textContent);

  output.textContent = selectedItems.join(", ") || "No items selected";
}
