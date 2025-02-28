// Generate Table
document.getElementById('generate-btn').addEventListener('click', () => {
    const number = parseInt(document.getElementById('number').value);
    const range = parseInt(document.getElementById('range').value);
    const operation = document.getElementById('operation').value;
    const table = document.getElementById('generator-table');
    const button = document.getElementById('clear-btn');
  
    if (isNaN(number) || range <= 0) {
      alert("Please enter a valid number and range.");
      return;
    }
  
    // Clear previous table content
    table.innerHTML = '';
  
    // Add table header
    const headerRow = table.insertRow();
    const headerCell = headerRow.insertCell(0);
    headerCell.colSpan = 3;
    headerCell.textContent = `${operation.charAt(0).toUpperCase() + operation.slice(1)} Table for ${number}`;
    headerCell.style.textAlign = 'center';
  
    // Add column labels
    const columnRow = table.insertRow();
    columnRow.innerHTML = `
      <th>Number</th>
      <th>Operand</th>
      <th>Result</th>
    `;
  
    // Populate table with rows
    for (let i = 1; i <= range; i++) {
      const row = table.insertRow();
      row.classList.add('table-row'); // Add animation class
  
      let result;
      switch (operation) {
        case 'multiplication':
          result = number * i;
          break;
        case 'addition':
          result = number + i;
          break;
        case 'subtraction':
          result = number - i;
          break;
        case 'division':
          result = i !== 0 ? (number / i).toFixed(2) : 'Infinity'; // Handle division by zero
          break;
      }
  
      row.innerHTML = `<td>${number}</td><td>${i}</td><td>${result}</td>`;
    }
  });
  
  // Clear Table
  document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('generator-table').innerHTML = '';
  });
  
  // Download as CSV
  document.getElementById('download-btn').addEventListener('click', () => {
    const table = document.getElementById('generator-table');
    if (table.rows.length === 0) {
      alert("No table to download. Please generate a table first.");
      return;
    }
  
    let csvContent = "data:text/csv;charset=utf-8,";
    for (const row of table.rows) {
      const rowData = Array.from(row.cells).map(cell => cell.textContent);
      csvContent += rowData.join(",") + "\r\n";
    }
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Update Range Value Dynamically
  document.getElementById('range').addEventListener('input', (event) => {
    document.getElementById('range-value').textContent = event.target.value;
  });
  
  // Theme Toggle
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
  