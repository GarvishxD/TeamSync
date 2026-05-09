import { useState } from "react";

import { Link , useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function Login(){

    const navigate = useNavigate();

    const [formData , setFormData] = useState({

        email:"",
        password:""

    });

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success("Login Successful");

            navigate("/dashboard");

        }
        catch(error){

            toast.error(
                error.response.data.message
            );

        }

    };

    return(

        <div className="min-h-screen bg-[#020617] flex justify-center items-center px-5">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
            >

                <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    TeamSync
                </h1>

                <p className="text-center text-gray-400 mt-3">
                    Welcome back
                </p>

                <div className="space-y-5 mt-10">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-[#0f172a] border border-gray-700 p-4 rounded-2xl outline-none"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full bg-[#0f172a] border border-gray-700 p-4 rounded-2xl outline-none"
                        onChange={handleChange}
                    />

                    <button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition py-4 rounded-2xl font-bold text-lg"
                    >
                        Login
                    </button>

                </div>

                <p className="text-center text-gray-400 mt-8">

                    Don't have an account?

                    <Link
                        to="/signup"
                        className="text-cyan-400 ml-2"
                    >
                        Signup
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;