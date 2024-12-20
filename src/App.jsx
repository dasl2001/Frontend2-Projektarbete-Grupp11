import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import Start from "./pages/Start";
import Todo from "./pages/Todo";
import TodoDetails from "./components/TodoDetails";
import "./App.css";
import HabitsPage from "./pages/HabitsPage";

function App() {
  const [userList, setUserList] = useState(() => {
    const savedUsers = localStorage.getItem("userList");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    if (loggedInUser) {
      setTasks(loggedInUser.tasks || []);
      setHabits(loggedInUser.habits || []);
    } else {
      setTasks([]);
      setHabits([]);
    }
  }, [loggedInUser]);

  function handleLogout() {
    setLoggedInUser(null);
    setLogoutMessage("Loggas ut.");
    navigate("/");
  }

  return (
    <>
      <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
      <Routes>
        {!loggedInUser ? (
          <>
            <Route
              path="/login"
              element={
                <Login
                  userList={userList}
                  setLoggedInUser={setLoggedInUser}
                  logoutMessage={logoutMessage}
                  clearLogoutMessage={() => setLogoutMessage("")}
                />
              }
            />
            <Route
              path="/register"
              element={
                <AddUser userList={userList} setUserList={setUserList} />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Home
                  logoutMessage={logoutMessage}
                  clearLogoutMessage={() => setLogoutMessage("")}
                />
              }
            />
            <Route
              path="/start"
              element={<Start tasks={tasks} habits={habits} />}
            />
            <Route
              path="/habits"
              element={
                <HabitsPage
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                  setUserList={setUserList}
                  habits={loggedInUser?.habits || []}
                  setHabits={(updatedHabits) => {
                    if (loggedInUser) {
                      const updatedUser = {
                        ...loggedInUser,
                        habits: updatedHabits,
                      };
                      setLoggedInUser(updatedUser);
                      setUserList((prevList) =>
                        prevList.map((user) =>
                          user.username === updatedUser.username
                            ? updatedUser
                            : user
                        )
                      );
                    }
                  }}
                />
              }
            />
            <Route
              path="/todo/:id"
              element={<TodoDetails tasks={tasks} setTasks={setTasks} />}
            />
            <Route
              path="/todo"
              element={
                <Todo
                  tasks={tasks}
                  setTasks={(updatedTasks) => {
                    setTasks(updatedTasks);
                    if (loggedInUser) {
                      const updatedUser = {
                        ...loggedInUser,
                        tasks: updatedTasks,
                      };
                      setLoggedInUser(updatedUser);
                      setUserList((prevList) =>
                        prevList.map((user) =>
                          user.username === updatedUser.username
                            ? updatedUser
                            : user
                        )
                      );
                    }
                  }}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
