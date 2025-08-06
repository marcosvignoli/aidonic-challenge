// API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Distribution Types
export interface Distribution {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  recipientId: string;
  recipient: User;
  createdAt: string;
  updatedAt: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

// Theme Types
export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
