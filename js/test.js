const rows = 6;
const cols = 5;
const grid = document.getElementById('grid');

// Create the table
const cells = [];
for (let r = 0; r < rows; r++) {
  const row = document.createElement('tr');
  const rowCells = [];
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement('td');
    // Randomly fill some cells at start
    if (Math.random() < 0.3) {
      cell.textContent = '⬤';
      cell.classList.add('filled');
    }
    row.appendChild(cell);
    rowCells.push(cell);
  }
  grid.appendChild(row);
  cells.push(rowCells);
}

// Gravity function
function applyGravity() {
  for (let c = 0; c < cols; c++) {
    for (let r = rows - 2; r >= 0; r--) {
      if (cells[r][c].classList.contains('filled')) {
        let nextR = r;
        while (nextR + 1 < rows && !cells[nextR + 1][c].classList.contains('filled')) {
          nextR++;
        }
        if (nextR !== r) {
          // Move content down
          cells[nextR][c].textContent = cells[r][c].textContent;
          cells[nextR][c].classList.add('filled');
          cells[r][c].textContent = '';
          cells[r][c].classList.remove('filled');
        }
      }
    }
  }
}
  document.getElementById('fallButton').addEventListener('click', applyGravity);
