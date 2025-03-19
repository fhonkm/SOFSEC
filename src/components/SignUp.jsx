import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = UserAuth();
  // console.log(session);
  const navigate = useNavigate();

  const validCredentials = email && password;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validCredentials) {
        console.log("clicked on register");

        try {
            const result = await signUp(email, password);
            console.log(result);
            
            if (result.success) navigate("/loginpage");
            if (result.error) alert(result.error);

        } catch (e) {
            console.log("error: ", e);
        } 
    }
  }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <form onSubmit={handleRegister} className="mb-4 space-y-4 w-60 flex flex-col justify-center text-center">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-1"
                  />

                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded p-1"
                  />
                    <div className="flex flex-col space-y-2"> 
                        <button type="submit" className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${validCredentials ? "" : "cursor-not-allowed opacity-50"}`}>
                        Register
                        </button>
                        <Link to="/" className="bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded">Have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
