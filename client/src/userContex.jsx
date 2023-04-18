import axios from "axios";
import {createContext, useEffect, useState} from "react";;

export const UserContex = createContext({});

function UserContextProvider ({children}) {
  const [user,setUser] = useState(null);
  const [ready, setReady] = useState(false)
  // use effect accepts a function to check if the user is empty then try fetching info
  useEffect( () =>
  {
    if(!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data)
        setReady(true)
      })
       
    }
  }, []);

  return (
    <UserContex.Provider value={{user,setUser}}>
      {children}
    </UserContex.Provider>
  );
}

export default UserContextProvider;