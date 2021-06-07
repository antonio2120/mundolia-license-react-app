import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {getActivities} from "../../main/apps/activities/store/activitiesSlice";
import {getGroups} from "../../main/apps/activities/store/groupSlice";
import jwtService from "../../services/jwtService";
import {registerError, registerReset, registerSuccess} from "../../main/apps/groups/store/groupSlice";
import {setUser} from "../../auth/store/userSlice";
import {getHomeworks} from "../../main/apps/homeworks/store/homeworkSlice";

export const getAvatars = createAsyncThunk('avatarApp/avatar/getAvatars', async (type) =>{
    const response = await axios.get(process.env.REACT_APP_API + '/avatar', {
    });
    const data = await response.data;
    return data;
});

export const submitUpdateAvatar = ( avatarData ) => async dispatch => {
    return jwtService
        .setProfileImage({
            avatarId: avatarData.id,
            customName: avatarData.name,
            avatarPath: avatarData.path,
        })
        .then(response => {
            dispatch(registerSuccess());
            dispatch(setUser());
        })
        .catch(error => {
            return dispatch(registerError(error));
        });
};

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
        registerSuccess: (state, action) => {
            state.avatarLayout = {
                success: true,
                props: {
                    open: false
                },
                response: action.payload,
            };
        },
        registerError: (state, action) => {
            state.homework = {
                success: false,
                error: action.payload,
                // error: true
            };
        },
    },
    extraReducers: {
        [getAvatars.fulfilled]: (state, action) => {
            const {data} = action.payload;
            avatarAdapter.setAll(state, data);
        }
    }
});

export const {
    openAvatarLayout,
    closeAvatarLayout,
} = avatarSlice.actions;

export default avatarSlice.reducer;