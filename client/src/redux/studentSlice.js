import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentData: null,
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStudentData: (state, action) => {
            state.studentData = action.payload;
        },
        clearStudentData: (state) => {
            state.studentData = null;
        }
    }
});

export const { setStudentData, clearStudentData } = studentSlice.actions;
export default studentSlice.reducer;
