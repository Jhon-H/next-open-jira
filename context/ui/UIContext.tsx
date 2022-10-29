import { createContext } from "react";

export interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;


  // methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAddingEntry: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext<ContextProps>({} as ContextProps);
