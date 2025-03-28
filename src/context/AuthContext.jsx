import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    // supabase context sing up
    const signUp = async ( email, password ) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error("problem signing up:", error)
            return {succes: false, error}
        }

        return {success: true, data}
    }

    const signIn = async ( email, password ) => {        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error("error: ", error);
                return {succes: false, error: error.message};
            }

            // print session in console for checking purposes
            // console.log("sign in success", data);
            return {succes: true, data}
            
        } catch(e) {
            console.log("error: ", e)
        }
    }

    // run once based on dependency []
    // .then() is a promise
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((e, session) => {
            setSession(session)
        })
    }, []);

    // sing out
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) console.log("error: ", error);
    };


    return (
        <AuthContext.Provider value={{ session, signUp, signOut, signIn }}> 
            {children} 
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}