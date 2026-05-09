import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);

  const [projectInput, setProjectInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [teamInput, setTeamInput] = useState("");

  const [toast, setToast] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // ================= LOGIN / SIGNUP =================

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
const [isAdmin, setIsAdmin] = useState(false);

const adminEmail = "admin@teamsync.com";
const adminPassword = "admin123";
  useEffect(() => {
  const savedUser = localStorage.getItem("teamsync_user");

  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);

    setCurrentUser(parsedUser);

    if (parsedUser.role === "admin") {
      setIsAdmin(true);
    }
  }
}, []);

  // ================= TOAST =================

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // ================= SIGNUP =================

  const handleSignup = () => {
    if (
      signupName.trim() === "" ||
      signupEmail.trim() === "" ||
      signupPassword.trim() === ""
    ) {
      showToast("Please fill all signup fields");
      return;
    }

    const userData = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    };

    localStorage.setItem(
      "teamsync_account",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "teamsync_user",
      JSON.stringify(userData)
    );

    setCurrentUser(userData);

    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");

    setShowAuthModal(false);

    showToast("Signup Successful");
  };

  // ================= LOGIN =================

  const handleLogin = () => {

  // ADMIN LOGIN

  if (
    loginEmail === adminEmail &&
    loginPassword === adminPassword
  ) {

    const adminData = {
      name: "Admin",
      email: adminEmail,
      role: "admin",
    };

    localStorage.setItem(
      "teamsync_user",
      JSON.stringify(adminData)
    );

    setCurrentUser(adminData);

    setIsAdmin(true);

    setLoginEmail("");
    setLoginPassword("");

    setShowAuthModal(false);

    showToast("Admin Login Successful");

    return;
  }

  // NORMAL USER LOGIN

  const savedAccount = JSON.parse(
    localStorage.getItem("teamsync_account")
  );

  if (!savedAccount) {
    showToast("No account found. Please signup first");
    return;
  }

  if (
    loginEmail === savedAccount.email &&
    loginPassword === savedAccount.password
  ) {

    localStorage.setItem(
      "teamsync_user",
      JSON.stringify(savedAccount)
    );

    setCurrentUser(savedAccount);

    setIsAdmin(false);

    setLoginEmail("");
    setLoginPassword("");

    setShowAuthModal(false);

    showToast("Login Successful");

  } else {

    showToast("Invalid Email or Password");

  }
};

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("teamsync_user");

    setCurrentUser(null);

    showToast("Logged Out Successfully");
  };

 // ================= PROJECTS =================

