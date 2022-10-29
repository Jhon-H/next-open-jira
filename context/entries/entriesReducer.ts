import { Entry } from '../../interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesAction =
  | { type: '[Entry] Add-Entry', payload: Entry }
  | { type: '[Entry] update-Entry', payload: Entry }
  | { type: '[Entry] Refresh-data', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesAction): EntriesState => {
  switch (action.type) {
    case '[Entry] Add-Entry':
      return {
        ...state,
        entries: [ ...state.entries, action.payload ]
      }

    case '[Entry] update-Entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        })
      }

    case '[Entry] Refresh-data':
      return {
        ...state,
        entries: [...action.payload]
      }

    default:
      return state
  }
}
