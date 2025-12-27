// ================================
// Facebook App Configuration
// ================================
const appId = "1414793396876260";
const redirectUri = "http://localhost:5501/";
let currentToken = null;

// ================================
// Login with Facebook (OAuth 2.0)
// ================================
function loginWithFacebook() {
  const url = new URL("https://www.facebook.com/v24.0/dialog/oauth");
  url.searchParams.append("client_id", appId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("scope", "public_profile,email,user_friends,user_location");
  url.searchParams.append("response_type", "token");
  window.location.href = url.toString();
}

// ================================
// Get Access Token
// ================================
function getAccessToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

// ================================
// Fetch Facebook Profile
// ================================
async function fetchProfile(token) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,gender,birthday,location,friends,picture.width(200).height(200)&access_token=${token}`
    );
    if (!response.ok) throw new Error("Failed to fetch profile");
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
}

// ================================
// UI Helpers
// ================================
function showProfile() {
  hideAll();
  document.getElementById("profile").style.display = "flex";
}

function showLoading() {
  hideAll();
  document.getElementById("loading").style.display = "block";
}

function showError(message) {
  hideAll();
  document.getElementById("error-message").innerText = message;
  document.getElementById("error").style.display = "block";
}

function hideError() {
  document.getElementById("error").style.display = "none";
}

function hideAll() {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").style.display = "none";
}

// ================================
// Back Button
// ================================
function goBack() {
  window.location.href = redirectUri;
}

// ================================
// Dark Mode Toggle
// ================================
function toggleDarkMode() {
  // Toggle dark class on body
  document.body.classList.toggle("dark");

  // Select the toggle button
  const btn = document.querySelector(".dark-toggle");

  // Change icon and tooltip depending on mode
  if (document.body.classList.contains("dark")) {
    btn.title = "Light Mode"; // Tooltip shows current action
    btn.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
  } else {
    btn.title = "Dark Mode";
    btn.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
  }
}

// ================================
// On Page Load
// ================================
window.onload = async () => {
  const token = getAccessToken();

  if (!token) {
    document.getElementById("login-box").style.display = "block";
    return;
  }

  currentToken = token;
  showLoading();

  const profile = await fetchProfile(token);
  if (!profile || profile.error) {
    showError("Unable to retrieve Facebook profile.");
    return;
  }

  document.getElementById("profile-picture").src = profile.picture.data.url;
  document.getElementById("profile-name").innerText = profile.name;
  document.getElementById("profile-email").innerText = profile.email || "Not provided";
  document.getElementById("profile-id").innerText = profile.id;
  document.getElementById("profile-gender").innerText = profile.gender || "Not provided";
  document.getElementById("profile-birthday").innerText = profile.birthday || "Not provided";
  document.getElementById("profile-location").innerText = profile.location ? profile.location.name : "Not provided";
  document.getElementById("profile-friends").innerText =
    profile.friends ? profile.friends.summary.total_count : "0";

  showProfile();
};
