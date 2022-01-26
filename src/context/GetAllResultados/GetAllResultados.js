import React, { useState } from "react";

import { AllResultFacil, AllResultMania, AllResultMega, AllResultQuina } from '../../services/index'

export const GetAllContext = React.createContext({});

function GetAllProvider({children}){

    const [resultados, setAllResultados] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // React.useEffect(() => {
    //     async function loadData() {
    //     Promise.all(AllResultMega(), AllResultFacil(), AllResultMania(), AllResultQuina())
    //   .then((response) => {setAllResultados(response); setLoading(true); console.log(response);})
    //   .catch((err) => console.error('Error provider ', err))
    //     }
    //     loadData()
    // }, [])

    

    return(
        <GetAllContext.Provider value={{ AllResultados: resultados }}>
            {children}
        </GetAllContext.Provider>
    )
}

export default GetAllProvider;