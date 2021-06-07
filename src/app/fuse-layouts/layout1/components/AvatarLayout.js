import {pink, lime, green, indigo} from '@material-ui/core/colors';
import {fusePurple, fuseBlue, fuseRed, fuseOrange} from '@fuse/colors';
import React, {useCallback, useEffect, useState} from 'react';
import '../../../../styles/index.css'
import {useDispatch, useSelector} from "react-redux";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import {closeAvatarLayout, getAvatars} from "../../../store/fuse/avatarSlice";
import {useForm} from "../../../../@fuse/hooks";
import FuseUtils from "../../../../@fuse/utils";
import {updateUserData} from "../../../auth/store/userSlice";

const defaultFormState = {
    id: '',
    name: '',
};

function AvatarLayout(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const avatarLayout = useSelector(({fuse}) => fuse.avatar.avatarLayout);
    const avatarData = useSelector(({fuse}) => fuse.avatar.entities);
    const avatar = Object.entries(avatarData).map(([key, value]) => ({key, value}))
    console.log('Avatar: ', avatar);
    const {form, handleChange, setForm} = useForm(defaultFormState);
    let [color, setBackground] = useState([fuseBlue[500]]);
    let [secondColor, secondBackground] = useState([fuseBlue[700]]);
    let imageProfile = user.data.photoURL;


    console.log(user.data.photoURL);
    const initDialog = useCallback(() => {
        setForm({
            ...defaultFormState,
            id: FuseUtils.generateGUID()
        });
    }, [setForm]);

    function setColor(key) {
        console.log(key);
        if (key === 0) {
            setBackground(fuseBlue[400])
            secondBackground(fuseBlue[700])
        }
        if (key === 1) {
            setBackground(fuseRed[400])
            secondBackground(fuseRed[700])
        }
        if (key === 2) {
            setBackground(fuseOrange[400])
            secondBackground(fuseOrange[700])
        }
        if (key === 3) {
            setBackground(fusePurple[400])
            secondBackground(fusePurple[700])
        }
        if (key === 4) {
            setBackground(green[400])
            secondBackground(green[700])
        }
        if (key === 5) {
            setBackground(lime[400])
            secondBackground(lime[700])
        }
        if (key === 6) {
            setBackground(pink[400])
            secondBackground(pink[700])
        }
        if (key === 7) {
            setBackground(indigo[400])
            secondBackground(indigo[700])
        }
    }


    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (avatarLayout.props.open) {
            initDialog();
        }
    }, [avatarLayout.props.open, initDialog]);

    useEffect(() => {
    }, []);

    return (
        <div className={'lia-avatar'}>
            {avatar ?
                <AutoRotatingCarousel
                    label="Seleccionar Avatar"
                    style={{position: "absolute",}}
                    autoplay={false}
                    {...avatarLayout.props}
                    onClose={ev => dispatch(closeAvatarLayout())}
                    onStart={ev => dispatch(closeAvatarLayout())}
                    onChange={ev => setColor(ev)}
                >
                    {avatar.map((row) => (
                        <Slide
                            key={row.value.id}
                            id={row.value.name}
                            value={form.id}
                            media={
                                <img
                                    src={row.value.path} alt="avatar0"
                                    style={{paddingTop: 30}}
                                />
                            }
                            mediaBackgroundStyle={{backgroundColor: color}}
                            style={{backgroundColor: secondColor}}
                            title={row.value.name}
                            subtitle={row.value.description}
                        />
                    ))
                    }
                </AutoRotatingCarousel>
                :
                null
            }
        </div>
    );
}

export default AvatarLayout;