import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {getActivities} from "../../main/apps/activities/store/activitiesSlice";
import {getGroups} from "../../main/apps/activities/store/groupSlice";
import jwtService from "../../services/jwtService";
import {registerError, registerReset, registerSuccess} from "../../main/apps/groups/store/groupSlice";
import {setUser, updateUserData} from "../../auth/store/userSlice";
import {getHomeworks} from "../../main/apps/homeworks/store/homeworkSlice";
import _ from "../../../@lodash";

export const getAvatars = createAsyncThunk('avatarApp/avatar/getAvatars', async (type) =>{
    const response = await axios.get(process.env.REACT_APP_API + '/avatar', {
    });
    const data = await response.data;
    return data;
});

export const submitUpdateAvatar = () => async (dispatch, getState) => {
    const avatarData = {
        id: 16,
        avatarId: 2,
        customName: "Cuco",
        path: "assets/images/avatars/avatarFace0.jpg"
    }

    const oldUser = getState().auth.user;

    //const user = _.merge({}, oldUser, { data: { settings } });

    console.log('User' + oldUser.data);

    dispatch(updateUserData(oldUser));

    console.log(avatarData);

    return jwtService
        .setProfileImage({
            id: avatarData.id,
            avatarId: avatarData.avatarId,
            customName: avatarData.customName,
            avatarPath: avatarData.path,
        })
        .then(response => {
            dispatch(registerSuccess());

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
                type: 'change',
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