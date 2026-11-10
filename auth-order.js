// Adds the logged-in customer's name and mobile number to the Instagram order DM.
// Loaded before nfc-cards.js; captures the order click and replaces its older handler.
document.addEventListener("click", async event => {
  const button = event.target.closest("[data-order]");
  if (!button) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const auth = window.tapvantaAuth;
  if (!auth) { alert("Login system load nahi hua. Page refresh karke try karein."); return; }
  button.disabled = true;
  const oldText = button.textContent;
  button.textContent = "Preparing order...";
  try {
    const { data, error } = await auth.auth.getUser();
    if (error || !data.user) { location.replace("auth.html"); return; }
    const user = data.user;
    const meta = user.user_metadata || {};
    const name = meta.full_name || "Customer";
    const phone = meta.phone_number || "";
    const category = new URLSearchParams(location.search).get("category") || "Google Review Card";
    const type = button.dataset.order;
    const quantity = Number(document.getElementById("qty" + type).value);
    const rates = {
      Normal: {1:399,5:379,10:349,25:329,50:299,100:279},
      Premium: {1:599,5:569,10:549,25:499,50:449,100:399},
      Customized: {1:699,5:669,10:649,25:599,50:549,100:499}
    };
    const price = rates[type][quantity];
    const money = n => "₹" + n.toLocaleString("en-IN");
    const message = [
      "Hi TAPVANTA! I want to order NFC cards.",
      "Customer name: " + name,
      "Mobile number: +91 " + phone,
      "Category: " + category,
      "Card type: " + type,
      "Quantity: " + quantity,
      "Price per card: " + money(price),
      "Total amount: " + money(quantity * price),
      "Please confirm availability, delivery charges and payment details."
    ].join("\n");
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(message); copied = true; } catch (_) {}
    }
    if (!copied) {
      const field = document.createElement("textarea");
      field.value = message; field.setAttribute("readonly", "");
      field.style.position = "fixed"; field.style.top = "0"; field.style.left = "-9999px";
      document.body.appendChild(field); field.focus(); field.select(); field.setSelectionRange(0, field.value.length);
      try { copied = document.execCommand("copy"); } catch (_) {}
      field.remove();
    }
    if (!copied) throw new Error("Order details copy nahi ho paye. Chrome mein website kholkar try karein.");
    alert("Order details copied! Instagram DM khulega. Paste karke Send dabayein.");
    location.href = "https://ig.me/m/tap_vanta";
  } catch (err) {
    alert(err.message || "Order place karne mein problem hui.");
  } finally {
    button.disabled = false;
    button.textContent = oldText;
  }
}, true);
