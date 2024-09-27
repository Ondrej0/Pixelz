const pixelArtContainer = document.getElementById("pixelArtContainer");
const exportBtn = document.getElementById("exportBtn");
const gridSizeInput = document.getElementById("gridSize");
const pickedColor = document.getElementById("colorChange");
const eraser = document.getElementById("eraser");



let isDrawing = false; // Flag to track if the mouse is down

// Create a grid of divs

const gridSize = gridSizeInput.value; // Get the current value of the range input
pixelArtContainer.innerHTML = ""; // Clear the existing grid

// Generate the new grid based on the current grid size
for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";

    // Add mouse event listeners for drawing
    pixel.addEventListener("mousedown", () => {
        isDrawing = true;
        if(eraser.checked){
            pixel.style.backgroundColor = "white";
        }else{
            pixel.style.backgroundColor = pickedColor.value; // Change color when mouse is pressed down
        }
        
       
    });

    pixel.addEventListener("mousemove", () => {
        if (isDrawing) {
            if(eraser.checked){
                pixel.style.backgroundColor = "white";
            }else{
                pixel.style.backgroundColor = pickedColor.value; // Change color when mouse is pressed down
            }
        }
    });

    pixelArtContainer.appendChild(pixel);
}

//Changes size of grid when size changes
gridSizeInput.addEventListener("input", () => {
    const gridSize = gridSizeInput.value; // Get the current value of the range input
    pixelArtContainer.innerHTML = ""; // Clear the existing grid

    // Generate the new grid based on the current grid size
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";

        // Add mouse event listeners for drawing
        pixel.addEventListener("mousedown", () => {
            isDrawing = true;
            if(eraser.checked){
                pixel.style.backgroundColor = "white";
            }else{
                pixel.style.backgroundColor = pickedColor.value; // Change color when mouse is pressed down
            }
            
           
        });

        pixel.addEventListener("mousemove", () => {
            if (isDrawing) {
                if(eraser.checked){
                    pixel.style.backgroundColor = "white";
                }else{
                    pixel.style.backgroundColor = pickedColor.value; // Change color when mouse is pressed down
                }
            }
        });

        pixelArtContainer.appendChild(pixel);
    }

    // Set the grid template columns dynamically based on the grid size
    pixelArtContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
});


// Add event listener to the document to handle mouse up event
document.addEventListener("mouseup", () => {
    isDrawing = false;
});

exportBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Get the current grid size from the gridSizeInput
    const gridSize = gridSizeInput.value;

    // Size of each pixel (can be adjusted if needed)
    const pixelSize = 20;

    // Set canvas size to match grid size and pixel size
    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;

    // Draw each pixel onto the canvas
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel, index) => {
        const col = index % gridSize;
        const row = Math.floor(index / gridSize);
        ctx.fillStyle = window.getComputedStyle(pixel).backgroundColor;
        ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    });

    // Convert canvas to image and trigger download
    const imageURI = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imageURI;
    a.download = "pixel-art.png";
    a.click();
});