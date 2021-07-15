let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");

let deleteBtn = document.querySelector(".delete");
let deleteMode = false;
let colors = ["pink", "blue", "green", "black"];

let allFiltersChildren = document.querySelectorAll(".filter div");


// ---------- SETTING-UP THE COLOR CLASS ON CLICK --------------
for (let i = 0; i < allFiltersChildren.length; i++) {
    allFiltersChildren[i].addEventListener("click", function(e) {

        if (e.currentTarget.parentElement.classList.contains("color-selected")) {
            e.currentTarget.parentElement.classList.remove("color-selected");
            loadTasks();
            return;
        } else {
            for (let j = 0; j < allFiltersChildren.length; j++) {
                if (allFiltersChildren[j].parentElement.classList.contains("color-selected")) {
                    allFiltersChildren[j].parentElement.classList.remove("color-selected");
                }
            }
            e.currentTarget.parentElement.classList.add("color-selected");
        }
        let filterColor = e.currentTarget.classList[0];
        loadTasks(filterColor);
    });
}

// ----------- CREATING A LOCALSTORAGE --------------
if (localStorage.getItem("AllTickets") == undefined) {
    let allTickets = {};
    allTickets = JSON.stringify(allTickets);
    localStorage.setItem("AllTickets", allTickets);
}

loadTasks();

// --------- CREATING A EVENTLISTNER OF DELETE BUTTON --------------
deleteBtn.addEventListener("click", function(e) {
    if (e.currentTarget.classList.contains("delete-selected")) {
        e.currentTarget.classList.remove("delete-selected");
        deleteMode = false;
    } else {
        e.currentTarget.classList.add("delete-selected");
        deleteMode = true;
    }
});




// ------------- FUNCTIONALITY OF ADD BUTTON --------
addBtn.addEventListener("click", function() {

    deleteBtn.classList.remove("delete-selected");
    deleteMode = false;

    let preModal = document.querySelector(".modal");

    if (preModal != null) return;



    let div = document.createElement("div");
    div.classList.add("modal");
    div.innerHTML = `<div class="modal">
    <div class="task-section">
        <div class="task-inner-container" contenteditable="true"></div>
    </div>
    <div class="modal-priority-section">
        <div class="priority-inner-conatiner">
            <div class="modal-priority pink"></div>
            <div class="modal-priority blue"></div>
            <div class="modal-priority green"></div>
            <div class="modal-priority black selected"></div>
        </div>
    </div>
</div>`



    let ticketColor = "black";

    // -------------  SETTING UP THE CLASS OF COLOR SELECTED ON CLICK ------------
    let allModalPriority = div.querySelectorAll(".modal-priority");
    for (let i = 0; i < allModalPriority.length; i++) {
        allModalPriority[i].addEventListener("click", function(e) {
            for (let j = 0; j < allModalPriority.length; j++) {
                allModalPriority[j].classList.remove("selected");
            }

            e.currentTarget.classList.add("selected");

            ticketColor = e.currentTarget.classList[1];


        });

    }

    let taskInnerContainer = div.querySelector(".task-inner-container");

    // ------- ON ENTERING CREATING A UNIQUE-ID AND TASK GIVEN BY THE USER -------
    taskInnerContainer.addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            let id = uid();
            let task = e.currentTarget.innerText;


            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));


            let ticketObj = {
                color: ticketColor,
                taskValue: task,
            };


            allTickets[id] = ticketObj;



            localStorage.setItem("AllTickets", JSON.stringify(allTickets));


            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.setAttribute("data-id", id);

            ticketDiv.innerHTML = ` 
            <div data-id="${id}" class="ticket-color ${ticketColor}"></div>
            <div class="ticket-id">
                #${id};
            </div>
            <div data-id="${id}" class="actual-task" contenteditable="true">
                ${task}
            </div>
        </div>`;


            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");


            let actualTaskDiv = ticketDiv.querySelector(".actual-task");

            // ----- UPDATING THE CHNAGES IN TASK EVERY TIME WHEN SOMETHING IS INPUTED  --------
            actualTaskDiv.addEventListener("input", function(e) {
                let updatedTask = e.currentTarget.innerText;
                let currTicketId = e.currentTarget.getAttribute("data-id");

                let allTickets = JSON.parse(localStorage.getItem("AllTickets"));


                allTickets[currTicketId].taskValue = updatedTask;


                localStorage.setItem("AllTickets", JSON.stringify(allTickets));
            })

            // ------ GIVING THE FUNCTIONALITY OF COLOR CHANGE BY USER ------
            // -> COLOIR DENOTES THE PRIORITY 
            ticketColorDiv.addEventListener("click", function(e) {

                let currTicketId = e.currentTarget.getAttribute("data-id");
                let currColor = e.currentTarget.classList[1];

                let index = -1;
                for (let i = 0; i < colors.length; i++) {
                    if (currColor == colors[i]) {
                        index = i;
                    }
                }

                index++;
                index = index % 4;

                let newColor = colors[index];


                let allTickets = JSON.parse(localStorage.getItem("AllTickets"));


                allTickets[currTicketId].color = newColor;


                localStorage.setItem("AllTickets", JSON.stringify(allTickets));



                ticketColorDiv.classList.remove(currColor);
                ticketColorDiv.classList.add(newColor);

            })

            // ---- ON CLICKING ON TICKET THE TICKET WILL BE DELETED ---------
            ticketDiv.addEventListener("click", function(e) {
                if (deleteMode) {
                    let currTicketId = e.currentTarget.getAttribute("data-id");
                    e.currentTarget.remove();

                    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
                    delete allTickets[currTicketId];
                    localStorage.setItem("AllTickets", JSON.stringify(allTickets));
                }
            });


            grid.append(ticketDiv);
            div.remove();
        } else if (e.key == "Escape") {
            div.remove();
        }
    });
    body.append(div);
});


