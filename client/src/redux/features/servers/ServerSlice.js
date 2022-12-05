import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {

    servers: [],
    currentServers: [],
    currentCategory: null,
    types: [],
    status: null,
    loading: false,
}

export const getServerByCategory = createAsyncThunk('servers/getServerByCategory', async ({typeId}) => {

    try {

        const {data} = await axios.get('/discover/filter', {params: {type: typeId}})

        return data

    } catch (e) {

        console.log(e)
    }
})

export const getServerBySearch = createAsyncThunk('servers/getServerBySearch', async ({searchString}) => {

    try {

        const {data} = await axios.get('/discover/search', {params: {name: searchString}})

        return data
    } catch (e) {

        console.log(e)
    }
})

export const addUserToServer = createAsyncThunk('servers/addUserToServer', async ({serverId}, serverAPI) => {

    try {

        const {data} = await axios.put('/discover', {serverId})

        serverAPI.dispatch(setCurrentServers(serverId))

        return data
    } catch (e) {

        console.log(e)
    }
})

export const getServers = createAsyncThunk('servers/getServers', async () => {

    try {

        const {data} = await axios.get('/discover')

        return data
    } catch (e) {

        console.log(e)
    }
})

export const serversSlice = createSlice({

    name: 'servers',
    initialState,
    reducers: {

        setCurrentServers:(state, action)=>{

            state.currentServers.includes(action.payload)?

            state.currentServers.splice(state.currentServers.indexOf(action.payload), 1):
                state.currentServers.push((action.payload))
        }
    },
    extraReducers: {


        //reload servers
        [addUserToServer.pending]: (state) => {

            state.loading = true
        },
        [addUserToServer.fulfilled]: (state, action) => {


            // action.payload.action === 'add' ?
            //     state.currentServers.push((action.payload.server)) :
            //     state.currentServers.splice(state.currentServers.indexOf(action.payload.server), 1)

            state.loading = true
        },
        [addUserToServer.rejected]: (state) => {

            state.loading = false
        },


        //get servers
        [getServers.pending]: (state) => {

            state.loading = true
        },
        [getServers.fulfilled]: (state, action) => {

            state.loading = false
            if (action.payload.success) {
                state.servers = action.payload.servers
                state.types = action.payload.types

                action.payload.servers.forEach(item=>{

                    if (item.currentUser){

                        state.currentServers.push(item.id)
                    }
                })

            }

        },
        [getServers.rejected]: (state) => {

            state.loading = false
        },


        //get server by search
        [getServerBySearch.pending]: (state) => {

            state.loading = true
        },
        [getServerBySearch.fulfilled]: (state, action) => {

            state.loading = false

            if (action.payload?.success) {

                state.servers = action.payload.servers
            }

        },
        [getServerBySearch.rejected]: (state) => {

            state.loading = false
        },


        //get server by filter
        [getServerByCategory.pending]: (state) => {

            state.loading = true
        },
        [getServerByCategory.fulfilled]: (state, action) => {

            state.loading = false

            if (action.payload?.success) {

                state.servers = action.payload.servers

                if (action.payload.category) {

                    state.currentCategory = action.payload.category
                } else {
                    state.currentCategory = null
                }

            }

        },
        [getServerByCategory.rejected]: (state) => {

            state.loading = false
        }
    }
})

export const {setCurrentServers} = serversSlice.actions

export default serversSlice.reducer