import { createContext } from "react";
import { Entry } from "../../interfaces";

export interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
  deleteEntry: (id: string, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext<ContextProps>({} as ContextProps);
