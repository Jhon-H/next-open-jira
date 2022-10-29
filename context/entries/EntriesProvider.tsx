import { ReactNode, useEffect, useReducer } from "react"
import { v4 as uuidv4 } from 'uuid'
import { entriesApi } from "../../apis";

import { Entry } from "../../interfaces";
import { EntriesContext,  entriesReducer } from "./"

export interface EntriesState {
  entries: Entry[];

}
const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [ ]
}

export const EntriesProvider = ({ children }: { children: ReactNode}) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', {
      description
    })

    dispatch({ type: '[Entry] Add-Entry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      })

      dispatch({ type: '[Entry] update-Entry', payload: data })
    } catch(error) {
      console.log({ error })
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] Refresh-data', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
