"use client"

import { createContext, useState } from "react"

type IThemeProvider = {
  mode: string;
  toggle: () => void;
};

export const ThemeContext = createContext<IThemeProvider>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState('dark')

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"))
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>
      {children}
      </div>
    </ThemeContext.Provider>
  )
}