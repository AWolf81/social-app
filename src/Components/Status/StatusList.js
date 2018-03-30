import React, { Component, Fragment } from "react";
import axios from "axios";
import StatusItem from "./StatusItem";

class StatusList extends Component {
  state = {
    loading: true,
    statusData: []
  };

  componentWillMount() {
    this.fetchStatus().then(response => {
      this.setState({
        loading: false,
        statusData: response.data.statuses
      });
    });
  }

  fetchStatus() {
    console.log(this.props);
    if (this.props.username) {
      return axios.get(`/users/${this.props.username}/status_updates`);
    } else {
      return axios.get("/status");
    }
  }

  render() {
    const { loading, statusData } = this.state;
    console.log("render status", statusData);
    return (
      <Fragment>
        {loading ? (
          "loading..."
        ) : statusData && statusData.length > 0 ? (
          <div className="list-group">
            {statusData.map(status => (
              <StatusItem key={status.id} status={status} />
            ))}
          </div>
        ) : (
          <div className="alert alert-info">Nothing posted yet.</div>
        )}
      </Fragment>
    );
  }
}

export default StatusList;
