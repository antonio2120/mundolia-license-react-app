import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class SubjectListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Handle Clicked....");
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    render(){
        const { club } = this.props;
        const {subject} = this.props;

        return (
            <div>
                <ListItem button key={club}  onClick={this.handleClick}>
                    <ListItemText
                        primary={club}
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                    key={club}
                    in={this.state.open}
                    timeout='auto'
                    unmountOnExit
                >
                    {subject ?
                    <List
                        component='li'
                        disablePadding key={club}
                    >
                        {subject.map(data => {
                            return (
                                <ListItem button key={data.id}>
                                    <ListItemText
                                        key={data.id}
                                        value={data.calendar_id}
                                        primary={data.custom_name}
                                        style={{
                                            backgroundColor: data.custom_color,
                                            padding: 10,
                                            borderRadius:10
                                        }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                        :
                        null
                    }
                </Collapse>
            </div>
        )
    }
}

export default SubjectListItem;