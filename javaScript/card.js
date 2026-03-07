const loadIssue = ()=> {
    fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then ((res) => res.json())
    .then(data => {
     const issues = data.data;
    //  console.log(issues)

        displayIssues(issues)
    });

}
loadIssue();

const displayIssues = (issues)=>{

    const container = document.getElementById("issue-container");
    container.innerHTML= "";

//     "title": "Add dark mode support",
// "description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
// "status": "open",
// "labels": [
// "enhancement",
// "good first issue"
// ],
// "priority": "medium",
// "author": "sarah_dev",
// "assignee": "",
// "createdAt": "2024-01-14T14:20:00Z",
// "updatedAt": "2024-01-16T09:15:00Z"

    issues.forEach(issue => {
        const div = document.createElement('div');
        div.innerHTML = ` 
        <div class="space-y-4 p-4 shadow-md rounded-2xl h-full">
                <!-- priority head -->
                <div class="flex justify-end p-4"><span class="rounded-full border-2            border-amber-400 px-3 py-1">

                  ${issue.priority} </span></div>

                <h2 class="text-2xl font-semibold">${issue.title} </h2>

                <p class="text[#64748B10]">${issue.description} </p>
                
                    <div class="flex gap-2 mb-2.5 flex-wrap">
                            ${issue.labels.map(label => `
                       <span class="!bg-amber-200 text-black rounded px-2 py-1 text-sm">${label}</span>`).join('')}
                    </div>
                
                <hr class="opacity-10">
                <!-- author info -->
                <div class="flex justify-between p-1">
                    <h3 class="opacity-70"> Added by: ${issue.author} </h3>
                    <p class="opacity-70">${issue.createdAt}</p>
                </div>
                <div class="flex justify-between p-1">
                    <h3 class="opacity-70">${issue.assignee} </h3>
                    <p class="opacity-70">Updated: ${issue.updatedAt}</p>
                </div>
            </div>
        
        `;
        container.appendChild(div);
        
    });
    
}