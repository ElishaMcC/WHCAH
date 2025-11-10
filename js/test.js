const rows = 6;
const cols = 6;
const grid = document.getElementById('grid');
const cellsize = 100;

// Create the table
const cells = [];
for (let r = 0; r < rows; r++) {
    const row = document.createElement('tr');
    const rowCells = [];
    for (let c = 0; c < cols; c++) {
        const cell = document.createElement('td');
        // Randomly fill some cells at start
        switch (Math.ceil(Math.random() * 10)) {
            case 1:
                cell.className = "gemA";
                break;
            case 2:
                cell.className = "gemB";
                break;
            case 3:
                cell.className = "gemC";
                break;
            case 4:
                cell.className = "gemD";
                break;
            case 5:
                cell.className = "gemE";
                break;
            case 6:
                cell.className = "gemF";
                break;
            case 7:
                cell.className = "gemG";
                break;
            case 8:
                cell.className = "gemH";
                break;
            case 9:
                cell.className = "gemI";
                break;
            case 10:
                cell.className = "gemJ";
                break;
        }
        row.appendChild(cell);
        rowCells.push(cell);
    }
    grid.appendChild(row);
    cells.push(rowCells);
}

// Gravity function
function Grav() {
    for (let c = 0; c < cols; c++) {
        for (let r = rows - 1; r >= 0; r--) {
            if (cells[r][c].className === 'empty') {
                // find the closest non-empty cell above
                let k = r - 1;
                while (k >= 0 && cells[k][c].className === 'empty') k--;
                if (k >= 0) {
                    cells[r][c].className = cells[k][c].className;
                    cells[k][c].className = 'empty';
                }
            }
        }
    }
    fillTop();
}

function fillTop() {
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            if (cells[r][c].className === 'empty') {
                const rand = Math.ceil(Math.random() * 10);
                const gem = ['gemA','gemB','gemC','gemD','gemE','gemF','gemG','gemH','gemI','gemJ'][rand-1];
                cells[r][c].className = gem;
            }
        }
    }
}

let startCell = null;
let startX = 0;
let startY = 0;
let dragging = false;
let direction = null;

grid.addEventListener('auxclick', e => {
    if (e.target.tagName !== 'TD') return;
    e.preventDefault();
    e.target.className = 'empty';
    Grav();
    matchCheck();
});

grid.addEventListener('mousedown', e => {
    if (e.target.tagName !== 'TD') return;
    startCell = e.target;
    startX = e.clientX;
    startY = e.clientY;
    dragging = true;
    direction = null;
});

grid.addEventListener('mousemove', e => {
    if (!dragging || !startCell) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rowIndex = [...startCell.parentNode.parentNode.children].indexOf(startCell.parentNode);
    const colIndex = [...startCell.parentNode.children].indexOf(startCell);

    if (!direction) {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            direction = Math.abs(dx) > Math.abs(dy) ? 'row' : 'col';
        } else {
            return;
        }
    }

    if (direction == 'row') {
        const shiftnum = Math.floor(dx / cellsize);
        if (shiftnum !== 0) {
            shiftRow(rowIndex, Math.sign(shiftnum), Math.abs(shiftnum));
            startX += shiftnum * cellsize;
        }
    } else if (direction === 'col') {
        const shiftnum = Math.floor(dy / cellsize);
        if (shiftnum !== 0) {
            shiftCol(colIndex, Math.sign(shiftnum), Math.abs(shiftnum));
            startY += shiftnum * cellsize;
        }
    }
});

grid.addEventListener('mouseup', e => {
    dragging = false;
    startCell = null;
    direction = null;
});



function shiftRow(r, dir, count = 1) {
    for (let i = 0; i < count; i++) {
        if (dir > 0) {
            const lastGem = cells[r][cols - 1].className;
            for (let j = cols - 1; j > 0; j--) cells[r][j].className = cells[r][j - 1].className;
            cells[r][0].className = lastGem;
        } else {
            const firstGem = cells[r][0].className;
            for (let j = 0; j < cols - 1; j++) cells[r][j].className = cells[r][j + 1].className;
            cells[r][cols - 1].className = firstGem;
        }
    }
    Grav();
    matchCheck();
}

function shiftCol(c, dir, count = 1) {
    for (let i = 0; i < count; i++) {
        if (dir > 0) {
            const lastGem = cells[rows - 1][c].className;
            for (let j = rows - 1; j > 0; j--) cells[j][c].className = cells[j - 1][c].className;
            cells[0][c].className = lastGem;
        } else {
            const firstGem = cells[0][c].className;
            for (let j = 0; j < rows - 1; j++) cells[j][c].className = cells[j + 1][c].className;
            cells[rows - 1][c].className = firstGem;
        }
    }
    Grav();
    matchCheck();
}

function matchCheck() {
    let matched;
    do {
        matched = false;
        const toClear = [];

        // Check rows
        for (let r = 0; r < rows; r++) {
            let count = 1;
            for (let c = 0; c < cols; c++) {
                if (
                    c < cols - 1 &&
                    cells[r][c].className !== 'empty' &&
                    cells[r][c].className === cells[r][c + 1].className
                ) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let k = 0; k < count; k++) {
                            toClear.push([r, c - k]);
                        }
                        matched = true;
                    }
                    count = 1;
                }
            }
        }

        // Check columns
        for (let c = 0; c < cols; c++) {
            let count = 1;
            for (let r = 0; r < rows; r++) {
                if (
                    r < rows - 1 &&
                    cells[r][c].className !== 'empty' &&
                    cells[r][c].className === cells[r + 1][c].className
                ) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let k = 0; k < count; k++) {
                            toClear.push([r - k, c]);
                        }
                        matched = true;
                    }
                    count = 1;
                }
            }
        }

        // Clear matched cells
        toClear.forEach(([r, c]) => {
            cells[r][c].className = 'empty';
        });

        if (matched) Grav(); // Apply gravity after clearing
    } while (matched);
}