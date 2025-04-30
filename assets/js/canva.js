// Get the canvas and 2D rendering context
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let vanishingPoint = { x: 0, y: 0 };

//Resize canvas and update vanishing point
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  vanishingPoint = {
    x: canvas.width / 2,
    y: canvas.height * 0.25,
  };
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial setup

// Draw the sky using a vertical gradient
function drawSky() {
  const gradient = c.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1a1a1a"); // Top: dark gray
  gradient.addColorStop(0.5, "#ffa733"); // Middle: orange
  gradient.addColorStop(0.8, "#fff6e0"); // Bottom: light cream
  c.fillStyle = gradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw a glowing sun effect at the vanishing point
function drawSunGlow() {
  const gradient = c.createRadialGradient(
    vanishingPoint.x,
    vanishingPoint.y,
    0,
    vanishingPoint.x,
    vanishingPoint.y,
    200
  );
  gradient.addColorStop(0, "rgba(255, 200, 0, 0.8)"); // Bright center
  gradient.addColorStop(1, "rgba(255, 200, 0, 0)"); // Transparent edges
  c.fillStyle = gradient;
  c.beginPath();
  c.arc(vanishingPoint.x, vanishingPoint.y, 200, 0, Math.PI * 2);
  c.fill();
}
// Draw a wide road with multiple lanes
function drawRoad() {
  const roadBottomWidth = canvas.width * 0.8;
  const roadTopWidth = canvas.width * 0.08;
  c.beginPath();
  c.moveTo(vanishingPoint.x - roadTopWidth / 2, vanishingPoint.y);
  c.lineTo(vanishingPoint.x + roadTopWidth / 2, vanishingPoint.y);
  c.lineTo(canvas.width / 2 + roadBottomWidth / 2, canvas.height);
  c.lineTo(canvas.width / 2 - roadBottomWidth / 2, canvas.height);
  c.closePath();
  c.fillStyle = "	#5f5f5f";
  c.fill();
}

// Draw multiple dashed lane lines
function drawRoadLines() {
  const numLanes = 4; // Total number of lanes (2 in each direction)
  for (let lane = 1; lane < numLanes; lane++) {
    const t = lane / numLanes;

    const xTop =
      vanishingPoint.x - (canvas.width * 0.08) / 2 + t * canvas.width * 0.08;
    const xBottom =
      canvas.width / 2 - (canvas.width * 0.8) / 2 + t * canvas.width * 0.8;

    // Draw dashed lane from top to bottom
    for (let i = 0; i < 40; i++) {
      const yStart =
        vanishingPoint.y + (canvas.height - vanishingPoint.y) * (i / 40);
      const yEnd = yStart + 15;

      const x = xTop + (xBottom - xTop) * (i / 40);

      const width = 2 + (i / 40) * 4;

      c.fillStyle = "white";
      // Begin a single path for the whole dashed line
      c.beginPath();
      c.moveTo(xTop, vanishingPoint.y);
      c.lineTo(xBottom, canvas.height);
      c.strokeStyle = "white";
      c.lineWidth = 2; // You can adjust this per lane for perspective if desired
      c.setLineDash([20, 20]); // Dash and gap lengths
      c.stroke();
      c.setLineDash([]); // Reset after use
    }
  }

  // Add side shoulders
  drawShoulderLines();
}

function drawShoulderLines() {
  const leftTop = vanishingPoint.x - (canvas.width * 0.08) / 2;
  const rightTop = vanishingPoint.x + (canvas.width * 0.08) / 2;
  const leftBottom = canvas.width / 2 - (canvas.width * 0.8) / 2;
  const rightBottom = canvas.width / 2 + (canvas.width * 0.8) / 2;

  c.strokeStyle = "#ccc";
  c.lineWidth = 2;

  c.beginPath();
  c.moveTo(leftTop, vanishingPoint.y);
  c.lineTo(leftBottom, canvas.height);
  c.stroke();

  c.beginPath();
  c.moveTo(rightTop, vanishingPoint.y);
  c.lineTo(rightBottom, canvas.height);
  c.stroke();
}

// Main rendering function: redraws everything each frame
function render() {
  c.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  drawSky(); // Background gradient sky
  drawSunGlow(); // Glowing sun effect
  drawRoad(); // Road base
  drawRoadLines(); // Road lane markers
  requestAnimationFrame(render); // Keep looping
}

render(); // Initial call to start rendering

// Update canvas size when window resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
