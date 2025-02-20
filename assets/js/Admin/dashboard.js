let plansData = [];
let categories = ["Data", "Validity", "Unlimited", "Popular"]; // Default categories

fetch('plans.json')
    .then(response => response.json())
    .then(data => {
        plansData = data.plans;
        displayPlans(plansData);
        loadCategories();
    });

function displayPlans(plans) {
    const tableBody = document.getElementById("plansTable");
    tableBody.innerHTML = "";
    plans.forEach((plan, index) => {
        tableBody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${plan.category}</td>
                        <td>${plan.price}</td>
                        <td>${plan.data}</td>
                        <td>${plan.validity}</td>
                        <td>${plan.benefits}</td>
                        <td>
                            <span class="action-btn text-primary me-1" style="cursor:pointer" onclick="editPlan(${plan.planid})"><i class="fas fa-edit text-primary"></i> Edit</span>
                            <span class="action-btn text-danger" style="cursor:pointer" onclick="deletePlan(${plan.planid})"><i class="fas fa-trash text-danger"></i> Delete</span>
                        </td>
                    </tr>`;
    });
}

function loadCategories() {
    const categorySelect = document.getElementById("planCategory");
    categorySelect.innerHTML = ""; // Clear previous options
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function filterPlans(category) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    if (category === "All") {
        displayPlans(plansData);
    } else {
        const filteredPlans = plansData.filter(plan => plan.category === category);
        displayPlans(filteredPlans);
    }
}

function openAddModal() {
    document.getElementById("modalTitle").innerText = "Add Plan";
    document.getElementById("editPlanId").value = "";
    document.getElementById("planCategory").value = categories[0]; // Set default to first category
    document.getElementById("planData").value = "";
    document.getElementById("planValidity").value = "";
    document.getElementById("planPrice").value = "";
    document.getElementById("planBenefits").value = "";
    new bootstrap.Modal(document.getElementById("planModal")).show();
}

function editPlan(planId) {
    const plan = plansData.find(p => p.planid === planId);
    document.getElementById("modalTitle").innerText = "Edit Plan";
    document.getElementById("editPlanId").value = plan.planid;
    document.getElementById("planCategory").value = plan.category;
    document.getElementById("planData").value = plan.data;
    document.getElementById("planValidity").value = plan.validity;
    document.getElementById("planPrice").value = plan.price;
    document.getElementById("planBenefits").value = plan.benefits;
    new bootstrap.Modal(document.getElementById("planModal")).show();
}

document.getElementById("savePlanBtn").addEventListener("click", function () {
    const id = document.getElementById("editPlanId").value;
    const category = document.getElementById("planCategory").value;
    const data = document.getElementById("planData").value;
    const validity = document.getElementById("planValidity").value;
    const price = document.getElementById("planPrice").value;
    const benefits = document.getElementById("planBenefits").value;

    if (id) {
        const plan = plansData.find(p => p.planid == id);
        plan.category = category;
        plan.data = data;
        plan.validity = validity;
        plan.price = price;
        plan.benefits = benefits;
    } else {
        plansData.push({ planid: plansData.length + 1, category, data, validity, price, benefits });
    }
    displayPlans(plansData);
    bootstrap.Modal.getInstance(document.getElementById("planModal")).hide();
});

// function deletePlan(planId) {

//     plansData = plansData.filter(plan => plan.planid !== planId);
//     displayPlans(plansData);
// }

function deletePlan(planId) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0d6efd",
        confirmButtonText: "Yes, delete it!"
        
    }).then((result) => {
        if (result.isConfirmed) {
            plansData = plansData.filter(plan => plan.planid !== planId);
            displayPlans(plansData);
            Swal.fire("Deleted!", "Your plan has been deleted.", "success");
        }
    });
}

function addCategory() {
    const newCategory = document.getElementById("newCategory").value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        addCategoryTab(newCategory);
        loadCategories();
        document.getElementById("newCategory").value = "";
        showToast(`Category "${newCategory}" added successfully!` , "success");
    } 
    else if(newCategory === ""){
        showToast(`Category is empty!` , "error");
    } 
    else
    {
        showToast(`Category "${newCategory}" already exists!` , "error");
    }
}

function addCategoryTab(newCategory){
    let newCat = document.createElement("div");
    newCat.textContent = newCategory;
    newCat.classList.add("tab");
    newCat.onclick = function () {
        filterPlans(newCategory);
    };
    document.getElementById("categoriesNav").appendChild(newCat);
}

function showToast(message , indicator) {
    const toastContainer = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    if (indicator === "error"){
        toast.innerHTML = `<div class="toast-body text-danger">${message}</div>`;
    }
    else{
        toast.innerHTML = `<div class="toast-body text-success">${message}</div>`;
    }
    toastContainer.appendChild(toast);
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toastContainer.removeChild(toast), 300);
    }, 3000);
}

function createToastContainer() {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container position-fixed top-0 end-0 p-3 my-5";
    document.body.appendChild(toastContainer);
    return toastContainer;
}

$('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})

$('#myList a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})

$(document).ready(function () {
    $('#exampleTable').DataTable();
});

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Sales',
            data: [10, 20, 15, 25, 30],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true
    }
});

const chart = document.getElementById('myPieChart1').getContext('2d');
new Chart(chart, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
            data: [20, 30, 15, 25, 10],
            backgroundColor: ['#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB']
            ,
        }]
    },
    options: {
        responsive: true
    }
});
const chart1 = document.getElementById('myLineChart').getContext('2d');
new Chart(chart1, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [10, 25, 15, 40, 30, 50],
            borderColor: 'blue',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true
    }
});

function hideSidebar() {
    document.getElementById("sidebar").classList.add("d-none");
    document.getElementById("main").classList.remove("col-lg-8");
    document.getElementById("main").classList.add("col-lg-12");
    document.getElementById("hideSideBar").classList.add("d-none");
    document.getElementById("showSideBar").classList.remove("d-none");
}
function showSidebar() {
    document.getElementById("sidebar").classList.remove("d-none");
    document.getElementById("main").classList.add("col-lg-8");
    document.getElementById("main").classList.remove("col-lg-12");
    document.getElementById("hideSideBar").classList.remove("d-none");
    document.getElementById("showSideBar").classList.add("d-none");
}