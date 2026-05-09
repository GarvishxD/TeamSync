import { useEffect , useState } from "react";

import API from "../services/api";

function Admin(){

    const [tasks , setTasks] = useState([]);

    const [projects , setProjects] = useState([]);

    useEffect(()=>{

        fetchData();

    },[]);

    const fetchData = async()=>{

        try{

            const taskResponse = await API.get("/tasks");

            const projectResponse = await API.get("/projects");

            setTasks(taskResponse.data);

            setProjects(projectResponse.data);

        }
        catch(error){

            console.log(error);

        }

    };

    return(

        <div className="min-h-screen bg-[#f8fafc] p-10">

            <h1 className="text-5xl font-bold text-blue-600">
                Admin Panel
            </h1>

            <div className="grid lg:grid-cols-3 gap-6 mt-10">

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500">
                        Projects
                    </h2>

                    <p className="text-5xl font-bold mt-4">
                        {projects.length}
                    </p>

                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500">
                        Tasks
                    </h2>

                    <p className="text-5xl font-bold mt-4">
                        {tasks.length}
                    </p>

                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500">
                        Productivity
                    </h2>

                    <p className="text-5xl font-bold mt-4">

                        {
                            tasks.length === 0
                            ?
                            0
                            :
                            Math.floor(
                                (
                                    tasks.filter(
                                        (task)=>
                                        task.status === "Completed"
                                    ).length
                                    /
                                    tasks.length
                                ) * 100
                            )
                        }
                        %

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Admin;