//TAPVANTA NFC cards — tier pricing, quantity selector and Instagram DM order.
const products = [
  {
    name: "Normal NFC Card",
    description: "A clean, standard NFC tap card for your business or review link.",
    symbol: "NORMAL",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=85",
    prices: {1:399, 5:379, 10:349, 25:329, 50:299, 100:279}
  },
  {
    name: "Premium NFC Card",
    description: "A premium-look NFC card with an elegant finish for your business.",
    symbol: "PREMIUM",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85",
    prices: {1:599, 5:569, 10:549, 25:499, 50:449, 100:399}
  },
  {
    name: "Customized NFC Card",
    description: "A personalized NFC card with your business name, logo and preferred design.",
    symbol: "CUSTOM",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=85",
    prices: {1:699, 5:669, 10:649, 25:599, 50:549, 100:499}
  }
];

const quantities = [1, 5, 10, 25, 50, 100];
const grid = document.getElementById("productGrid");

// Keep these controls readable even if the site's original stylesheet is unchanged.
const style = document.createElement("style");
style.textContent = `
  .product-visual { min-height:210px; background-size:cover; background-position:center; display:grid; place-items:center; }
  .product-visual span { color:#fff; background:rgba(13,9,22,.62); border:1px solid rgba(255,255,255,.45); border-radius:9px; padding:12px 18px; letter-spacing:3px; font-weight:700; }
  .bulk-controls { margin-top:16px; display:grid; gap:9px; }
  .bulk-controls label { color:#bcb5c9; font-size:12px; }
  .bulk-controls select { width:100%; padding:11px 12px; border-radius:8px; border:1px solid #55456d; color:#fff; background:#1b1525; }
  .bulk-total { display:flex; align-items:center; justify-content:space-between; gap:8px; color:#d5cbe4; font-size:12px; }
  .bulk-total strong { color:#fff; font-size:17px; }
  .bulk-controls .unit { color:#bcb5c9; font-size:11px; }
  .product-bottom { gap:10px; flex-wrap:wrap; }
  .product-bottom .price { white-space:nowrap; }
  .product-bottom .order-btn { cursor:pointer; }
`;
document.head.appendChild(style);

products.forEach((product, index) => {
  const card = document.createElement("article");
  card.className = "product-card";
  const options = quantities.map(q => `<option value="${q}">${q} ${q === 1 ? "card" : "cards"}</option>`).join("");
  card.innerHTML = `
    <div class="product-visual product-visual-${index + 1}" style="background-image:linear-gradient(0deg,rgba(12,8,20,.38),rgba(12,8,20,.12)),url('${product.image}')">
      <span>${product.symbol}</span>
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="bulk-controls">
        <label for="quantity-${index}">Select quantity</label>
        <select id="quantity-${index}" class="quantity-select">${options}</select>
        <div class="bulk-total"><span class="unit" id="unit-${index}">₹${product.prices[1]} per card</span><span>Total <strong id="total-${index}">₹${product.prices[1].toLocaleString("en-IN")}</strong></span></div>
      </div>
      <div class="product-bottom">
        <span class="price" id="price-${index}">₹${product.prices[1]} / card</span>
        <button class="order-btn" type="button" data-index="${index}">Order on DM ↗</button>
      </div>
    </div>`;
  grid.appendChild(card);

  const select = card.querySelector(".quantity-select");
  select.addEventListener("change", () => {
    const qty = Number(select.value);
    const unitPrice = product.prices[qty];
    const total = qty * unitPrice;
    card.querySelector(`#unit-${index}`).textContent = `₹${unitPrice.toLocaleString("en-IN")} per card`;
    card.querySelector(`#total-${index}`).textContent = `₹${total.toLocaleString("en-IN")}`;
    card.querySelector(`#price-${index}`).textContent = `₹${unitPrice.toLocaleString("en-IN")} / card`;
  });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".order-btn");
  if (!button) return;

  const index = Number(button.dataset.index);
  const product = products[index];
  const card = button.closest(".product-card");
  const quantity = Number(card.querySelector(".quantity-select").value);
  const unitPrice = product.prices[quantity];
  const total = quantity * unitPrice;

  const message = [
    "Hi TAPVANTA! I want to place an order.",
    `Product: ${product.name}`,
    `Quantity: ${quantity}`,
    `Price per card: ₹${unitPrice}`,
    `Total: ₹${total.toLocaleString("en-IN")}`,
    "Please share the next steps."
  ].join("\n");

  const instagramDM = `https://ig.me/m/tap_vanta?text=${encodeURIComponent(message)}`;
  window.open(instagramDM, "_blank", "noopener,noreferrer");
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("nav").classList.remove("open"));
});
document.getElementById("year").textContent = new Date().getFullYear();
