// Initialize Web3
let web3;
let accounts;
let emissionsData = [];
let chart;

// Function to initialize Web3
async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            console.log('Connected accounts:', accounts);
        } catch (error) {
            console.error('User  denied account access or there was an error:', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Function to calculate statistics from emissions data
function calculateStatistics() {
    const now = new Date();
    let totalEmissions = 0;
    let totalOffsets = 0;
    let tokenBalance = 0; // Assuming you have a way to calculate or fetch this

    emissionsData.forEach(entry => {
        const date = new Date(entry.Date);
        const emissions = parseFloat(entry['Carbon Emissions (kg CO2e)']);
        const offsets = parseFloat(entry['Offsets (kg CO2e)']); // Assuming you have this in your CSV

        // Calculate total emissions for the current month
        if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
            totalEmissions += emissions;
        }

        // Calculate total offsets for the current month
        if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
            totalOffsets += offsets;
        }
    });

    // Update the dashboard with calculated values
    updateDashboard(totalEmissions, tokenBalance, totalOffsets);
}

// Function to update the dashboard with calculated values
function updateDashboard(carbonFootprint, tokenBalance, offsets) {
    const carbonFootprintElement = document.querySelector('.stat-value:nth-child(1)');
    const tokenBalanceElement = document.querySelector('.stat-value:nth-child(2)');
    const offsetsElement = document.querySelector('.stat-value:nth-child(3)');

    if (carbonFootprintElement) {
        carbonFootprintElement.textContent = carbonFootprint !== null ? `${carbonFootprint.toFixed(2)} tons` : '0.00 tons';
    } else {
        console.error('Carbon footprint element not found');
    }

    if (tokenBalanceElement) {
        tokenBalanceElement.textContent = tokenBalance !== null ? `${tokenBalance.toFixed(2)}` : '0';
    } else {
        console.error('Token balance element not found');
    }

    if (offsetsElement) {
        offsetsElement.textContent = offsets !== null ? `${offsets.toFixed(2)} tons` : '0.00 tons';
    } else {
        console.error('Offsets element not found');
    }
}



// Function to load CSV data
async function loadCSV() {
    const response = await fetch('sample-data.csv');
    const text = await response.text();
    Papa.parse(text, {
        header: true,
        complete: (results) => {
            emissionsData = results.data;
            console.log('Loaded emissions data:', emissionsData); // Check the loaded data
            updateChart('week'); // Default to week view
        }
    });
}

// Function to update the chart based on the selected time frame
function updateChart(timeFrame) {
    const filteredData = filterDataByTimeFrame(emissionsData, timeFrame);
    const labels = filteredData.map(entry => entry.Date);
    const values = filteredData.map(entry => parseFloat(entry['Carbon Emissions (kg CO2e)']));

    console.log('Chart labels:', labels); // Log the labels
    console.log('Chart values:', values); // Log the values
    
    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = values;
        chart.update();
    } else {
        initChart({ labels, values });
    }
}

// Function to filter data based on the selected time frame
function filterDataByTimeFrame(data, timeFrame) {
    const now = new Date();
    const filtered = data.filter(entry => {
        const date = new Date(entry.Date);
        if (timeFrame === 'day') {
            return date.toDateString() === now.toDateString();
        } else if (timeFrame === 'week') {
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
            return date >= weekStart && date <= new Date();
        } else if (timeFrame === 'month') {
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        } else if (timeFrame === 'year') {
            return date.getFullYear() === now.getFullYear();
        }
        return false;
    });
    console.log('Filtered data:', filtered); // Log the filtered data
    return filtered;
}

// Function to initialize the chart
function initChart(data) {
    const ctx = document.getElementById('emissionsChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Carbon Emissions (kg CO2)',
                data: data.values,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Carbon Emissions (kg CO2)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Function to disconnect from MetaMask
function disconnect() {
    accounts = []; // Clear the accounts array
    console.log('Disconnected from MetaMask');
}


// Add a button in your HTML to trigger the disconnect
document.getElementById('disconnectFromMetamask').addEventListener('click', disconnect);

// Connect button event listener using the ID
const connectButton = document.getElementById('connectToMetamask');
connectButton.addEventListener('click', init);

// Load CSV data on page load
window.onload = loadCSV;

// Add event listeners for the filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        updateChart(event.target.textContent.toLowerCase());
    });
});

