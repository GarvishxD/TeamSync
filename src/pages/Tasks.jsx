import { useEffect , useState } from "react";

import toast from "react-hot-toast";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
    FaTrash
} from "react-icons/fa";

import API from "../services/api";

function Tasks(){

    const [tasks , setTasks] = useState([]);

    const [search , setSearch] = useState("");

    const [selectedDate , setSelectedDate] = useState(null);

    const [formData , setFormData] = useState({

        title:"",
        description:"",
        status:"Todo"

    });

    useEffect(()=>{

        fetchTasks();

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

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            await API.post("/tasks",{

                ...formData,

                dueDate:selectedDate

            });

            toast.success("Task Created");

            setFormData({

                title:"",
                description:"",
                status:"Todo"

            });

            setSelectedDate(null);

            fetchTasks();

        }
        catch(error){

            toast.error(
                error.response.data.message
            );

        }

    };

    const updateStatus = async(id , status)=>{

        try{

            await API.put(
                `/tasks/${id}`,
                { status }
            );

            toast.success("Task Updated");

            fetchTasks();

        }
        catch(error){

            console.log(error);

        }

    };

    const deleteTask = async(id)=>{

        try{

            await API.delete(
                `/tasks/${id}`
            );

            toast.success("Task Deleted");

            fetchTasks();

        }
        catch(error){

            console.log(error);

        }

    };

    const filteredTasks = tasks.filter((task)=>

        (task?.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    return(

        <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]">

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-6xl font-black text-slate-800">
                    Tasks
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Manage your workflow beautifully
                </p>

                <div className="grid lg:grid-cols-3 gap-8 mt-12">

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/70 backdrop-blur-xl p-8 rounded-[35px] shadow-2xl border border-white/50 h-fit"
                    >

                        <h2 className="text-3xl font-bold text-slate-700 mb-8">
                            Create Task
                        </h2>

                        <div className="space-y-5">

                            <input
                                type="text"
                                name="title"
                                placeholder="Task Title"
                                value={formData.title}
                                className="w-full bg-white border border-gray-200 p-5 rounded-2xl outline-none"
                                onChange={handleChange}
                            />

                            <textarea
                                name="description"
                                placeholder="Task Description"
                                value={formData.description}
                                className="w-full bg-white border border-gray-200 p-5 rounded-2xl outline-none h-40"
                                onChange={handleChange}
                            />

                            <DatePicker
                                selected={selectedDate}
                                onChange={(date)=>
                                    setSelectedDate(date)
                                }
                                placeholderText="Select Due Date"
                                className="w-full border border-gray-200 p-5 rounded-2xl outline-none"
                            />

                            <select
                                name="status"
                                value={formData.status}
                                className="w-full border border-gray-200 p-5 rounded-2xl outline-none"
                                onChange={handleChange}
                            >

                                <option value="Todo">
                                    Todo
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                            </select>

                            <button
                                className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-[1.02] transition py-5 rounded-2xl font-bold text-white shadow-xl text-lg"
                            >
                                Create Task
                            </button>

                        </div>

                    </form>

                    <div className="lg:col-span-2">

                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-5">

                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="outline-none w-full bg-transparent text-lg"
                                onChange={(e)=>setSearch(e.target.value)}
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">

                            {
                                filteredTasks.map((task)=>(

                                    <div
                                        key={task._id}
                                        className="bg-white/70 backdrop-blur-xl p-8 rounded-[35px] shadow-xl hover:-translate-y-2 transition border border-white/50"
                                    >

                                        <div className="flex justify-between items-start">

                                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold">

                                                {
                                                    task?.title
                                                    ?
                                                    task.title.charAt(0)
                                                    :
                                                    "T"
                                                }

                                            </div>

                                            <button
                                                onClick={()=>
                                                    deleteTask(
                                                        task._id
                                                    )
                                                }
                                                className="bg-red-100 hover:bg-red-200 transition p-3 rounded-2xl text-red-500"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                        <h2 className="text-3xl font-bold mt-7 text-slate-800">

                                            {
                                                task?.title || "Untitled"
                                            }

                                        </h2>

                                        <p className="text-gray-500 mt-5 leading-8">

                                            {
                                                task?.description || "No Description"
                                            }

                                        </p>

                                        <div className="flex justify-between mt-6">

                                            <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                {
                                                    task?.status
                                                }

                                            </span>

                                            <span className="text-gray-400">

                                                {
                                                    task?.dueDate
                                                    ?
                                                    new Date(task.dueDate)
                                                    .toLocaleDateString()
                                                    :
                                                    "No Date"
                                                }

                                            </span>

                                        </div>

                                        <div className="flex gap-3 mt-7">

                                            <button
                                                onClick={()=>
                                                    updateStatus(
                                                        task._id,
                                                        "In Progress"
                                                    )
                                                }
                                                className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-3 rounded-2xl text-white font-semibold"
                                            >
                                                Progress
                                            </button>

                                            <button
                                                onClick={()=>
                                                    updateStatus(
                                                        task._id,
                                                        "Completed"
                                                    )
                                                }
                                                className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-2xl text-white font-semibold"
                                            >
                                                Complete
                                            </button>

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

export default Tasks;