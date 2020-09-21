import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';

// components
import Scream from '../components/Scream';
import Profile from '../components/Profile';

class home extends Component {
    componentDidMount() {
        this.props.getScreams();
    }
    render() {
        const {
            data: { screams, loading },
        } = this.props;
        let recentScreamsMarkUp = !loading ? (
            screams.map((scream) => <Scream scream={scream} key={scream.screamId} />)
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

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
