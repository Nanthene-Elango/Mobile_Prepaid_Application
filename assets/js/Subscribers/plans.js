var plans = [];

document.addEventListener("DOMContentLoaded", function () {

    fetch("plans.json")
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            plans = data.plans; // Store fetched data in the array
            console.log("Fetched Plans:", plans); // Debugging (Check in console)

            displayPlans(plans);
        })
        .catch(error => console.error("Error fetching plans:", error));
})

function filterPlans() {
    document.getElementById("clear").classList.remove("d-none");

    let maxPrice = document.getElementById("pricerange").value;

    let selectedData = Array.from(document.querySelectorAll('#dataFilter input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    console.log(selectedData);

    let selectedValidity = Array.from(document.querySelectorAll('#validityFilter input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    console.log(selectedValidity);

    let filteredPlans = plans.filter(plan =>
        plan.price <= maxPrice &&
        (selectedData.length === 0 || selectedData.includes(plan.data)) &&
        (selectedValidity.length === 0 || selectedValidity.includes(plan.validity))
    );

    console.log(filteredPlans);
    displayFilteredPlans(filteredPlans);
}

function clearFilters() {
  
    let rangeInput = document.getElementById("pricerange");
    rangeInput.value = 2500;
    document.getElementById("rangeValue").innerText = "2500"; // Update displayed value

    // Uncheck all checkboxes in Data and Validity sections
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    if(document.getElementById("plansContainer").classList.contains("d-none")){
        document.getElementById("plansContainer").classList.remove("d-none");
    }
    else{
        if(document.getElementById("popular-plans").classList.contains("d-none")){
            document.getElementById("popular-plans").classList.remove("d-none")
        }
        if(document.getElementById("validity-plans").classList.contains("d-none")){
            document.getElementById("validity-plans").classList.remove("d-none")
        }
        if(document.getElementById("data-plans").classList.contains("d-none")){
            document.getElementById("data-plans").classList.remove("d-none")
        }
        if(document.getElementById("unlimited-plans").classList.contains("d-none")){
            document.getElementById("unlimited-plans").classList.remove("d-none")
        }
    }
    
    // Re-display all plans (You may need to refetch or re-render them)
    displayPlans(plans);
    document.getElementById("clear").classList.add("d-none");
}

function displayFilteredPlans(filteredPlans){

    if(document.getElementById("plansContainer").classList.contains("d-none")){
        document.getElementById("plansContainer").classList.remove("d-none");
    }
    else{
        if(document.getElementById("popular-plans").classList.contains("d-none")){
            document.getElementById("popular-plans").classList.remove("d-none")
        }
        if(document.getElementById("validity-plans").classList.contains("d-none")){
            document.getElementById("validity-plans").classList.remove("d-none")
        }
        if(document.getElementById("data-plans").classList.contains("d-none")){
            document.getElementById("data-plans").classList.remove("d-none")
        }
        if(document.getElementById("unlimited-plans").classList.contains("d-none")){
            document.getElementById("unlimited-plans").classList.remove("d-none")
        }
    }
   

    let allPlans = document.getElementById("all-plan-cards");
    let popular = document.getElementById("popular-plan-cards");
    let validity = document.getElementById("validity-plan-cards");
    let data_plans = document.getElementById("data-plan-cards");
    let unlimited = document.getElementById("unlimited-plan-cards");


    allPlans.innerHTML = "";
    popular.innerHTML = "";
    validity.innerHTML = "";
    data_plans.innerHTML = "";
    unlimited.innerHTML = "";

    console.log(filteredPlans)

    if(filteredPlans.length == 0){
        document.getElementById("plansContainer").classList.add("d-none");
        return;
    }
    filteredPlans.forEach(plan => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="col-12 card-body d-flex flex-column my-1 p-4">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex justify-content-between col-10">
                        <div><strong>Rs. ${plan.price}</strong><br>Unlimited Calls</div>
                        <div><strong>${plan.data}</strong><br>Data</div>
                        <div><strong>${plan.validity}</strong><br>Validity</div>
                    </div>
                    <a onclick='confirmPayment(${JSON.stringify(plan)})'>
                        <i class="fa-solid fa-chevron-right fa-lg px-2" style="color: #002060; cursor:pointer"></i>
                    </a>
                </div>
                <hr>
                <div class="d-flex justify-content-end view-details">
                    <div>
                        <a class="text-primary text-decoration-none" style="cursor:pointer" 
                           onclick='showDetails(${JSON.stringify(plan)})'>View Details</a>
                    </div>
                </div>
            </div>
        `;

        allPlans.appendChild(card.cloneNode(true));
        if (plan.category === "Popular") popular.appendChild(card);
        if (plan.category === "Validity") validity.appendChild(card);
        if (plan.category === "Data") data_plans.appendChild(card);
        if (plan.category === "Unlimited") unlimited.appendChild(card);

       
        if(popular.children.length == 0){
            document.getElementById("popular-plans").classList.add("d-none");
        }
        if(validity.children.length == 0){
            document.getElementById("validity-plans").classList.add("d-none");
        }
        if(data_plans.children.length == 0){
            document.getElementById("data-plans").classList.add("d-none");
        }
        if(unlimited.children.length == 0){
            document.getElementById("unlimited-plans").classList.add("d-none");
        }
       
    });
}
function displayPlans(plans) {

    let allPlans = document.getElementById("all-plan-cards");
    let popular = document.getElementById("popular-plan-cards");
    let validity = document.getElementById("validity-plan-cards");
    let data_plans = document.getElementById("data-plan-cards");
    let unlimited = document.getElementById("unlimited-plan-cards");


    plans.forEach(plan => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="col-12 card-body d-flex flex-column my-1 p-4">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex justify-content-between col-10">
                        <div><strong>Rs. ${plan.price}</strong><br>Unlimited Calls</div>
                        <div><strong>${plan.data}</strong><br>Data</div>
                        <div><strong>${plan.validity}</strong><br>Validity</div>
                    </div>
                    <a onclick='confirmPayment(${JSON.stringify(plan)})'>
                        <i class="fa-solid fa-chevron-right fa-lg px-2" style="color: #002060; cursor:pointer"></i>
                    </a>
                </div>
                <hr>
                <div class="d-flex justify-content-end view-details">
                    <div>
                        <a class="text-primary text-decoration-none" style="cursor:pointer" 
                           onclick='showDetails(${JSON.stringify(plan)})'>View Details</a>
                    </div>
                </div>
            </div>
        `;

        allPlans.appendChild(card.cloneNode(true));
        if (plan.category === "Popular") popular.appendChild(card);
        if (plan.category === "Validity") validity.appendChild(card);
        if (plan.category === "Data") data_plans.appendChild(card);
        if (plan.category === "Unlimited") unlimited.appendChild(card);
    });
}

function showDetails(plan) {

    // Update modal content
    document.getElementById("price").textContent = `Rs. ${plan.price}`;
    document.getElementById("validity").textContent = plan.validity;
    document.getElementById("data").textContent = plan.data;

    // Show additional benefits if they exist, otherwise display "No additional benefits"
    let benefitsContainer = document.getElementById("benefits");
    if (plan.benefits && plan.benefits.length > 0) {
        benefitsContainer.innerHTML = plan.benefits.map(b => `<p>${b}</p>`).join('');
    } else {
        benefitsContainer.innerHTML = `<p>No additional benefits</p>`;
    }

    var myModal = new bootstrap.Modal(document.getElementById('planDetail'));
    myModal.show();
}

function confirmPayment(plan) {
    document.getElementById("planPrice").textContent = plan.price;
    document.getElementById("planValidity").textContent = plan.validity;
    document.getElementById("planData").textContent = plan.data;
    document.getElementById("planAmount").textContent = plan.price;

    var myModal = new bootstrap.Modal(document.getElementById('payConfirmation'));
    myModal.show();

}

function showFilters() {

    var myModal = new bootstrap.Modal(document.getElementById('planFilter'));
    myModal.show();
}