import React, { useEffect } from 'react'
import {jwtDecode} from 'jwt-decode'
import { useNavigate} from 'react-router-dom';

export default function Redirect() {
    const navigate = useNavigate();

    const redirect = () => {
        console.log('Redirecting');
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if(token){
            const decodedUser = jwtDecode(token);
            console.log(decodedUser);
            localStorage.setItem('user', JSON.stringify(decodedUser));
            
            navigate("/");
        }else{
            navigate("/login");
        }
    }
  return (
    <div>
        <button
            style={{
              padding: 20,
              alignItems: "center",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
            onClick={redirect}
          >
            <span>Redirect to your account</span>
          </button>
    </div>
  )
}
