/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import { defaultPreferences } from '../data/mockData'

const SafetyPreferencesContext = createContext(null)

export function SafetyPreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultPreferences)

  const value = useMemo(
    () => ({
      preferences,
      setPreferences,
    }),
    [preferences],
  )

  return (
    <SafetyPreferencesContext.Provider value={value}>
      {children}
    </SafetyPreferencesContext.Provider>
  )
}

export function useSafetyPreferences() {
  const context = useContext(SafetyPreferencesContext)
  if (!context) {
    throw new Error(
      'useSafetyPreferences must be used inside SafetyPreferencesProvider',
    )
  }

  return context
}
