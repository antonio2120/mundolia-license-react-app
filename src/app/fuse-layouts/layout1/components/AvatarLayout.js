import {amber, blue, green, red} from '@material-ui/core/colors';
import {fuseDark, skyBlue, fusePurple, fuseBlue, fuseRed, fuseOrange} from '@fuse/colors';
import React, {useCallback, useEffect} from 'react';
import '../../../../styles/index.css'
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import {closeAvatarLayout} from "../../../store/fuse/avatarSlice";

function AvatarLayout(props) {
    const dispatch = useDispatch();
    const avatarLayout = useSelector(({fuse}) => fuse.avatar.avatarLayout);
    console.log(avatarLayout);

    const initDialog = useCallback(() => {
    }, []);

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (avatarLayout.props.open) {
            initDialog();
        }
    }, [avatarLayout.props.open, initDialog]);

    return (
        <Dialog
            classes={{
                paper: 'm-24 rounded-8'
            }}
            {...avatarLayout.props}
            fullWidth
            maxWidth="xs"
        >
            <div>
                <AutoRotatingCarousel
                    label="Seleccionar Avatar"
                    style={{position: "absolute",}}
                    autoplay={false}
                    {...avatarLayout.props}
                    onClose={ev => dispatch(closeAvatarLayout())}
                >
                    <Slide
                        media={
                            <img
                                src="assets/images/avatars/avatar0.png" alt="avatar0"
                                style={{paddingTop: 30}}
                            />
                        }
                        mediaBackgroundStyle={{backgroundColor: green[400]}}
                        style={{backgroundColor: green[600]}}
                        title="May the force be with you"
                        subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
                    />
                    <Slide
                        media={
                            <img
                                src="assets/images/avatars/avatar1.png" alt="avatar1"
                                style={{paddingTop: 30}}
                            />
                        }
                        mediaBackgroundStyle={{backgroundColor: fusePurple[400]}}
                        style={{backgroundColor: fusePurple[600]}}
                        title="May the force be with you"
                        subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
                    />
                    <Slide
                        media={
                            <img
                                src="assets/images/avatars/avatar2.png" alt="avatar2"
                                style={{paddingTop: 30}}
                            />
                        }
                        mediaBackgroundStyle={{backgroundColor: fuseOrange[400]}}
                        style={{backgroundColor: fuseOrange[600]}}
                        title="May the force be with you"
                        subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
                    />
                    <Slide
                        media={
                            <img
                                src="assets/images/avatars/avatar3.png" alt="avatar3"
                                style={{paddingTop: 30}}/>
                        }
                        mediaBackgroundStyle={{backgroundColor: blue[400]}}
                        style={{backgroundColor: blue[600]}}
                        title="Ever wanted to be popular?"
                        subtitle="Well just mix two colors and your are good to go!"
                    />
                    <Slide
                        media={
                            <img
                                src="assets/images/avatars/avatar4.png" alt="avatar4"
                                style={{paddingTop: 30}}
                            />
                        }
                        mediaBackgroundStyle={{backgroundColor: red[400]}}
                        style={{backgroundColor: red[600]}}
                        title="This is a very cool feature"
                        subtitle="Just using this will blow your mind."
                    />
                </AutoRotatingCarousel>
            </div>
        </Dialog>
    );
}

export default AvatarLayout;