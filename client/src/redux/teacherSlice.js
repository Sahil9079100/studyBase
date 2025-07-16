import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherData: null,
};

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setTeacherData: (state, action) => {
            state.teacherData = action.payload;
        },
        clearTeacherData: (state) => {
            state.teacherData = null;
        }
    }
});

export const { setTeacherData, clearTeacherData } = teacherSlice.actions;
export default teacherSlice.reducer;
