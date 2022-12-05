import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registrationUser = createAsyncThunk(
    'auth/registrationUser',
    async ({name, password, email, birth}) => {
        try {
            const {data} = await axios.post('/registration', {
                name,
                password,
                email,
                birth
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (e) {
            console.log(e)
        }
    },)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({password, email, login}) => {
        try {
            const {data} = await axios.post('/login', {
                password,
                email
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (e) {
            console.log(e)
        }
    },)

// export const checkMe = createAsyncThunk('auth/checkMe', async () => {
//     try {
//         const {data} = await axios.get('/check/me')
//
//         console.log(data)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// })

export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const {data} = await axios.get('/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: {


        //Registration
        [registrationUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registrationUser.fulfilled]: (state, action) => {

            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registrationUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },


        //Login User
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]: (state, action) => {

            state.status = action.payload.message
            state.isLoading = false
        },


        //checkMe
        // [getMe.pending]: (state) => {
        //     state.isLoading = true
        //     state.status = null
        // },
        // [getMe.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     state.status = null
        //     state.token = action.payload?.token
        //
        // },
        // [getMe.rejected]: (state, action) => {
        //     state.status = action.payload.message
        //     state.isLoading = false
        // },


        //GetMe
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token

        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const {logout}= authSlice.actions
export default authSlice.reducer