import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { allowedProviders } from '../constants/emailProviders';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");  
  const [passwordError, setPasswordError] = useState('');

  const validCredentials = email && password;
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const checkPassword = (pass) => {
    // 8 min, 64 max, 1 uppercase, 1 number, 1 special
    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?]).{8,64}$/;
    
    if (!passRegex.test(pass)) {
      return "Password requirements: 8 minimum, 64 max, 1 uppercase, 1 number, 1 special. Please follow these requirements.";
    }

    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    const domain = email.split('@')[1];
    if (!allowedProviders.includes(domain)) {
      return `Email provider "${domain}" is not allowed. Please use one of: ${allowedProviders.join(
        ', '
      )}.`;
    }

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailValidationResult = validateEmail(email);
    setEmailError(emailValidationResult);

    const passwordValidationResult = checkPassword(password);
    setPasswordError(passwordValidationResult);

    if (!emailValidationResult && !passwordValidationResult && validCredentials) {
        // console.log("clicked on register");

        try {
            const result = await signUp(email, password);
            // console.log(result);
            
            if (result.success) navigate("/loginpage");
            if (result.error) alert(result.error);

        } catch (e) {
            console.log("error: ", e);
        } 
    }
  }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-10">Email confirmation will be sent after registering. Please confirm your email to login.</h1>

            <div>
                <form onSubmit={handleRegister} className="mb-4 space-y-4 w-60 flex flex-col justify-center text-center">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-1"
                  />
                  
                  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded p-1"
                  />

                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

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
