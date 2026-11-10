//TAPVANTA authentication: phone number is mapped to a syntactically valid
// synthetic email because Supabase password auth currently uses email/password.
const SUPABASE_URL = "https://jktwvnhztegwbbmuhicc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Zx8znUpDQF3DLXtIb_lTKw_Pyc5W5ds";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const $ = id => document.getElementById(id);
let mode = "login";

function setMode(next) {
  mode = next;
  $("loginTab").classList.toggle("active", mode === "login");
  $("signupTab").classList.toggle("active", mode === "signup");
  $("nameWrap").classList.toggle("hidden", mode !== "signup");
  $("confirmWrap").classList.toggle("hidden", mode !== "signup");
  $("submitBtn").textContent = mode === "login" ? "LOGIN" : "CREATE ACCOUNT";
  $("password").autocomplete = mode === "login" ? "current-password" : "new-password";
  $("message").textContent = "";
}
$("loginTab").addEventListener("click", () => setMode("login"));
$("signupTab").addEventListener("click", () => setMode("signup"));

function normalizedPhone(value) { return value.replace(/\D/g, "").slice(-10); }
// Use a normal-looking domain: the previous reserved .invalid suffix was rejected.
function authEmail(phone) { return phone + "@users.tapvanta.com"; }

$("authForm").addEventListener("submit", async event => {
  event.preventDefault();
  const phone = normalizedPhone($("mobile").value);
  const password = $("password").value;
  const msg = $("message");
  const submit = $("submitBtn");

  if (!/^[6-9]\d{9}$/.test(phone)) {
    msg.textContent = "Valid 10-digit Indian mobile number enter karo.";
    return;
  }
  if (password.length < 6) {
    msg.textContent = "Password kam se kam 6 characters ka hona chahiye.";
    return;
  }

  submit.disabled = true;
  submit.textContent = "PLEASE WAIT...";
  try {
    if (mode === "signup") {
      const name = $("fullName").value.trim();
      if (!name) throw new Error("Apna full name enter karo.");
      if ($("confirmPassword").value !== password) {
        throw new Error("Dono passwords match nahi kar rahe.");
      }
      const { data, error } = await sb.auth.signUp({
        email: authEmail(phone),
        password,
        options: { data: { full_name: name, phone_number: phone } }
      });
      if (error) throw error;
      if (!data.session) {
        const { error: loginError } = await sb.auth.signInWithPassword({
          email: authEmail(phone), password
        });
        if (loginError) {
          throw new Error("Account create ho gaya. Ab Login tab se sign in karo.");
        }
      }
    } else {
      const { error } = await sb.auth.signInWithPassword({
        email: authEmail(phone), password
      });
      if (error) throw new Error("Mobile number ya password galat hai.");
    }
    msg.textContent = "Login successful! Website khul rahi hai...";
    window.location.replace("index.html");
  } catch (error) {
    msg.textContent = error.message || "Kuch problem hui. Dobara try karo.";
  } finally {
    submit.disabled = false;
    submit.textContent = mode === "login" ? "LOGIN" : "CREATE ACCOUNT";
  }
});

(async () => {
  const { data } = await sb.auth.getSession();
  if (data.session) window.location.replace("index.html");
})();
