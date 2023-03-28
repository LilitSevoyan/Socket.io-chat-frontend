import {createSlice} from '@reduxjs/toolkit'
import {postLoginAction,
        getLoginUserAction,
        getConversationAction,
        getMessengesAction,
        postMessageAction    
    } 
    from "../actions/mainAction"

const initialState ={
    loading:false,
    conversation:[],
    messages:[],
    user:[],
    messenger:[]
}

export const mainSlice = createSlice({
    name:"main",
    initialState,
    reducers:{},
    extraReducers: (users) => {
        users
            .addCase(getLoginUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLoginUserAction.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getLoginUserAction.rejected, (state) => {
                state.user = [];
                state.loading = false;
            })
            .addCase(postLoginAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(postLoginAction.fulfilled, (state, action) => {
                state.userid = action.payload;
                state.loading = false;
            })
            .addCase(postLoginAction.rejected, (state) => {
                state.user = [];
                state.loading = false;
            })
            .addCase(getConversationAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getConversationAction.fulfilled, (state, action) => {
                
                state.conversation = action.payload;
                state.loading = false;
            })
            .addCase(getConversationAction.rejected, (state) => {
                state.conversation = [];
                state.loading = false;
            })
            //.addCase(getUsersAllAction.pending, (state) => {
            //    state.loading = true;
            //})
            //.addCase(getUsersAllAction.fulfilled, (state, action) => {
            //    state.users = action.payload.usersAll;
            //    state.loading = false;
            //})
            //.addCase(getUsersAllAction.rejected, (state) => {
            //    state.users = [];
            //    state.loading = false;
            //})
            .addCase(getMessengesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessengesAction.fulfilled, (state, action) => {
                state.messenger = action.payload;
                state.loading = false;
            })
            .addCase(getMessengesAction.rejected, (state) => {
                state.messenger = [];
                state.loading = false;
            })
            .addCase(postMessageAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(postMessageAction.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.loading = false;
            })
            .addCase(postMessageAction.rejected, (state) => {
                state.messages = [];
                state.loading = false;
            })
        }

            
})
export default mainSlice.reducer