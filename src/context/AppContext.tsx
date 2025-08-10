import React, { createContext, useState, ReactNode, useContext } from 'react';

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  refreshList: boolean;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: (value : string) => void;
  buttonSecondaryColor : boolean,
  setButtonSecondaryColor : (value: boolean) => void;
};

const AppContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [refreshList, setRefreshList] = useState(false);
  const [userName, setUsername] = useState('')
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState(false)

  return (
    <AppContext.Provider value={{ 
      search, 
      setSearch, 
      refreshList, 
      setRefreshList, 
      userName, 
      setUsername, 
      buttonSecondaryColor,
      setButtonSecondaryColor }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp  = () => useContext(AppContext);


 