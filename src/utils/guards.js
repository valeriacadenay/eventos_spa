import { isAuthenticated, getCurrentUser } from './auth.js';

// Guard: Only allow access if user is authenticated
export function authGuard() {
  if (!isAuthenticated()) {
    history.replaceState({}, "", "/not-found");
    location.reload();
  }
}

// Guard: Only allow access if user is admin
export function adminGuard() {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    history.replaceState({}, "", "/not-found");
    location.reload();
  }
}

// Guard: Only allow access if user is student
export function UserGuard() {
  const user = getCurrentUser();
  if (!user || user.role !== "user") {
    history.replaceState({}, "", "/not-found");
    location.reload();
  }
}