const addProject = () => {

 if (!currentUser) {

  setAuthType("login");

  setShowAuthModal(true);

  return;
}

  if (projectInput.trim() === "") return;

  const newProject = {
    id: Date.now(),
    title: projectInput,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };

  setProjects([...projects, newProject]);

  if (notifications) {
    showToast("Project Added Successfully");
  }

  setProjectInput("");
};

  const completeProject = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              completed: !project.completed,
            }
          : project
      )
    );

    if (notifications) {
      showToast("Project Status Updated");
    }
  };

  const deleteProject = (id) => {
    setProjects(
      projects.filter((project) => project.id !== id)
    );

    if (notifications) {
      showToast("Project Deleted");
    }
  };

  // ================= TASKS =================

 const addTask = () => {

  if (!currentUser) {

    setAuthType("login");

    setShowAuthModal(true);

    return;
  }

  if (taskInput.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: taskInput,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };

  setTasks([...tasks, newTask]);

  if (notifications) {
    showToast("Task Added Successfully");
  }

  setTaskInput("");
};

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );

    if (notifications) {
      showToast("Task Status Updated");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    if (notifications) {
      showToast("Task Deleted");
    }
  };

  // ================= TEAMS =================

 const addTeam = () => {

  if (!currentUser) {

    setAuthType("login");

    setShowAuthModal(true);

    return;
  }

  if (teamInput.trim() === "") return;

  const newTeam = {
    id: Date.now(),
    name: teamInput,
    joinedAt: new Date().toLocaleString(),
  };

  setTeams([...teams, newTeam]);

  if (notifications) {
    showToast("Team Member Added");
  }

  setTeamInput("");
};

  const deleteTeam = (id) => {
    setTeams(teams.filter((team) => team.id !== id));

    if (notifications) {
      showToast("Team Member Removed");
    }
  };

  // ================= RESET =================

  const resetAll = () => {
    setProjects([]);
    setTasks([]);
    setTeams([]);

    setShowResetModal(false);

    showToast("Everything Reset");
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">
        <h2>TeamSync</h2>

        <ul>
          {!isAdmin && (
  <li
    className={
      activePage === "Dashboard" ? "active" : ""
    }
    onClick={() => setActivePage("Dashboard")}
  >
    Dashboard
  </li>
)}

{isAdmin && (
  <li
    className={
      activePage === "Admin" ? "active" : ""
    }
    onClick={() => setActivePage("Admin")}
  >
    Admin Dashboard
  </li>
)}
          <li
            className={
              activePage === "Projects" ? "active" : ""
            }
            onClick={() => setActivePage("Projects")}
          >
            Projects
          </li>

          <li
            className={activePage === "Tasks" ? "active" : ""}
            onClick={() => setActivePage("Tasks")}
          >
            Tasks
          </li>

          <li
            className={activePage === "Teams" ? "active" : ""}
            onClick={() => setActivePage("Teams")}
          >
            Teams
          </li>

          <li
            className={
              activePage === "Settings" ? "active" : ""
            }
            onClick={() => setActivePage("Settings")}
          >
            Settings
          </li>
        </ul>
      </div>

      {/* ================= MAIN ================= */}

      <div className="main-content">
        <div className="topbar">
          <div>
            <h1>{activePage}</h1>

            <p>Modern Project Management Dashboard</p>
          </div>

          <div className="top-right-section">
            {!currentUser ? (
              <>
                <button
                  className="login-btn"
                  onClick={() => {
                    setAuthType("login");
                    setShowAuthModal(true);
                  }}
                >
                  Login
                </button>

                <button
                  className="signup-btn"
                  onClick={() => {
                    setAuthType("signup");
                    setShowAuthModal(true);
                  }}
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                <div className="profile-box">
                  <div className="notification-dot"></div>

                  <h4>{currentUser.name}</h4>
                </div>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}

        {activePage === "Dashboard" && (
          <>
            <div className="stats-grid">
              <div className="stat-card blue">
                <h2>{projects.length}</h2>
                <p>Total Projects</p>
              </div>

              <div className="stat-card green">
                <h2>{tasks.length}</h2>
                <p>Total Tasks</p>
              </div>

              <div className="stat-card orange">
                <h2>
                  {
                    projects.filter(
                      (project) => project.completed
                    ).length
                  }
                </h2>

                <p>Completed Projects</p>
              </div>

              <div className="stat-card purple">
                <h2>{teams.length}</h2>
                <p>Team Members</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Recent Projects</h3>

                {projects.length === 0 ? (
                  <p className="empty-text">
                    No projects added
                  </p>
                ) : (
                  projects.map((project) => (
                    <div
                      className="dashboard-item"
                      key={project.id}
                    >
                      <div>
                        <h4>{project.title}</h4>

                        <small>{project.createdAt}</small>
                      </div>

                      <span
                        className={
                          project.completed
                            ? "completed-badge"
                            : "pending-badge"
                        }
                      >
                        {project.completed
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="dashboard-card">
                <h3>Recent Tasks</h3>

                {tasks.length === 0 ? (
                  <p className="empty-text">
                    No tasks added
                  </p>
                ) : (
                  tasks.map((task) => (
                    <div
                      className="dashboard-item"
                      key={task.id}
                    >
                      <div>
                        <h4>{task.text}</h4>

                        <small>{task.createdAt}</small>
                      </div>

                      <span
                        className={
                          task.completed
                            ? "completed-badge"
                            : "pending-badge"
                        }
                      >
                        {task.completed ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="dashboard-card">
                <h3>Team Members</h3>

                {teams.length === 0 ? (
                  <p className="empty-text">
                    No team members added
                  </p>
                ) : (
                  teams.map((team) => (
                    <div
                      className="dashboard-item"
                      key={team.id}
                    >
                      <div>
                        <h4>{team.name}</h4>

                        <small>{team.joinedAt}</small>
                      </div>

                      <span className="completed-badge">
                        Active
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* ================= PROJECTS ================= */}

        {activePage === "Projects" && (
          <div className="page-card">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter project name"
                value={projectInput}
                onChange={(e) =>
                  setProjectInput(e.target.value)
                }
              />

              <button onClick={addProject}>
                Add Project
              </button>
            </div>

            <div className="card-grid">
              {projects.map((project) => (
                <div className="card" key={project.id}>
                  <h3>{project.title}</h3>

                  <p>Created : {project.createdAt}</p>

                  <div className="card-buttons">
                    <button
                      className="complete-btn"
                      onClick={() =>
                        completeProject(project.id)
                      }
                    >
                      {project.completed
                        ? "Undo"
                        : "Complete"}
                    </button>
{isAdmin && (
  <button
    className="delete-btn"
    onClick={() =>
      deleteProject(project.id)
    }
  >
    Delete
  </button>
)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TASKS ================= */}

        {activePage === "Tasks" && (
          <div className="page-card">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter task"
                value={taskInput}
                onChange={(e) =>
                  setTaskInput(e.target.value)
                }
              />

              <button onClick={addTask}>Add Task</button>
            </div>

            <div className="card-grid">
              {tasks.map((task) => (
                <div className="card" key={task.id}>
                  <h3>{task.text}</h3>

                  <p>{task.createdAt}</p>

                  <div className="card-buttons">
                    <button
                      className="complete-btn"
                      onClick={() => completeTask(task.id)}
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>

                   {isAdmin && (
  <button
    className="delete-btn"
    onClick={() => deleteTask(task.id)}
  >
    Delete
  </button>
)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TEAMS ================= */}

        {activePage === "Teams" && (
          <div className="page-card">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter member name"
                value={teamInput}
                onChange={(e) =>
                  setTeamInput(e.target.value)
                }
              />

              <button onClick={addTeam}>Add Member</button>
            </div>

            <div className="card-grid">
              {teams.map((team) => (
                <div className="card" key={team.id}>
                  <h3>{team.name}</h3>

                  <p>{team.joinedAt}</p>

                  {isAdmin && (
  <button
    className="delete-btn full-btn"
    onClick={() => deleteTeam(team.id)}
  >
    Remove
  </button>
)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SETTINGS ================= */}

        {activePage === "Settings" && (
          <div className="settings-card">
            <h2>Settings</h2>

            <div className="setting-row">
              <div>
                <h4>Dark Mode</h4>

                <p>Switch between dark and light theme</p>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "ON" : "OFF"}
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h4>Notifications</h4>

                <p>Show popup notifications</p>
              </div>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
              >
                {notifications ? "ON" : "OFF"}
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h4>Reset Everything</h4>

                <p>
                  Delete all projects, tasks and members
                </p>
              </div>

              <button
                className="danger-btn"
                onClick={() =>
                  setShowResetModal(true)
                }
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* ================= AUTH MODAL ================= */}
        {/* ================= ADMIN ================= */}

{activePage === "Admin" && isAdmin && (

  <div className="admin-panel">

    <h2>Admin Dashboard</h2>

    <div className="admin-grid">

      <div className="admin-card">
        <h3>Total Projects</h3>
        <h1>{projects.length}</h1>
      </div>

      <div className="admin-card">
        <h3>Total Tasks</h3>
        <h1>{tasks.length}</h1>
      </div>

      <div className="admin-card">
        <h3>Total Members</h3>
        <h1>{teams.length}</h1>
      </div>

      <div className="admin-card">
        <h3>Completed Projects</h3>

        <h1>
          {
            projects.filter(
              (project) => project.completed
            ).length
          }
        </h1>
      </div>

    </div>

    <div className="admin-section">

      <h3>All Projects</h3>

      {projects.map((project) => (

        <div
          className="admin-item"
          key={project.id}
        >

          <span>{project.title}</span>

          <button
            className="delete-btn"
            onClick={() =>
              deleteProject(project.id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

    <div className="admin-section">

      <h3>All Tasks</h3>

      {tasks.map((task) => (

        <div
          className="admin-item"
          key={task.id}
        >

          <span>{task.text}</span>

          <button
            className="delete-btn"
            onClick={() =>
              deleteTask(task.id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

    <div className="admin-section">

      <h3>All Team Members</h3>

      {teams.map((team) => (

        <div
          className="admin-item"
          key={team.id}
        >

          <span>{team.name}</span>

          {isAdmin && (
  <button
    className="delete-btn"
    onClick={() =>
      deleteProject(project.id)
    }
  >
    Delete
  </button>
)}

        </div>

      ))}

    </div>

  </div>

)}
        {showAuthModal && (
          <div className="modal-overlay">
            <div className="auth-modal">
              <h2>
                {authType === "login"
                  ? "Login"
                  : "Create Account"}
              </h2>

              {authType === "signup" && (
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={signupName}
                  onChange={(e) =>
                    setSignupName(e.target.value)
                  }
                />
              )}

              <input
                type="email"
                placeholder="Enter Email"
                value={
                  authType === "login"
                    ? loginEmail
                    : signupEmail
                }
                onChange={(e) =>
                  authType === "login"
                    ? setLoginEmail(e.target.value)
                    : setSignupEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={
                  authType === "login"
                    ? loginPassword
                    : signupPassword
                }
                onChange={(e) =>
                  authType === "login"
                    ? setLoginPassword(e.target.value)
                    : setSignupPassword(e.target.value)
                }
              />
<div className="auth-buttons">

  <button
    className="cancel-btn"
    onClick={() =>
      setShowAuthModal(false)
    }
  >
    Cancel
  </button>

  <button
    className="confirm-btn"
    onClick={
      authType === "login"
        ? handleLogin
        : handleSignup
    }
  >
    {authType === "login"
      ? "Login"
      : "Signup"}
  </button>

</div>

{authType === "login" && (

  <p className="switch-auth-text">

    Not registered yet?

    <span
      onClick={() => setAuthType("signup")}
    >
      Signup
    </span>

  </p>

)}

{authType === "signup" && (

  <p className="switch-auth-text">

    Already have an account?

    <span
      onClick={() => setAuthType("login")}
    >
      Login
    </span>

  </p>

)}

            
              </div>
            </div>
          
        )}

        {/* ================= RESET MODAL ================= */}

        {showResetModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Reset Everything?</h2>

              <p>
                This action will permanently delete all
                projects, tasks and team members.
              </p>

              <div className="modal-buttons">
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowResetModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="confirm-btn"
                  onClick={resetAll}
                >
                  Yes Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TOAST ================= */}
{showLoginAlert && (

  <div className="login-alert-overlay">

    <div className="login-alert-box">

      <div className="login-alert-icon">
        🔒
      </div>

      <h2>Authentication Required</h2>

      <p>
        You must login first to perform this action.
      </p>

      <div className="login-alert-buttons">

        <button
          className="login-now-btn"
          onClick={() => {

            setShowLoginAlert(false);

            setAuthType("login");

            setShowAuthModal(true);

          }}
        >
          Login Now
        </button>

        <button
          className="cancel-alert-btn"
          onClick={() =>
            setShowLoginAlert(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
      {toast && <div className="toast">{toast}</div>}  
      </div>
    </div>
  );
}

export default App;