import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    FaTasks,
    FaProjectDiagram,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

import API from "../services/api";

function Dashboard(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [tasks , setTasks] = useState([]);

    const [projects , setProjects] = useState([]);

    useEffect(()=>{

        fetchTasks();
        fetchProjects();

    },[]);

    const fetchTasks = async()=>{

        try{

            const response = await API.get("/tasks");

            setTasks(response.data);

        }
        catch(error){

            console.log(error);

        }

    };

    const fetchProjects = async()=>{

        try{

            const response = await API.get("/projects");

            setProjects(response.data);

        }
        catch(error){

            console.log(error);

        }

    };

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task)=>task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task)=>task.status !== "Completed"
    ).length;

    const logout = ()=>{

        localStorage.clear();

        window.location.href="/";

    };

    return(

        <div className="min-h-screen bg-[#020617] text-white">

            <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            TeamSync
                        </h1>

                        <p className="text-gray-400 mt-1">
                            Productivity Dashboard
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold"
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="max-w-7xl mx-auto px-8 py-10">

                <h2 className="text-3xl font-semibold">

                    Welcome back,
                    {" "}

                    <span className="text-cyan-400">
                        {user?.name}
                    </span>

                </h2>

                <div className="grid lg:grid-cols-4 gap-6 mt-10">

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-lg">

                        <FaProjectDiagram className="text-cyan-400 text-4xl" />

                        <h3 className="text-gray-400 mt-4">
                            Projects
                        </h3>

                        <p className="text-5xl font-bold mt-2">
                            {projects.length}
                        </p>

                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-lg">

                        <FaTasks className="text-blue-400 text-4xl" />

                        <h3 className="text-gray-400 mt-4">
                            Total Tasks
                        </h3>

                        <p className="text-5xl font-bold mt-2">
                            {totalTasks}
                        </p>

                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-lg">

                        <FaCheckCircle className="text-green-400 text-4xl" />

                        <h3 className="text-gray-400 mt-4">
                            Completed
                        </h3>

                        <p className="text-5xl font-bold mt-2">
                            {completedTasks}
                        </p>

                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-lg">

                        <FaClock className="text-yellow-400 text-4xl" />

                        <h3 className="text-gray-400 mt-4">
                            Pending
                        </h3>

                        <p className="text-5xl font-bold mt-2">
                            {pendingTasks}
                        </p>

                    </div>

                </div>

                <div className="flex gap-5 mt-12">

                    <Link
                        to="/projects"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition px-8 py-4 rounded-2xl font-bold"
                    >
                        Projects
                    </Link>

                    <Link
                        to="/tasks"
                        className="bg-gradient-to-r from-violet-500 to-purple-500 hover:scale-105 transition px-8 py-4 rounded-2xl font-bold"
                    >
                        Tasks
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;