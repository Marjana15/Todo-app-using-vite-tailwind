import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import logo from './assets/logo.png';
import TaskList from "./components/TaskList";
import { FaTasks } from "react-icons/fa"; 

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, title) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const getCompletedTasks = () => tasks.filter((task) => task.completed);
  const getRemainingTasks = () => tasks.filter((task) => !task.completed);

  return (
    <div className="hero bg-gray-900 h-screen md:min-h-[700px] w-full m-auto flex flex-col items-center transition-all duration-500">
      <div className="flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 text-white">
        <div className="w-full flex items-center justify-between">
          <h1 className="uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl flex items-center">
            <FaTasks size={32} className="mr-2" />
            <img src={logo} alt="logo" className="mr-2 w-12 h-12" />
            Todo List
          </h1>
        </div>
        <div className="shadow-md">
          <AddTaskForm onAddTask={addTask} />
        </div>
        <div className="scroll bg-gray-800 w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500">
          <div className="w-full overflow-hidden mb- sticky top-0 bg-gray-800 flex items-center justify-between text-gray-500 border-b">
            <p className="text-gray-500 px-2 py-3">
              {getRemainingTasks().length} tasks left
            </p>
            <button onClick={clearTasks}>Clear all tasks</button>
          </div>
          {tasks.length ? (
            <TaskList
              tasks={tasks}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onToggleCompleted={toggleCompleted}
            />
          ) : (
            <div className="w-full h-[80%] flex items-center justify-center overflow-hidden">
              <p className="text-gray-500 text-center z-10">Empty task</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 w-full py-6 text-center text-gray-400 mt-auto">
        <div className="flex items-center justify-center mb-2">
          <img src={logo} alt="footer logo" className="w-8 h-8 mr-2" />
          <span className="text-gray-400">© 2024 Todo App. All rights reserved to Marjana15.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
