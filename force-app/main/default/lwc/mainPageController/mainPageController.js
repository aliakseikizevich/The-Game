/* 
takes number of width and height
creates array of cells 
return result array 
**/
function createCells(width, height) {
    let cells = [];
    let counter = 0;
    for(let i = 0; i < width; i++) {
        for(let k = 0; k < height; k++) {
            const cell = {
                id: counter++,
                x: i,
                y: k,
                isEmpty: true
            }
            cells.push(cell);
        }
    }
    return cells;
}

/*
creates array of block size: 10
return result array
**/
function createEnergy() {
    let energy = [];
    for (let i = 0; i < 10; i++) {
        const block = {
            id: i
        };
        energy.push(block);
    }
    return energy;
}

/*
takes array of block 
adds to array 2 block, but after adding size of array must be less then 10
return result array
**/
function loadEnergy(energy) {
    for (let i = 0; i < 2; i++) {
        if(energy.length > 10) break;
        const block = {
            id: energy.length
        }
        energy.push(block);
    }
    return energy;
}

/*
takes object currentPlayerCell and array of cells
generates random number from 1 to 25, checking if result number equals currentPlayerCell.id, then calls recursively itself, else
searching for cell with same id like generated number and sets values(id, x, y) from cell to new object currentTargetCell.
return created object currentTargetCell.
**/
function generateTarget(currentPlayerCell, cells) {
    let currentTargetCell;
    const targetId = Math.floor((Math.random() * 24) + 1);

    if (targetId === currentPlayerCell.id) {
        currentTargetCell = this.generateTarget(currentPlayerCell, cells);
    } else if (!currentTargetCell) {
        const cell = cells.find(cell => cell.id === targetId);
        currentTargetCell = {
            id: targetId,
            x: cell.x,
            y: cell.y
        };
    }

    return currentTargetCell;
}

/*
takes String with direction and object currentCell.
changes values x, y in object, depended on value of direction.
return object currentCell.
**/
function move(direction, currentCell, maxSize) {
    if (direction === 'left') currentCell.y > 0 ? currentCell.y = currentCell.y - 1: currentCell.y = maxSize -1;
    if (direction === 'top') currentCell.x > 0 ? currentCell.x = currentCell.x - 1: currentCell.x = maxSize -1;
    if (direction === 'bottom') currentCell.x < maxSize -1 ? currentCell.x = currentCell.x + 1: currentCell.x = 0;
    if (direction === 'right') currentCell.y < maxSize -1 ? currentCell.y = currentCell.y + 1: currentCell.y = 0;

    return currentCell;
}

export { createCells, createEnergy, generateTarget, loadEnergy, move };