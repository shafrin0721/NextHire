/**
 * Auth helpers for NextHire: session clear, persist, and check.
 * Used for logout and protected routes.
 */

const AUTH_KEY = "nexthire_auth";
const TOKEN_KEY = "nexthire_token";

// Simple static admin credentials for prototype / frontend-only auth.
// In a real app these would be validated on the backend.
const ADMIN_EMAIL = "admin@nexthire.com";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_TOKEN = "nexthire_admin_token";

/** Clear all auth-related data from localStorage, sessionStorage, and cookies */
export function clearAuthSession(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    // Clear any other common auth keys
    const authKeys = ["token", "user", "auth", "accessToken", "refreshToken"];
    authKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    sessionStorage.clear();
    // Clear cookies (all that could be auth-related)
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  } catch {
    // ignore
  }
}

/** Mark non-admin user as logged in (call after successful non-admin login) */
export function setAuthSession(): void {
  try {
    localStorage.setItem(AUTH_KEY, "1");
  } catch {
    // ignore
  }
}

/**
 * Validate admin credentials and persist an auth token when successful.
 * Returns true when the provided email/password match the admin account.
 */
export function loginAdmin(
  email: string,
  password: string,
): { success: true } | { success: false; message: string } {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedAdminEmail = ADMIN_EMAIL.toLowerCase();

    if (normalizedEmail === normalizedAdminEmail && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      localStorage.setItem(TOKEN_KEY, ADMIN_TOKEN);
      return { success: true };
    }

    return { success: false, message: "Invalid email or password" };
  } catch {
    return { success: false, message: "Invalid email or password" };
  }
}

/** Return true if the user is considered logged in */
export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1" || !!localStorage.getItem(TOKEN_KEY);
  } catch {
    return false;
  }
}
