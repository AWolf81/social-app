import React, { Component } from "react";
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
    return axios.get(`/users/${this.props.username}/status_updates`);
    // if (this.props.username) {
    // } else {
    //   return axios.get("/status");
    // }
  }

  render() {
    const { loading, statusData } = this.state;
    return !loading ? (
      statusData && statusData.length > 0 ? (
        <div className="list-group">
          {statusData.map(status => (
            <StatusItem key={status.id} status={status} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info">Nothing posted yet.</div>
      )
    ) : null;
  }
}

export default StatusList;
