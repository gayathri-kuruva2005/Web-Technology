const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 1. Display a filled rectangle (Blue)
ctx.fillStyle = "#198ddaff";
ctx.fillRect(50, 50, 150, 80);

// 2. Display a filled circle (Red)
ctx.beginPath();
ctx.arc(400, 90, 40, 0, Math.PI * 2);
ctx.fillStyle = "#e7311cff";
ctx.fill();

// 3. Display a straight line
ctx.beginPath();
ctx.moveTo(50, 200);   // Start point
ctx.lineTo(450, 200);  // End point
ctx.lineWidth = 3;
ctx.strokeStyle = "#2c3e50";
ctx.stroke();

// 4. Display the text "HTML5 Canvas"
ctx.font = "bold 30px Arial";
ctx.fillStyle = "#2ecc71";
ctx.textAlign = "center";
ctx.fillText("HTML5 Canvas", canvas.width / 2, 260);