//------------ EVERNT LISTENERS FUNCTION OF LOADING TICKETS AND LISTENERS ------
function loadTasks(color) {

    let ticketsOnUi = document.querySelectorAll(".ticket");

    for (let i = 0; i < ticketsOnUi.length; i++) {
        ticketsOnUi[i].remove();
    }

    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));


    for (x in allTickets) {
        let currTicketId = x;
        let singleTicketObj = allTickets[x];

        if (color && color != singleTicketObj.color) continue;

        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        ticketDiv.setAttribute("data-id", currTicketId);

        ticketDiv.innerHTML = ` 
        <div data-id="${currTicketId}" class="ticket-color ${singleTicketObj.color}"></div>
        <div class="ticket-id">
        #${currTicketId};
        </div>
        <div data-id="${currTicketId}" class="actual-task" contenteditable="true">
        ${singleTicketObj.taskValue}
        </div>
        </div>`;

        let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
        let actualTaskDiv = ticketDiv.querySelector(".actual-task");



        actualTaskDiv.addEventListener("input", function(e) {
            let updatedTask = e.currentTarget.innerText;
            let currTicketId = e.currentTarget.getAttribute("data-id");

            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));


            allTickets[currTicketId].taskValue = updatedTask;


            localStorage.setItem("AllTickets", JSON.stringify(allTickets));
        })

        ticketColorDiv.addEventListener("click", function(e) {

            let currTicketId = e.currentTarget.getAttribute("data-id");
            let currColor = e.currentTarget.classList[1];

            let index = -1;
            for (let i = 0; i < colors.length; i++) {
                if (currColor == colors[i]) {
                    index = i;
                }
            }

            index++;
            index = index % 4;

            let newColor = colors[index];


            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));


            allTickets[currTicketId].color = newColor;


            localStorage.setItem("AllTickets", JSON.stringify(allTickets));



            ticketColorDiv.classList.remove(currColor);
            ticketColorDiv.classList.add(newColor);

        })


        ticketDiv.addEventListener("click", function(e) {
            if (deleteMode) {
                let currTicketId = e.currentTarget.getAttribute("data-id");
                e.currentTarget.remove();

                let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
                delete allTickets[currTicketId];
                localStorage.setItem("AllTickets", JSON.stringify(allTickets));
            }
        });


        grid.append(ticketDiv);
    }

}