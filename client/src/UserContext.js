import React,{ useState, createContext } from 'react';

export const UserContext  = createContext();

export const UserProvider = props => {
  const [facebookUserDetails,setFacebookUserDetails] = useState({
     isLoggedIn:false,
     name:"",
     id:"",
     email:"",
     fbProfilePic:"",
     likedSublets:[]

  })

  return (
    <UserContext.Provider value = {[facebookUserDetails,setFacebookUserDetails]} >
      {props.children}
    </UserContext.Provider>
  )
}

