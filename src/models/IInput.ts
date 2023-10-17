import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  theme?: "light" | "dark";
  renderAddon?: ReactNode;
}
