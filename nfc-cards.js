//TAPVANTA NFC catalogue: category-specific product photos, three finishes, bulk pricing and Instagram order message.
const rates = {
  Normal: {1:399, 5:379, 10:349, 25:329, 50:299, 100:279},
  Premium: {1:599, 5:569, 10:549, 25:499, 50:449, 100:399},
  Customized: {1:699, 5:669, 10:649, 25:599, 50:549, 100:499}
};
const categoryPhotos = {
  "Google Review Card": ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85","https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1200&q=85","https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=85"],
  "Instagram NFC Card": ["https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1200&q=85","https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&q=85","https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=85"],
  "WhatsApp NFC Card": ["https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&q=85","https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=85","https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200&q=85"],
  "Digital Menu Card": ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85","https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?w=1200&q=85"],
  "Digital Business Card": ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=85","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85","https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85"],
  "Website NFC Card": ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=85","https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85","https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=85"],
  "Google Maps Location Card": ["https://images.unsplash.com/photo-1524666041070-9a87656c1f6a?w=1200&q=85","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85","https://images.unsplash.com/photo-1502920514313-52581002a659?w=1200&q=85"],
  "Social Media NFC Card": ["https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&q=85","https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=85","https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=85"],
  "Custom Link Card": ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=85","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85","https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85"]
};
const category = new URLSearchParams(window.location.search).get("category") || "Google Review Card";
const photos = categoryPhotos[category] || categoryPhotos["Google Review Card"];
document.getElementById("categoryTitle").textContent = category;
document.title = category + " | TAPVANTA";
const format = amount => "₹" + amount.toLocaleString("en-IN");
const quantities = [1,5,10,25,50,100];

["Normal","Premium","Customized"].forEach((type,index) => {
  const select = document.getElementById("qty" + type);
  const image = document.querySelector('[data-type="' + type + '"] .variant-visual img');
  if (image) {
    image.src = photos[index];
    image.alt = category + " — " + type + " NFC card";
    image.onerror = () => { image.onerror = null; image.src = photos[0]; };
  }
  quantities.forEach(quantity => {
    const option = document.createElement("option");
    option.value = quantity;
    option.textContent = quantity + (quantity === 1 ? " card" : " cards");
    select.appendChild(option);
  });
  function updatePrice() {
    const quantity = Number(select.value);
    const unitPrice = rates[type][quantity];
    document.getElementById("unit" + type).textContent = format(unitPrice) + " per card";
    document.getElementById("total" + type).textContent = format(quantity * unitPrice);
    document.getElementById("large" + type).textContent = format(unitPrice) + " / card";
  }
  select.addEventListener("change", updatePrice);
  updatePrice();
});
document.querySelectorAll("[data-order]").forEach(button => button.addEventListener("click", () => {
  const type = button.dataset.order;
  const quantity = Number(document.getElementById("qty" + type).value);
  const unitPrice = rates[type][quantity];
  const message = [
    "Hi TAPVANTA! I want to order NFC cards.",
    "Category: " + category,
    "Card type: " + type,
    "Quantity: " + quantity,
    "Price per card: " + format(unitPrice),
    "Total amount: " + format(quantity * unitPrice),
    "Please confirm availability, delivery charges and payment details."
  ].join("\n");
  // Instagram may prefill the message; customer must tap Send to submit it.
  window.open("https://ig.me/m/tap_vanta?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}));
const menuToggle = document.getElementById("menuToggle");
if (menuToggle) menuToggle.addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => document.getElementById("nav").classList.remove("open")));
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
