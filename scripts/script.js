let grid = [[], [], [], []];
let images = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function makeGrid() {

    let selection = null;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            selection = Math.floor(Math.random() * images.length);
            grid[i][j] = images[selection];
            console.log(grid[i][j]);
            images.splice(selection, 1);
        }
    }
    console.log(grid);
    return grid;
}
makeGrid();

function createCards() {
    for (let i = 0; i < grid.length; i++) {
        let newDiv = document.createElement("div");
        for (let j = 0; j < grid[0].length; j++) {
            console.log("hi");
            newButton = document.createElement("button");
            newButton.innerHTML = grid[i][j];
            document.newDiv.appendChild(newButton);
        }
        document.body.appendChild(newDiv);
    }
}
createCards();