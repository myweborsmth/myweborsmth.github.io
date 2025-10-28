const logo = document.querySelector(".titlebox p");
const container = document.querySelector(".titlebox");

let x = 100;
let y = 100;
let dx = 4; // speed in pixels
let dy = 4;

function bounce() {
  const containerRect = container.getBoundingClientRect();
  const logoRect = logo.getBoundingClientRect();

  // Move position
  x += dx;
  y += dy;

  // Bounce off walls
  if (x <= 0 || x + logoRect.width >= containerRect.width) {
    dx = -dx;
  }
  if (y <= 0 || y + logoRect.height >= containerRect.height) {
    dy = -dy;
  }

  // Apply transform
  logo.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;

  // Pixelated "frame-step" vibe
  setTimeout(() => requestAnimationFrame(bounce), 30);
}

bounce();
