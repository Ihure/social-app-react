import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadIt,
});

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.UI.errors) {
            return { errors: nextProps.UI.errors };
        } else return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.UI?.errors) {
            this.setState({
                errors: prevState.UI.errors,
            });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    render() {
        const {
            classes,
            UI: { loading },
        } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography
                                variant="body2"
                                className={classes.customError}
                            >
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Log In
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progress}
                                />
                            )}
                        </Button>
                        <br />
                        <small>
                            {' '}
                            Don't have an account? Sign Up{' '}
                            <Link to="/signup">here</Link>{' '}
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProp = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProp
)(withStyles(styles)(login));
