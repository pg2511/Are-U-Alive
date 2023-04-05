import React, { useContext, useState } from "react"

const BASE_URL = "http://localhost:5000/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [websites, setWebsites] = useState([]);
    const [loadingWebsites, setLoadingWebsites] = useState(true);
    const [inputUrl, setInputUrl] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [deletingWebsite, setDeletingWebsite] = useState("");

    const addWebsite = async (inputUrl) => {

        if (!inputUrl.trim() || submitButtonDisabled) return;
        
        setErrorMsg("");

        const rawToken = localStorage.getItem("tokens");
        const tokens = JSON.parse(rawToken);
        const accessToken = tokens.accessToken.token;
    
        setSubmitButtonDisabled(true);
        const res = await fetch(`${BASE_URL}website`, {
          method: "POST",
          headers: {
            Authorization: accessToken,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            url: inputUrl,
          }),
        }).catch((err) => void err);
        setSubmitButtonDisabled(false);
    
        if (!res) {
          setErrorMsg("Error creating website");
          return;
        }
        const data = await res.json();
    
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
    
        // console.log(data);
        setInputUrl("");
        fetchAllWebsites();
    };

    // fetch all websites 
    const fetchAllWebsites = async () => {
        const rawToken = localStorage.getItem("tokens");
        const tokens = JSON.parse(rawToken);
        const accessToken = tokens.accessToken.token;
    
        const res = await fetch("http://localhost:5000/website", {
          headers: {
            Authorization: accessToken,
          },
        }).catch((err) => void err);
        setLoadingWebsites(false);
        if (!res) {
          return;
        }
    
        const data = await res.json();
        // console.log(data);
    
        setWebsites(data.data);
    };

    const deleteWebsite = async (id) => {
        if (deletingWebsite) return;
    
        const rawToken = localStorage.getItem("tokens");
        const tokens = JSON.parse(rawToken);
        const accessToken = tokens.accessToken.token;
    
        setDeletingWebsite(id);
        const res = await fetch(`http://localhost:5000/website/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: accessToken,
          },
        }).catch((err) => void err);
        setDeletingWebsite("");
    
        if (!res) return;
        fetchAllWebsites();
    };
    

    const totalWebsite = () => {
        return websites.length;
    }


    return (
        <GlobalContext.Provider value={{
            addWebsite,
            deleteWebsite,
            fetchAllWebsites,
            totalWebsite,
            websites,
            errorMsg, 
            setErrorMsg,
            submitButtonDisabled,
            setSubmitButtonDisabled
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}