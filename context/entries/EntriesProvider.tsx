import { ReactNode, useEffect, useReducer } from "react"
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', {
      description
    })

    dispatch({ type: '[Entry] Add-Entry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      })

      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

      dispatch({ type: '[Entry] update-Entry', payload: data })
    } catch(error) {
      console.log({ error })
    }
  }

  const deleteEntry = async (_id: string, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.delete<{ id: string, message: string }>(`/entries/${_id}`)

      if (showSnackbar) {
        enqueueSnackbar('Entrada eliminada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

      dispatch({ type: '[Entry] delete-data', payload: data.id })
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
      updateEntry,
      deleteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
