export const SESSION_KEY = "ticketapp_session";

export function signupUser({ username, email, password }) {
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

  if (users.some(u => u.email === email)) {
    throw new Error("Email already registered.");
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("ticketapp_users", JSON.stringify(users));

  // Auto-login
  localStorage.setItem(SESSION_KEY, JSON.stringify({ username, email }));
  return newUser;
}

export function loginUser({ identifier, password }) {
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  const user = users.find(
    u => (u.email === identifier || u.username === identifier) && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials. Please check your username or password.");
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({ username: user.username, email: user.email }));
  return user;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

export function isAuthenticated() {
  return !!getSession();
}
