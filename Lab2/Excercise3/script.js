// 1. Allow dropping by preventing default browser behavior
function allowDrop(ev) {
    ev.preventDefault();
}

// 2. Set the data being dragged (the ID of the task card)
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// 3. Handle the drop event
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const taskCard = document.getElementById(data);
    const dropZone = ev.currentTarget;

    // Append the card to the new column
    dropZone.appendChild(taskCard);

    // Logic for the Completed column
    if (dropZone.id === "completed") {
        taskCard.style.backgroundColor = "#d4edda"; // Light Green
        alert("Task Completed Successfully");
    } else {
        // Reset color if moved back to other columns
        taskCard.style.backgroundColor = "white";
    }
}

// 4. Create a new task dynamically
function addTask() {
    const input = document.getElementById("taskInput");
    const taskName = input.value;

    if (taskName.trim() === "") {
        alert("Please enter a task name");
        return;
    }

    // Generate unique ID and current date
    const taskId = "task-" + Date.now();
    const date = new Date().toLocaleDateString();

    // Create the task card element
    const card = document.createElement("div");
    card.className = "task-card";
    card.id = taskId;
    card.draggable = true;
    
    // Attach the drag event
    card.ondragstart = drag;

    // Set internal content
    card.innerHTML = `
        <strong>${taskName}</strong><br>
        <small>Date: ${date}</small>
    `;

    // Add to 'To Do' column by default
    document.getElementById("todo").appendChild(card);

    // Clear the input field
    input.value = "";
}