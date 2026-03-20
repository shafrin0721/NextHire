/**
 * Auth helpers for NextHire: session management and API communication.
 * Used for login, logout, and protected routes.
 */

const AUTH_KEY = "nexthire_auth";
const USER_KEY = "nexthire_user";
const API_BASE = "/api";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "candidate" | "admin" | "hr";
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

/** Clear all auth-related data from localStorage and sessionStorage */
export function clearAuthSession(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.clear();
  } catch {
    // ignore
  }
}

/** Persist user data after successful login */
export function setAuthSession(user: User): void {
  try {
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

/** Get the currently logged in user */
export function getCurrentUser(): User | null {
  try {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      return JSON.parse(userData) as User;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Login user via backend API
 * Validates credentials against the database
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds

  try {
    // Try the main API endpoint first
    let endpoint = `${API_BASE}/login.php`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Important for session cookies
      signal: controller.signal,
    });

    let data: any = null;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        success: false,
        message: "Server returned an invalid response. Check that Apache is running.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Login failed (HTTP ${response.status})`,
      };
    }

    if (data.success && data.user) {
      // Store user data in localStorage
      setAuthSession(data.user);
      return {
        success: true,
        message: data.message || "Login successful",
        user: data.user,
      };
    }

    return {
      success: false,
      message: data.message || "Login failed",
    };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        message: "Login timed out. Make sure Apache and MySQL are running.",
      };
    }

    return {
      success: false,
      message: `Can't reach API. Start Apache/MySQL in XAMPP: http://127.0.0.1:8081/NextHire/api/login.php`,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Return true if the user is considered logged in */
export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1" && !!localStorage.getItem(USER_KEY);
  } catch {
    return false;
  }
}
