import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, completeTask, incrementTimeSpent, setActiveTask } from "../../store/tasksSlice";

const TasksPage = () => {
    const dispatch = useDispatch()
    const { tasks, activeTask } = useSelector(state => state.tasksReducer)
    const [taskTitle, setTaskTitle] = useState('')

    const handleAddTask = () => {
        dispatch(addTask(taskTitle))
    }

    useEffect(() => {
        let interval;
        if (activeTask) {
            interval = setInterval(() => {
                dispatch(incrementTimeSpent());
            }, 1000);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [activeTask, dispatch])

    const handleStartTask = (taskId) => {
        dispatch(setActiveTask(taskId))
    }

    const handleCompleteTask = () => {
        dispatch(completeTask())
    }

    return (
        <div className="tasksContainer">
            <h1>Task Manager with Timer</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Enter task name"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="task-list">
                <h2>Task List</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <div>
                                <strong>{task.title}</strong>
                                <span> - Time Spent: {task.timeSpent}</span>
                            </div>
                            <button onClick={() => handleStartTask(task.id)}>
                                {activeTask === task.id ? 'Active' : 'Start'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {activeTask && (
                <div className="active-task">
                    <h2>Active Task</h2>
                    <div>
                        <p>Task: {tasks.find((task) => task.id === activeTask)?.title}</p>
                        <p>Time: {tasks.find((task) => task.id === activeTask)?.timeSpent} seconds</p>
                        <button onClick={handleCompleteTask}>Complete Task</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TasksPage;