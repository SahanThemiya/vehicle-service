const API_BASE = 'http://localhost:8081/api/vehicle';

// Add Vehicle
document.getElementById('addVehicleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const vehicle = {
        vehicleType: document.getElementById('vehicleType').value,
        serviceYear: parseInt(document.getElementById('serviceYear').value),
        ownerName: document.getElementById('ownerName').value
    };

    try {
        showLoading();
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle)
        });
        const data = await res.json();
        showMessage(`Vehicle added successfully! ID: ${data.id}`, 'success');
        e.target.reset();
    } catch (err) {
        showMessage('Error adding vehicle: ' + err.message, 'error');
    }
});

// Search Vehicles by Year
document.getElementById('searchYearForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const year = document.getElementById('searchYear').value;

    try {
        showLoading();
        const res = await fetch(`${API_BASE}/year/${year}`);
        const vehicles = await res.json();

        if (vehicles.length === 0) {
            showMessage(`No vehicles found for year ${year}`, 'info');
        } else {
            displayVehicles(vehicles);
        }
    } catch (err) {
        showMessage('Error searching vehicles: ' + err.message, 'error');
    }
});

// Get Vehicle Type
document.getElementById('getTypeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('vehicleId').value;

    try {
        showLoading();
        const res = await fetch(`${API_BASE}/${id}/type`);
        const type = await res.text();
        showMessage(`Vehicle Type: ${type}`, 'success');
    } catch (err) {
        showMessage('Error getting vehicle type: ' + err.message, 'error');
    }
});

// Delete Vehicles by Year
document.getElementById('deleteYearForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const year = document.getElementById('deleteYear').value;

    if (!confirm(`Delete all vehicles from year ${year}?`)) return;

    try {
        showLoading();
        const res = await fetch(`${API_BASE}/year/${year}`, { method: 'DELETE' });
        const msg = await res.text();
        showMessage(msg, 'success');
        e.target.reset();
    } catch (err) {
        showMessage('Error deleting vehicles: ' + err.message, 'error');
    }
});

// Display Vehicles
function displayVehicles(vehicles) {
    const results = document.getElementById('results');
    results.innerHTML = `
    <div class="vehicle-list">
      ${vehicles.map(v => `
        <div class="vehicle-item">
          <h3>${v.vehicleType}</h3>
          <p><strong>ID:</strong> ${v.serviceId}</p>
          <p><strong>Year:</strong> ${v.serviceYear}</p>
          <p><strong>Owner:</strong> ${v.ownerName}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Helpers
function showMessage(message, type) {
    const results = document.getElementById('results');
    results.innerHTML = `<div class="message ${type}">${message}</div>`;
}

function showLoading() {
    const results = document.getElementById('results');
    results.innerHTML = `<div class="loading">⏳ Loading...</div>`;
}
