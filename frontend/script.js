// script.js

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.querySelector('.btn-primary');
const loginModal = document.getElementById('login-modal');
const modalClose = document.querySelector('.modal-close');
const cancelLoginBtn = document.getElementById('cancel-login');
const loginForm = document.getElementById('login-form');
const loginOverlay = document.querySelector('.modal-overlay');

// Show login modal when login button is clicked
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    loginOverlay.style.display = 'block';
});

// Close the login modal
modalClose.addEventListener('click', () => {
    loginModal.style.display = 'none';
    loginOverlay.style.display = 'none';
});

// Close the login modal when cancel button is clicked
cancelLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    loginOverlay.style.display = 'none';
});

// Submit the login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate a login attempt
    if (email && password) {
        alert(`Logged in as ${email}`);
        loginModal.style.display = 'none';
        loginOverlay.style.display = 'none';
    } else {
        alert('Please enter both email and password.');
    }
});

// Handle active class on sidebar menu items
const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li a');
sidebarMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarMenuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Add Device button functionality
const addDeviceBtn = document.querySelector('.btn-outline');
addDeviceBtn.addEventListener('click', () => {
    alert('Device addition functionality is not yet implemented.');
});

// Emissions chart filter buttons functionality
const chartFilterButtons = document.querySelectorAll('.filter-btn');
chartFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        chartFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Placeholder for chart update logic based on the selected filter
        alert(`Showing emissions for: ${button.textContent}`);
    });
});

// Token purchase buttons functionality
const purchaseBtns = document.querySelectorAll('.btn-primary');
purchaseBtns.forEach(button => {
    button.addEventListener('click', () => {
        const creditTitle = button.closest('.credit-card').querySelector('.credit-title').textContent;
        alert(`Purchasing credits for: ${creditTitle}`);
    });
});

// Data for the chart (replace this with real data or dynamic data)
const emissionsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
        label: 'Carbon Emissions (kg CO2)',
        data: [20, 30, 25, 15, 35],  // Example data
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1
    }]
};

// Create the chart
const ctx = document.getElementById('emissionsChart').getContext('2d');
const emissionsChart = new Chart(ctx, {
    type: 'bar',  // You can change this to 'line', 'pie', etc.
    data: emissionsData,
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
                    text: 'Time (Weeks)'
                }
            }
        }
    }
});

// Filter functionality for the chart
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterType = button.textContent;
        
        if (filterType === 'This Month') {
            emissionsChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            emissionsChart.data.datasets[0].data = [20, 30, 25, 15];
        } else if (filterType === 'Last 30 Days') {
            emissionsChart.data.labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
            emissionsChart.data.datasets[0].data = [10, 15, 12, 8, 20];
        }

        emissionsChart.update();
    });
});
