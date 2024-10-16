import { Task } from '../db/models/task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}

export const createTask = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  try {
    const newTask = new Task({ task, userId: req.userId });
    await newTask.save();
    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}

export const updateTask = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { task }, { new: true, runValidators: true });  
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (updatedTask.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
}