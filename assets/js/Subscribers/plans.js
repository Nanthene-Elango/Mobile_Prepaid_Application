fetch('plans.json')
    .then(response => response.json())
    .then(data => {
        let popular = document.getElementById("popular-plans");
        let validity = document.getElementById("validity-plans");
        let data_plans = document.getElementById("data-plans");
        let unlimited = document.getElementById("unlimited-plans");

        data.plans.forEach(plan => {
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

            if (plan.category === "Popular") popular.appendChild(card);
            if (plan.category === "Validity") validity.appendChild(card);
            if (plan.category === "Data") data_plans.appendChild(card);
            if (plan.category === "Unlimited") unlimited.appendChild(card);
        });
    });

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
    
    function confirmPayment(plan){
        document.getElementById("planPrice").textContent = plan.price;
        document.getElementById("planValidity").textContent = plan.validity;
        document.getElementById("planData").textContent = plan.data;
        document.getElementById("planAmount").textContent = plan.price;

        var myModal = new bootstrap.Modal(document.getElementById('payConfirmation'));
        myModal.show();

    }

    function showFilters(){

        var myModal = new bootstrap.Modal(document.getElementById('planFilter'));
        myModal.show();
    }