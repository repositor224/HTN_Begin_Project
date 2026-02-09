// Handles communication with backend server (which is Node + SQLite)
/*
type ApiResponse = {
  success: boolean;
  error?: string;
};

export const loginUser = async (username: string, password: string): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      console.error("Login request failed:", res.status);
      return false;
    }

    const data: ApiResponse = await res.json();
    return data.success;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
};

export const registerUser = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      return { success: false, error: `HTTP ${res.status}` };
    }

    const data: ApiResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Registration error:", err);
    return { success: false, error: "Network error" };
  }
};*/


const USERS = [
  { username: "admin", password: "1234" },
  { username: "hacker", password: "htn2026" },
];

export const loginUser = async (username: string, password: string) => {
  return USERS.some(u => u.username === username && u.password === password);
};

export const registerUser = async (username: string, password: string) => {
  const exists = USERS.some(u => u.username === username);
  if (exists) {
    return { success: false, error: "User already exists" };
  }

  USERS.push({ username, password });
  return { success: true };
};


