// API for users and events
const BASE_URL = "http://localhost:3000";

// USERS API

// Login user by username and password
export async function loginUserApi(username, password) {
  const res = await fetch(`${BASE_URL}/users?username=${username}&password=${password}`);
  return await res.json();
}

// Register new user
export async function registerUserApi(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
}

// Get user by ID
export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  return await res.json();
}

// Update user by ID
export async function updateUser(id, updatedUser) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  return await res.json();
}

// Delete user by ID
export async function deleteUser(id) {
  await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
}

// EVENTS API

// Get all events
export async function getevents() {
  const res = await fetch(`${BASE_URL}/events`);
  return await res.json();
}

// Create new event
export async function createevent(event) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return await res.json();
}

// Update event by ID
export async function updateevent(id, updatedevent) {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedevent),
  });
  return await res.json();
}

// Delete event by ID
export async function deleteevent(id) {
  await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
  });
}
