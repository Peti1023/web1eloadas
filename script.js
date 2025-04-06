// NAVIGÁCIÓ: A menüpontok közti váltás
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Aktivált link beállítása
    document.querySelectorAll('nav ul li a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    // Összes tartalmi szekció elrejtése
    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    // A kiválasztott szekció megjelenítése
    const sectionId = this.getAttribute('data-section');
    document.getElementById(sectionId).style.display = 'block';
  });
});


let tableData = [];
let currentId = 1;
let sortConfig = { column: null, ascending: true };
let filterValues = { id: '', name: '', height: '', weight: '' };

const tableForm = document.getElementById('tableForm');
const dataTableBody = document.querySelector('#dataTable tbody');

// Frissítéskor a táblázat újrarenderelése
function renderTable() {
  dataTableBody.innerHTML = '';
  
  // Szűrés
  let filteredData = tableData.filter(row => {
    return Object.keys(filterValues).every(key => 
      String(row[key]).toLowerCase().includes(filterValues[key].toLowerCase())
    );
  });

  // Rendezés
  if (sortConfig.column) {
    filteredData.sort((a, b) => {
      let valA = a[sortConfig.column];
      let valB = b[sortConfig.column];

      // Számok összehasonlítása, ha lehet
      if (!isNaN(valA) && !isNaN(valB)) {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (valA < valB) return sortConfig.ascending ? -1 : 1;
      if (valA > valB) return sortConfig.ascending ? 1 : -1;
      return 0;
    });
  }

  // Megjelenítés
  filteredData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.height}</td>
      <td>${row.weight}</td>
      <td>
        <button onclick="editRow(${row.id})">Szerkeszt</button>
        <button onclick="deleteRow(${row.id})">Töröl</button>
      </td>
    `;
    dataTableBody.appendChild(tr);
  });
}

tableForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const rowId = document.getElementById('rowId').value;
  
    //  Validációk
    if (name.length < 7 || name.length > 30) {
      alert("A név legalább 7 és legfeljebb 30 karakter hosszú lehet!");
      return;
    }
  
    if (isNaN(height) || height < 70 || height > 200) {
      alert("A magasságnak 70 és 200 között kell lennie!");
      return;
    }
  
    if (isNaN(weight) || weight < 1 || weight > 150) {
      alert("A súlynak 1 és 150 között kell lennie!");
      return;
    }
  
    //  Szerkesztés vagy új elem
    if (rowId) {
      const index = tableData.findIndex(item => item.id == rowId);
      if (index !== -1) {
        tableData[index] = {id: parseInt(rowId), name, height, weight};
      }
    } else {
      tableData.push({id: currentId++, name, height, weight});
    }
  
    tableForm.reset();
    renderTable();
  });
  

function editRow(id) {
  const row = tableData.find(item => item.id === id);
  if (row) {
    document.getElementById('rowId').value = row.id;
    document.getElementById('name').value = row.name;
    document.getElementById('height').value = row.height;
    document.getElementById('weight').value = row.weight;
  }
}

function deleteRow(id) {
  tableData = tableData.filter(item => item.id !== id);
  renderTable();
}

//  Szűrő mezők eseménykezelése
document.querySelectorAll('.columnFilter').forEach(input => {
  input.addEventListener('input', function() {
    const column = this.getAttribute('data-column');
    filterValues[column] = this.value;
    renderTable();
  });
});



//  Rendezés oszlopokra kattintva
document.querySelectorAll('#dataTable th[data-column]').forEach(header => {
  header.addEventListener('click', function() {
    const column = this.getAttribute('data-column');
    if (sortConfig.column === column) {
      sortConfig.ascending = !sortConfig.ascending;
    } else {
      sortConfig.column = column;
      sortConfig.ascending = true;
    }
    renderTable();
  });
});

// ---------- HTML5 PÉLDÁK ----------
  
  // Web Storage
  document.getElementById('saveDataBtn').addEventListener('click', function() {
    localStorage.setItem('myData', 'Ez egy példa adat.');
    document.getElementById('storageOutput').innerText = 'Adat mentve a localStorage-be.';
  });
  document.getElementById('loadDataBtn').addEventListener('click', function() {
    const data = localStorage.getItem('myData');
    document.getElementById('storageOutput').innerText = data ? data : 'Nincs adat.';
  });
  
  // Web Worker
  let myWorker;
  document.getElementById('startWorkerBtn').addEventListener('click', function() {
    if (window.Worker) {
      if (!myWorker) {
        myWorker = new Worker('worker.js');
        myWorker.onmessage = function(e) {
          document.getElementById('workerOutput').innerText = 'Worker: ' + e.data;
        }
      }
      myWorker.postMessage('start');
    } else {
      document.getElementById('workerOutput').innerText = 'Web Workers nem támogatott.';
    }
  });
  
  // Geolocation API
  document.getElementById('getLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('locationOutput').innerText =
          `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
      });
    } else {
      document.getElementById('locationOutput').innerText = 'Geolocation nem támogatott.';
    }
  });
  
  // Drag and Drop
  const dragSource = document.getElementById('dragSource');
  const dropTarget = document.getElementById('dropTarget');
  dragSource.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', 'Ez az adat.');
  });
  dropTarget.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  dropTarget.addEventListener('drop', function(e) {
    e.preventDefault();
    dropTarget.innerText = 'Adat átvéve: ' + e.dataTransfer.getData('text/plain');
  });
  
  // Canvas: Egyszerű rajz
  const canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 50);
  }
  
