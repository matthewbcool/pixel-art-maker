const form = document.getElementById("size-picker");
let currentColor = document.getElementById("color-picker");
const mainCanvas = document.getElementById("main-canvas");
const previewCanvas = document.getElementById("preview");
let rowLength = 200;
let colLength = 200;
let colorList = [];

// TO DO: fix click event on colorSwatch
// add a clear button.


function createCanvasSize(size) {
  const sizes = {
    small: "400px",
    medium: "600px",
    large: "800px",
    xlarge: "1000px"
  };
  const sizedCanvas = document.createElement("canvas");
  sizedCanvas.setAttribute("width", sizes[size]);
  sizedCanvas.setAttribute("height", sizes[size]);
  return sizedCanvas;
}

function addColorToPicker() {
  const swatchContainer = document.getElementById("swatch-container");
  const colorSwatch = document.createElement("div");
  console.log(colorList);
  for (let i = colorList.length - 1; i >= 0; i--) {
    if (colorList[i] !== colorList[i - 1]) {
      swatchContainer.appendChild(colorSwatch);
      colorSwatch.className = "color-swatch";
      colorSwatch.setAttribute(
        "style",
        "background-color: " + currentColor.value + ";"
      );
      colorSwatch.addEventListener("click", function(e) {
        //having trouble with this here....
        currentColor.value = e.target.style.backgroundColor;
      });
      break;
    } else {
      console.log("same swatch");
      break;
    }
  }
}

function draw(context, preContext) {
  context.strokeStyle = "rgb(0,0,0)";
  preContext.strokeStyle = "rgb(0,0,0)";
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      context.strokeRect(i * 20, j * 20, 20, 20);
      preContext.strokeRect(i * 20, j * 20, 0, 0);
    }
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const gridSize = document.getElementById("grid-size");
  mainCanvas.innerHTML = "";
  previewCanvas.innerHTML = "";
  const canvas = createCanvasSize(gridSize.value);
  const preCanvas = createCanvasSize(gridSize.value);
  const context = canvas.getContext("2d");
  const preContext = preCanvas.getContext("2d");
  canvas.addEventListener("click", function(event) {
    let x = event.offsetX - event.offsetX % 20;
    let y = event.offsetY - event.offsetY % 20;
    let color = currentColor.value;
    context.fillStyle = color;
    preContext.fillStyle = color;
    context.fillRect(x, y, 20, 20);
    preContext.fillRect(x, y, 20, 20);
    colorList.push(color);
    addColorToPicker();
  });
  mainCanvas.appendChild(canvas);
  previewCanvas.appendChild(preCanvas);
  draw(context, preContext);
});
