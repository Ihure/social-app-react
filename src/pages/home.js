import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

class home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        this.setState({
          screams: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentScreamsMarkUp = this.state.screams ? (
      this.state.screams.map((scream) => <p>{scream.body}</p>)
    ) : (
      <p>..loading</p>
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>profile</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
