import React, { createContext, useState, ReactNode, useContext } from 'react';

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  refreshList: boolean;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: (value : string) => void;
};

const AppContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [refreshList, setRefreshList] = useState(false);
  const [userName, setUsername] = useState('')


  return (
    <AppContext.Provider value={{ search, setSearch, refreshList, setRefreshList, userName, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp  = () => useContext(AppContext);


 