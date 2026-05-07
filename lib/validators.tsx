export const validators = {
  email: (value: string): { valid: boolean; error?: string } => {
    if (!value) return { valid: false, error: "Email is required" }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return { valid: false, error: "Please enter a valid email address" }
    }
    return { valid: true }
  },

  phone: (value: string): { valid: boolean; error?: string } => {
    if (!value) return { valid: false, error: "Phone number is required" }
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")
    // Check for valid length (10-15 digits)
    if (digits.length < 10 || digits.length > 15) {
      return { valid: false, error: "Please enter a valid phone number" }
    }
    return { valid: true }
  },

  emailOrPhone: (value: string): { valid: boolean; error?: string; type?: "email" | "phone" } => {
    if (!value) return { valid: false, error: "Email or phone is required" }

    // Check if it looks like a phone number (contains mostly digits)
    const digits = value.replace(/\D/g, "")
    if (digits.length >= 10) {
      const phoneResult = validators.phone(value)
      if (phoneResult.valid) return { ...phoneResult, type: "phone" }
    }

    // Otherwise treat as email
    const emailResult = validators.email(value)
    if (emailResult.valid) return { ...emailResult, type: "email" }

    return { valid: false, error: "Please enter a valid email or phone number" }
  },

  url: (value: string): { valid: boolean; error?: string } => {
    if (!value) return { valid: true } // URLs are optional
    try {
      const url = new URL(value)
      if (!["http:", "https:"].includes(url.protocol)) {
        return { valid: false, error: "URL must start with http:// or https://" }
      }
      return { valid: true }
    } catch {
      return { valid: false, error: "Please enter a valid URL" }
    }
  },

  businessName: (value: string): { valid: boolean; error?: string } => {
    if (!value || !value.trim()) {
      return { valid: false, error: "Business name is required" }
    }
    if (value.trim().length < 2) {
      return { valid: false, error: "Business name must be at least 2 characters" }
    }
    if (value.length > 100) {
      return { valid: false, error: "Business name must be less than 100 characters" }
    }
    return { valid: true }
  },

  customerName: (value: string): { valid: boolean; error?: string } => {
    if (!value || !value.trim()) {
      return { valid: false, error: "Name is required" }
    }
    if (value.trim().length < 2) {
      return { valid: false, error: "Name must be at least 2 characters" }
    }
    return { valid: true }
  },

  feedback: (value: string): { valid: boolean; error?: string } => {
    if (!value || !value.trim()) {
      return { valid: false, error: "Feedback is required" }
    }
    if (value.trim().length < 10) {
      return { valid: false, error: "Please provide at least 10 characters of feedback" }
    }
    if (value.length > 1000) {
      return { valid: false, error: "Feedback must be less than 1000 characters" }
    }
    return { valid: true }
  },
}

// Sanitization utilities
export const sanitize = {
  text: (value: string): string => {
    return value.trim().replace(/[<>]/g, "")
  },

  html: (value: string): string => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
  },

  phone: (value: string): string => {
    // Extract only digits and leading +
    return value.replace(/[^\d+]/g, "")
  },
}
