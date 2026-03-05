/**
 * Shared form validation for NextHire recruitment app.
 * Error messages match product requirements.
 */

export const VALIDATION_MESSAGES = {
  required: "This field is required.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid phone number.",
  password:
    "Password must contain at least 6 characters, one uppercase letter, and one number.",
  startDatePast: "Start date cannot be in the past.",
  endDateBeforeStart: "End date cannot be earlier than the start date.",
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_ONLY = /^\d+$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_HAS_UPPERCASE = /[A-Z]/;
const PASSWORD_HAS_NUMBER = /\d/;

/** Returns today's date in YYYY-MM-DD for use as min on date inputs */
export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function validateRequired(value: string | undefined | null): string | null {
  const v = typeof value === "string" ? value.trim() : value;
  if (v === undefined || v === null || v === "") return VALIDATION_MESSAGES.required;
  return null;
}

export function validateEmail(value: string | undefined | null): string | null {
  const required = validateRequired(value);
  if (required) return required;
  const v = (value as string).trim();
  if (!EMAIL_REGEX.test(v)) return VALIDATION_MESSAGES.email;
  return null;
}

export function validatePhone(value: string | undefined | null): string | null {
  const required = validateRequired(value);
  if (required) return required;
  const digits = (value as string).replace(/\D/g, "");
  if (!PHONE_DIGITS_ONLY.test(digits) || digits.length < 10)
    return VALIDATION_MESSAGES.phone;
  return null;
}

export function validatePassword(value: string | undefined | null): string | null {
  const required = validateRequired(value);
  if (required) return required;
  const v = value as string;
  if (v.length < PASSWORD_MIN_LENGTH) return VALIDATION_MESSAGES.password;
  if (!PASSWORD_HAS_UPPERCASE.test(v)) return VALIDATION_MESSAGES.password;
  if (!PASSWORD_HAS_NUMBER.test(v)) return VALIDATION_MESSAGES.password;
  return null;
}

/** Start date must not be before today (date string YYYY-MM-DD) */
export function validateStartDate(dateStr: string | undefined | null): string | null {
  const required = validateRequired(dateStr);
  if (required) return required;
  const today = getTodayDateString();
  if ((dateStr as string) < today) return VALIDATION_MESSAGES.startDatePast;
  return null;
}

/** End date must not be before start date (both YYYY-MM-DD) */
export function validateEndDate(
  endStr: string | undefined | null,
  startStr: string | undefined | null
): string | null {
  const required = validateRequired(endStr);
  if (required) return required;
  if (!startStr) return null;
  if ((endStr as string) < startStr) return VALIDATION_MESSAGES.endDateBeforeStart;
  return null;
}
