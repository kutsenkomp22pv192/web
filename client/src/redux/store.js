import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/AuthSlice";
import serversSlice from "./features/servers/ServerSlice";

export const store = configureStore({
    reducer: {
        auth:authSlice,
        servers:serversSlice
    },
})