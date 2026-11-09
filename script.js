// Edit these sample products and prices to match your real catalogue.
const products = [
  {name:"NFC Smart Review Card",price:699,description:"A simple tap card that takes customers to your review or business link.",symbol:"NFC"},
  {name:"Digital Business Card",price:499,description:"Share your contact details and social links with one quick tap.",symbol:"TAP"},
  {name:"Custom NFC Card",price:899,description:"A personalised NFC card for your brand or business.",symbol:"✦"}
];

const grid = document.getElementById("productGrid");
products.forEach((product, index) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-visual"><span>${product.symbol}</span></div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-bottom"><span class="price">₹${product.price.toLocaleString("en-IN")}</span>
      <button class="order-btn" data-index="${index}">Order on DM ↗</button></div>
    </div>`;
  grid.appendChild(card);
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".order-btn");
  if (!button) return;
  const product = products[Number(button.dataset.index)];
  const message = `Hi TAPVANTA! I want to order: ${product.name} (₹${product.price}). Please share the details.`;
  window.open(`https://ig.me/m/tap_vanta?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();