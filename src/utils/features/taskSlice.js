import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todoCount: 0,
    todoTaskList: [],
    inProgressCount: 0,
    inProgressTaskList: [],
    completedCount: 0,
    completedTaskList: []
}

const taskSlice = createSlice({
  name: second,
  initialState,
  reducers: {}
});

export const {} = taskSlice.actions

export default taskSlice.reducer