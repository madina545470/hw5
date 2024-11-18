import { createSlice } from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        activeTask: null
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                timeSpent: 0
            })
        },
        setActiveTask: (state, action) => {
            state.activeTask = action.payload
        },
        incrementTimeSpent: (state) => {
            if (state.activeTask) {
                const task = state.tasks.find(task => task.id === state.activeTask)
                if (task) {
                    task.timeSpent += 1
                }
            }
        },
        completeTask: (state) => {
            state.activeTask = null
        }
    }
})

export const { addTask, setActiveTask, incrementTimeSpent, completeTask } = tasksSlice.actions;
export default tasksSlice.reducer