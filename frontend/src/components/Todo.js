import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTaskStore } from '../stores/taskStore';

const Todo = () => {
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const { checkAuth, logout } = useAuthStore();
  const { tasks, loadTasks, addTask, deleteTask, updateTask, error } = useTaskStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate);
    loadTasks();
  }, [checkAuth, navigate, loadTasks, tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    loadTasks();
  };

  const handleEditTask = (task) => {
    setEditTaskId(task._id);
    setEditTaskValue(task.task);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (editTaskValue.trim()) {
      await updateTask(editTaskId, editTaskValue);
      setEditTaskId(null);
      setEditTaskValue('');
      loadTasks(); 
    }
  };

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">TODO</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700">
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} className="mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white"
          placeholder="Add a new task"
        />
        <button type="submit" className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-700">
          Add Task
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
            {editTaskId === task._id ? (
              <form onSubmit={handleUpdateTask} className="flex space-x-2">
                <input
                  type="text"
                  value={editTaskValue}
                  onChange={(e) => setEditTaskValue(e.target.value)}
                  className="p-2 rounded-lg bg-gray-700 text-white"
                  placeholder="Edit task"
                />
                <button type="submit" className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditTaskId(null);
                    setEditTaskValue('');
                  }}
                  className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{task.task}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
