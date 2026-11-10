// Include this after Supabase JS on index.html and nfc-cards.html.
const TAPVANTA_SUPABASE_URL = "https://jktwvnhztegwbbmuhicc.supabase.co";
const TAPVANTA_SUPABASE_KEY = "sb_publishable_Zx8znUpDQF3DLXtIb_lTKw_Pyc5W5ds";
window.tapvantaAuth = window.supabase.createClient(TAPVANTA_SUPABASE_URL, TAPVANTA_SUPABASE_KEY);
(async () => {
  const { data, error } = await window.tapvantaAuth.auth.getSession();
  if (error || !data.session) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    location.replace("auth.html?next=" + next);
    return;
  }
  window.tapvantaUser = data.session.user;
})();
