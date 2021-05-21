import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

const avatarAdapter = createEntityAdapter({});

const avatarSlice = createSlice({
    name: 'avatar',
    initialState: avatarAdapter.getInitialState({
        avatarLayout : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        avatar: {
            success: false,
            response: false,
            error: null
        },
        routeParams: {},
    }),
    reducers: {
        openAvatarLayout: (state, action) => {
            state.avatarLayout = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeAvatarLayout: (state, action) => {
            state.avatarLayout = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
    },
});

export const {
    openAvatarLayout,
    closeAvatarLayout,
} = avatarSlice.actions;


export default avatarSlice.reducer;