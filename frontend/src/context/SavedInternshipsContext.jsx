import { createContext, useContext, useState } from 'react'

const SavedInternshipsContext = createContext()

export function SavedInternshipsProvider({ children }) {
  const [savedInternships, setSavedInternships] = useState([])

  const toggleSaved = (internship) => {
    setSavedInternships((current) => {
      const alreadySaved = current.some(
        (item) => item.id === internship.id
      )

      if (alreadySaved) {
        return current.filter(
          (item) => item.id !== internship.id
        )
      }

      return [...current, internship]
    })
  }

  const isSaved = (id) => {
    return savedInternships.some(
      (item) => item.id === id
    )
  }

  return (
    <SavedInternshipsContext.Provider
      value={{
        savedInternships,
        toggleSaved,
        isSaved,
      }}
    >
      {children}
    </SavedInternshipsContext.Provider>
  )
}

export function useSavedInternships() {
  return useContext(SavedInternshipsContext)
}