
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

        if (issue.status === "open") {
            borderColor = "border-green-600";
        } 
        else if (issue.status === "closed") {
            borderColor = "border-purple-600";
        }

        if (issue.priority === "high") {
            bg_Color = "!bg-red-300";
        }
        else if (issue.priority === "medium") {
            bg_Color = "!bg-amber-100";
        }
        else {
            bg_Color = "!bg-purple-200";
        }

        div.innerHTML = ` 
            <div id="${issue.id}" class="space-y-4 p-4 shadow-md rounded-2xl h-full border-t-4 ${borderColor}">
                
                <!-- Priority badge -->
                <div class="flex justify-end p-4">
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
                        <span class="!bg-amber-200 text-black rounded px-2 py-1 text-sm">
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
                <div class="flex justify-between p-1">
                    <h3 class="opacity-70">${issue.assignee}</h3>
                    <p class="opacity-70">Updated: ${issue.updatedAt}</p>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}