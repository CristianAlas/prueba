import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { departmentsSlice } from "./slices/departments/departmentsSlice";
import { authSlice } from "./slices/auth/authSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        departments: departmentsSlice.reducer,
        auth: authSlice.reducer,
    }
});
