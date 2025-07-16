// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const studentPersistConfig = {
    key: "student",
    storage,
};

const teacherPersistConfig = {
    key: "teacher",
    storage,
};

const persistedStudentReducer = persistReducer(studentPersistConfig, studentReducer);
const persistedTeacherReducer = persistReducer(teacherPersistConfig, teacherReducer);

const store = configureStore({
    reducer: {
        student: persistedStudentReducer,
        teacher: persistedTeacherReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
