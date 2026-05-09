import { useEffect , useState } from "react";

import toast from "react-hot-toast";

import {
    FaTrash,
    FaFolderOpen
} from "react-icons/fa";

import API from "../services/api";

function Projects(){

    const [projects , setProjects] = useState([]);

    const [search , setSearch] = useState("");

    const [formData , setFormData] = useState({

        title:"",
        description:""

    });

    useEffect(()=>{

        fetchProjects();

    },[]);

    const fetchProjects = async()=>{

        try{

            const response = await API.get("/projects");

            setProjects(response.data);

        }
        catch(error){

            console.log(error);

        }

    };

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            await API.post(
                "/projects",
                formData
            );

            toast.success("Project Created");

            setFormData({

                title:"",
                description:""

            });

            fetchProjects();

        }
        catch(error){

            toast.error(
                error.response.data.message
            );

        }

    };

    const deleteProject = async(id)=>{

        try{

            await API.delete(
                `/projects/${id}`
            );

            toast.success("Project Deleted");

            fetchProjects();

        }
        catch(error){

            toast.error("Delete Failed");

        }

    };

    const filteredProjects = projects.filter((project)=>

        (project?.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    return(

        <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#fdf4ff] to-[#ecfeff]">

            <div className="max-w-7xl mx-auto p-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-6xl font-black text-slate-800">
                            Projects
                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">
                            Create and organize projects beautifully
                        </p>

                    </div>

                </div>

                <div className="grid lg:grid-cols-3 gap-8 mt-12">

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/70 backdrop-blur-xl p-8 rounded-[35px] shadow-2xl border border-white/50 h-fit"
                    >

                        <h2 className="text-3xl font-bold text-slate-700 mb-8">
                            Create Project
                        </h2>

                        <div className="space-y-5">

                            <input
                                type="text"
                                name="title"
                                placeholder="Project Title"
                                value={formData.title}
                                className="w-full bg-white border border-gray-200 p-5 rounded-2xl outline-none focus:border-violet-500"
                                onChange={handleChange}
                            />

                            <textarea
                                name="description"
                                placeholder="Project Description"
                                value={formData.description}
                                className="w-full bg-white border border-gray-200 p-5 rounded-2xl outline-none h-40 focus:border-violet-500"
                                onChange={handleChange}
                            />

                            <button
                                className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-[1.02] transition py-5 rounded-2xl font-bold text-white shadow-xl text-lg"
                            >
                                Create Project
                            </button>

                        </div>

                    </form>

                    <div className="lg:col-span-2">

                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-5">

                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="outline-none w-full bg-transparent text-lg"
                                onChange={(e)=>setSearch(e.target.value)}
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">

                            {
                                filteredProjects.map((project)=>(

                                    <div
                                        key={project._id}
                                        className="bg-white/70 backdrop-blur-xl p-8 rounded-[35px] shadow-xl hover:-translate-y-2 transition border border-white/50"
                                    >

                                        <div className="flex justify-between items-start">

                                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl">

                                                <FaFolderOpen />

                                            </div>

                                            <button
                                                onClick={()=>
                                                    deleteProject(
                                                        project._id
                                                    )
                                                }
                                                className="bg-red-100 hover:bg-red-200 transition p-3 rounded-2xl text-red-500"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                        <h2 className="text-3xl font-bold mt-7 text-slate-800">

                                            {
                                                project?.title || "Untitled"
                                            }

                                        </h2>

                                        <p className="text-gray-500 mt-5 leading-8">

                                            {
                                                project?.description || "No Description"
                                            }

                                        </p>

                                        <div className="mt-7">

                                            <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">
                                                Active Project
                                            </span>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Projects;