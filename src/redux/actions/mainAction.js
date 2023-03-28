import { createAsyncThunk } from "@reduxjs/toolkit";
import {postLogin,getLoginUser,getUsersAll,getMessenges,getConversation,postMessage } from "../../component/axios/axios"

export const postLoginAction = createAsyncThunk(
    'main/postLogin',
    async ({email,password}) => {
        const user = await postLogin(email,password);
        return user;
    }
)

export const getLoginUserAction = createAsyncThunk(
    'main/getLoginUser',
    async () => {
        const User = await getLoginUser();
        return User;
    }
)

export const getUsersAllAction = createAsyncThunk(
    'main/getUsersAll',
    async () => {
        const users = await getUsersAll();
        return users;
    }
)

export const getMessengesAction = createAsyncThunk(
    'main/getMessenges',
    async (conversationId) => {
        const message = await getMessenges(conversationId);
        return message;
    }
)

export const getConversationAction = createAsyncThunk(
    'main/getConversation',
    async (conversationId) => {
        const conversation = await getConversation(conversationId);
        return conversation;
    }
)
//getFriends

export const postMessageAction = createAsyncThunk(
    'main/postMessage',
    async (message) => {
        const messages = await postMessage(message);
        return messages;
    }
)