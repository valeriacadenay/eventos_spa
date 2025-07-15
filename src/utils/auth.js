// User authentication helpers
export function loginUser(user) {
  // Save user to localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
  // Get user from localStorage
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function isAuthenticated() {
  // Check if user is logged in
  return !!localStorage.getItem("currentUser");
}

export function logoutUser() {
  // Remove user and redirect to home
  localStorage.removeItem("currentUser");
  history.pushState({}, "", "/");
  location.reload();
}

