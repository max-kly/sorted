import { Task, NewTask, TaskUpdates } from '@/assets/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, fetchTaskByID, createTask, updateTask, deleteTask } from '@/api/tasks';
interface TasksState {
    list: Task[];
    selected: Task | null;
    loading: boolean;
    error: string | null;
}
const initialState: TasksState = {
    list: [],
    selected: null,
    loading: false,
    error: null,
};
export const loadTasks = createAsyncThunk('tasks/loadTasks', async () => {
    const { data } = await fetchTasks();
    return data.tasks;
});
export const loadTaskById = createAsyncThunk('tasks/loadTaskById', async (id: string) => {
    const { data } = await fetchTaskByID(id);
    return data.task;
});
export const addTask = createAsyncThunk('tasks/addTask', async (task: NewTask) => {
    const { data } = await createTask(task);
    return data.task;
});
export const editTask = createAsyncThunk('tasks/editTask', async ({ id, updates }: { id: string, updates: TaskUpdates }) => {
    const { data } = await updateTask(id, updates);
    return data.task;
});
export const removeTask = createAsyncThunk('tasks/removeTask', async (id: string) => {
    await deleteTask(id);
    return id;
});
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearSelectedTask(state) {
            state.selected = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTasks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loadTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(loadTasks.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to load tasks';
                state.loading = false;
            })
            .addCase(loadTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
                state.selected = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.list.push(action.payload);
            })
            .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.list.findIndex(t => t.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
                if (state.selected?.id === action.payload.id) {
                    state.selected = action.payload;
                }
            })
            .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.list = state.list.filter(task => task.id !== action.payload);
                if (state.selected?.id === action.payload) {
                    state.selected = null;
                }
            });
    }
});

export const { clearSelectedTask } = tasksSlice.actions;
export default tasksSlice.reducer;