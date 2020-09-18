import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

// components
import Scream from '../components/Scream';
import Profile from '../components/Profile';

class home extends Component {
    state = {
        screams: null,
    };
    componentDidMount() {
        axios
            .get('/screams')
            .then((res) => {
                this.setState({
                    screams: res.data,
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        let recentScreamsMarkUp = this.state.screams ? (
            this.state.screams.map((scream) => (
                <Scream scream={scream} key={scream.screamId} />
            ))
        ) : (
            <p>..loading</p>
        );
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkUp}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

export default home;
