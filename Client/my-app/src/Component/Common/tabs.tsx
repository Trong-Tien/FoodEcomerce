"use client"

import * as React from "react"

interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

/* ================= Tabs Context ================= */
const TabsContext = React.createContext<{
  value: string
  setValue: (val: string) => void
}>({ value: "", setValue: () => {} })

/* ================= Tabs Root ================= */
export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className }) => {
  const [activeValue, setActiveValue] = React.useState(value || "")

  const handleChange = (val: string) => {
    setActiveValue(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ value: activeValue, setValue: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

/* ================= TabsList ================= */
export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

/* ================= TabsTrigger ================= */
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
  const context = React.useContext(TabsContext)
  if (!context) return null

  const isActive = context.value === value
  return (
    <button
      onClick={() => context.setValue(value)}
      className={`${className} ${isActive ? "active" : ""}`}
    >
      {children}
    </button>
  )
}

/* ================= TabsContent ================= */
export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const context = React.useContext(TabsContext)
  if (!context) return null

  if (context.value !== value) return null

  return <div className={className}>{children}</div>
}
