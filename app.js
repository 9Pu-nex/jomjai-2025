// Main application script
let dataTable;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Form submission
    document.getElementById('myForm').addEventListener('submit', handleFormSubmit);
    
    // Floor navigation
    document.getElementById('floor1').addEventListener('click', (e) => showRoomSelector(e, 'floor1'));
    document.getElementById('floor2').addEventListener('click', (e) => showRoomSelector(e, 'floor2'));
    document.getElementById('floor3').addEventListener('click', (e) => showRoomSelector(e, 'floor3'));
}

// Load data from Google Sheets
async function loadData() {
    try {
        showLoading(true);
        const response = await fetch(`${CONFIG.SCRIPT_URL}?action=getData`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        showData(data);
    } catch (error) {
        console.error('Error loading data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load booking data. Please check your configuration.',
        });
    } finally {
        showLoading(false);
    }
}

// Display data in DataTable
function showData(dataArray) {
    // Destroy existing table if it exists
    if (dataTable) {
        dataTable.destroy();
    }
    
    // Create DataTable
    dataTable = new DataTable('#example', {
        data: dataArray.slice(1),
        columns: [
            { title: 'ID' },
            { title: 'Room' },
            { title: 'Date' },
            { title: 'Day' },
            { title: 'Code' },
            { title: 'Period 1<br>8:30-9:20' },
            { title: 'Period 2<br>9:20-10:10' },
            { title: 'Period 3<br>10:25-11:15' },
            { title: 'Period 4<br>11:15-12:05' },
            { title: 'Period 5<br>12:55-1:45' },
            { title: 'Period 6<br>1:50-2:40' },
            { title: 'Period 7<br>2:45-3:35' },
            { title: 'After School' },
        ],
        columnDefs: [
            {
                data: null,
                defaultContent: '<button class="btn btn-warning btn-sm" onclick="editData(this)">Reserve</button>',
                targets: 13
            },
        ],
        lengthMenu: [
            [7, 10, 30, -1],
            ['7', '10', '30', 'All']
        ],
        createdRow: function(row, data, dataIndex) {
            $(row).find('td').each(function(index, td) {
                if ($(td).html().trim() === '') {
                    $(td).css('background-color', '#34eb95');
                }
            });
        },
        destroy: true,
        language: {
            sProcessing: "กำลังดำเนินการ...",
            sLengthMenu: "_MENU_ ",
            sZeroRecords: "ไม่พบข้อมูล",
            sInfo: '<i class="fas fa-angle-double-left"></i> _START_ to _END_ from _TOTAL_ Day <i class="fas fa-angle-double-right"></i>',
            sInfoEmpty: "Show 0 to 0 From 0 Day",
            sInfoFiltered: "(กรองข้อมูล _MAX_ ทุกแถว)",
            sSearch: '<i class="fas fa-search"></i> Search by date :',
            oPaginate: {
                sFirst: "First Page",
                sPrevious: '<i class="fas fa-chevron-left fa-lg"></i>',
                sNext: '<i class="fas fa-chevron-right fa-lg"></i>',
                sLast: "Last Page"
            }
        }
    });
}

// Edit/Reserve data
function editData(el) {
    const row = el.parentNode.parentNode;
    const cells = row.cells;
    
    document.getElementById('numid').value = cells[0].innerText;
    document.getElementById('room').value = cells[1].innerText;
    document.getElementById('date').value = cells[2].innerText;
    document.getElementById('day').value = cells[3].innerText;
    document.getElementById('code').value = cells[4].innerText;
    document.getElementById('pr1').value = cells[5].innerText;
    document.getElementById('pr2').value = cells[6].innerText;
    document.getElementById('pr3').value = cells[7].innerText;
    document.getElementById('pr4').value = cells[8].innerText;
    document.getElementById('pr5').value = cells[9].innerText;
    document.getElementById('pr6').value = cells[10].innerText;
    document.getElementById('pr7').value = cells[11].innerText;
    document.getElementById('pr8').value = cells[12].innerText;

    const allInputs = document.querySelectorAll('#pr1, #pr2, #pr3, #pr4, #pr5, #pr6, #pr7, #pr8');
    const submitButton = document.querySelector('button[type="submit"]');
    
    let isAnyRowEmpty = false;
    allInputs.forEach(input => {
        if (input.value.trim() === "") {
            isAnyRowEmpty = true;
            input.style.display = 'block';
        } else {
            input.style.display = 'none';
        }
    });

    submitButton.style.display = isAnyRowEmpty ? 'block' : 'none';
    document.getElementById('id01').style.display = 'block';
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, book it!"
    });
    
    if (result.isConfirmed) {
        await saveData();
    }
}

// Save data to Google Sheets
async function saveData() {
    try {
        showLoading(true);
        
        const formData = {
            numid: document.getElementById('numid').value,
            room: document.getElementById('room').value,
            date: document.getElementById('date').value,
            day: document.getElementById('day').value,
            code: document.getElementById('code').value,
            pr1: document.getElementById('pr1').value,
            pr2: document.getElementById('pr2').value,
            pr3: document.getElementById('pr3').value,
            pr4: document.getElementById('pr4').value,
            pr5: document.getElementById('pr5').value,
            pr6: document.getElementById('pr6').value,
            pr7: document.getElementById('pr7').value,
            pr8: document.getElementById('pr8').value
        };
        
        const response = await fetch(`${CONFIG.SCRIPT_URL}?action=saveData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save data');
        }
        
        await Swal.fire({
            title: "Booked!",
            text: "Your room has been booked.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
        
        document.getElementById('myForm').reset();
        closeModal();
        await loadData();
        
    } catch (error) {
        console.error('Error saving data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to save booking. Please try again.',
        });
    } finally {
        showLoading(false);
    }
}

// Close modal
function closeModal() {
    document.getElementById('id01').style.display = 'none';
}

// Show/hide loading overlay
function showLoading(show) {
    document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}

// Show room selector
async function showRoomSelector(event, floor) {
    event.preventDefault();
    
    const floorData = CONFIG.ROOMS[floor];
    const inputOptions = {};
    inputOptions[floorData.title] = {};
    
    Object.keys(floorData.rooms).forEach(key => {
        inputOptions[floorData.title][key] = floorData.rooms[key].name;
    });
    
    const { value: selectedRoom } = await Swal.fire({
        title: "Please Select Your Room",
        input: "select",
        inputOptions: inputOptions,
        inputPlaceholder: "Select your room",
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value && floorData.rooms[value]) {
                    resolve();
                } else {
                    resolve("You need to select a room!");
                }
            });
        }
    });
    
    if (selectedRoom && floorData.rooms[selectedRoom]) {
        await showLoadingAlert();
        window.open(floorData.rooms[selectedRoom].url, "_blank");
    }
}

// Show loading alert
async function showLoadingAlert() {
    let timerInterval;
    await Swal.fire({
        title: "Loading Data...",
        html: "Automatic close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    });
}
