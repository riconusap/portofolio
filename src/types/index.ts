// Export all types
export * from './components'
export * from './portfolio'

// Global types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  accentColor: string;
}

// Animation types
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate';
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimationConfig {
  type: AnimationType;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  once?: boolean;
}