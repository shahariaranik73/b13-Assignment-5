
let allIssues = [];


const loadIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then(data => {

            allIssues = data.data;


            displayIssues(allIssues);


            updateIssueCount(allIssues.length);
        });
}

// function call
loadIssue();


function setActive(btn) {

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(b => {
        b.classList.remove("!bg-blue-600", "text-white");
        b.classList.add("!bg-gray-200");
    });

    btn.classList.remove("!bg-gray-200");
    btn.classList.add("!bg-blue-600", "text-white");
}



function updateIssueCount(count) {
    document.getElementById("all-issu").innerText = count;
}


function filterIssues(status) {
    let filteredIssues = [];


    if (status === "all") {
        filteredIssues = allIssues;
    }

    else {
        filteredIssues = allIssues.filter(issue => issue.status === status);
    }


    displayIssues(filteredIssues);

    updateIssueCount(filteredIssues.length);
}


const displayIssues = (issues) => {

    const container = document.getElementById("issue-container");

    container.innerHTML = "";

    issues.forEach(issue => {
        const div = document.createElement('div');

        let borderColor = "";
        let bg_Color = "";
            // open Close bg-color effecte
        if (issue.status === "open") {
            borderColor = "border-green-600";
        }
        else if (issue.status === "closed") {
            borderColor = "border-purple-600";
        }
            // priority
        if (issue.priority === "high") {
            bg_Color = "bg-red-300";
        }
        else if (issue.priority === "medium") {
            bg_Color = "bg-amber-100";
        }
        else {
            bg_Color = "bg-purple-200";
        }

        div.innerHTML = ` 
            <div id="${issue.id}" onclick="loadCardDetail(${issue.id})" class="space-y-4 p-3 shadow-lg rounded-2xl h-full border-t-4 ${borderColor}">
                
                <!-- Priority badge -->
                <div class="flex justify-end p-2">
                    <span class="rounded-full border-2 px-3 py-1 ${bg_Color}">
                        ${issue.priority}
                    </span>
                </div>

                <!-- Issue title -->
                <h2 class="text-2xl font-semibold">${issue.title}</h2>

                <!-- Issue description -->
                <p class="text-[#64748B]">${issue.description}</p>
                
                <!-- Labels -->
                <div class="flex gap-2 mb-2.5 flex-wrap">
                    ${issue.labels.map(label => `
                        <span class="bg-amber-200 text-black rounded px-2 py-1 text-sm">
                            ${label}
                        </span>
                    `).join('')}
                </div>
                
                <hr class="opacity-10">

                <!-- Author info -->
                <div class="flex justify-between p-1">
                    <h3 class="opacity-70">Added by: ${issue.author}</h3>
                    <p class="opacity-70">${issue.createdAt}</p>
                </div>

                <!-- Assignee info -->
                <div class="grid md:grid-cols-2 justify-between p-1">
                    <h3 class="opacity-70">${issue.assignee}</h3>
                    <p class=" opacity-70">Updated: ${issue.updatedAt}</p>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

const loadCardDetail = async (id) => {
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);
    const details = await res.json();

    displayCardDetails(details.data)
    // console.log(details)
}

// modal Render card

const displayCardDetails = (word) => {
    // console.log(word)
    const cardBox = document.getElementById("card-modalContainer");

    // status bg-color

     if (word.status === "open") {
            bgColor ="bg-green-600 text-white";
        }
        else if (word.status === "closed") {
            bgColor ="bg-purple-600 text-white";
        }

    // color effect

     if (word.priority === "high") {
            bg_Color = "bg-red-600 text-white";
        }
        else if (word.priority === "medium") {
            bg_Color = "bg-amber-600 text-white";
        }
        else {
            bg_Color = "bg-purple-600 text-white";
        }


    cardBox.innerHTML = `
                <div class="space-y-4">
                        <h2 class="text-2xl font-bold">${word.title}</h2>
                        <div class="flex items-center gap-4">
                            <button class="rounded-full border-2 px-3 py-1 ${bgColor}">${word.status}</button>
                            <p class="opacity-50">${word.updatedAt}</p>
                        </div>

                            <div class="flex gap-2 mb-2.5 flex-wrap">
                                ${word.labels.map(label => `
                                <span class="bg-amber-200 text-black rounded px-2 py-1 text-sm">
                                ${label}</span>`).join('')}
                            </div>
                        
                            <p class="opacity-60">${word.description}</p>

                        <div class="flex justify-between items-center p-2 bg-[#F8FAFC] ">
                            <div>
                             <h2 class="">Assignee:</h2>
                                <h2 class="font-bold">${word.author}</h2>
                            </div>

                            <div class="pr-4 text-center">
                                <h2 class="">Priority:</h2>
                                <button class="rounded-full border-2 px-3 py-1 ${bg_Color}">${word.priority}</button>
                            </div>

                        </div>
                   </div>
    
    `;

    document.getElementById("my_modal_5").showModal()
}
