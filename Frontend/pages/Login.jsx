import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [signState, setSignState] = useState("Sign In")

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 FUNCTION ADDED
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (signState === "Sign Up") {
        await axios.post("http://localhost:5000/api/auth/signup", {
          name,
          email,
          password,
        });

        alert("Signup successful ✅");

        setName("");
        setEmail("");
        setPassword("");

        setSignState("Sign In");

        navigate("/login");

      } else {
        await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        alert("Login successful ✅");

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />

      <div className="login-form">
        <h1>{signState}</h1>

        {/* ✅ ONLY CHANGE: added onSubmit */}
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" ?
            <input
              type="text"
              placeholder='Your Name'
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
            : <></>
          }

          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <button type='submit'>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ?
            <p>
              New to Netflix?
              <span onClick={() => { setSignState("Sign Up") }}>
                Sign Up Now
              </span>
            </p>
            :
            <p>
              Already have an Account?
              <span onClick={() => { setSignState("Sign In") }}>
                Sign in Now
              </span>
            </p>
          }
        </div>

      </div>
    </div>
  )
}

export default Login