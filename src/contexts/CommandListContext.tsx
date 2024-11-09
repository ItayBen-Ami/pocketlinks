import { noop } from 'lodash';
import { createContext, useContext, ReactNode, useState } from 'react';

const CommandListContext = createContext({ isModalOpen: false, openModal: noop, closeModal: noop });

export function CommandListProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <CommandListContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</CommandListContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCommandList() {
  return useContext(CommandListContext);
}
