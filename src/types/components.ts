// Common component props interfaces
export interface BaseComponentProps {
  id?: string;
  class?: string;
  style?: string;
}

// Button component types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  href?: string;
  to?: string;
}

// Input component types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export interface InputProps extends BaseComponentProps {
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  modelValue?: string | number;
}

// Card component types
export type CardVariant = 'default' | 'elevated' | 'outline';

export interface CardProps extends BaseComponentProps {
  variant?: CardVariant;
  padding?: boolean;
  hoverable?: boolean;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[];
  activeItem?: string;
  vertical?: boolean;
}