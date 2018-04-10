import React, { Component } from "react";
import axios from "axios";
import StatusItem from "./StatusItem";
import StatusForm from "./StatusForm";
import { SHOW_NOTIFY_ACTION } from "../../actions/notification";
import { connect } from "react-redux";
import { connect as withSocket } from "redux.io";

// import ChatClient from "./chat-client.js";

const ns = "/"; //http://localhost/";
const options =
  { ...options } ||
  (ownProps => ({
    transports: ["polling", "websocket"],
    autoConnect: ownProps.autoConnect
  }));

const withFeedSocket = withSocket(ns, options);

class StatusList extends Component {
  state = {
    loading: true,
    newStatus: "",
    statusData: []
  };

  componentDidMount() {
    this.fetchStatus().then(response => {
      this.setState({
        loading: false,
        statusData: response.data.statuses
      });
    });

    const { socket, channel } = this.props;

    socket.once("connect", () => {
      socket.on("*", data => {
        console.log("received", data);
      });
      // .on('user:join', (dispatch, ...eventData) => { ... })
      // .on('user:leave', ...)
      // ...
      // .on('disconnect', (dispatch, reason) => { ... });
    });
  }

  addStatus = async e => {
    e.preventDefault();
    try {
      await axios.post("/status_updates/create", {
        message: this.state.newStatus
      });
      // success
      // !!!!!!!!!!! todo: check that only profile owner can post status updates --> needs restriction on backend as well.
      this.setState({
        message: ""
      });
    } catch (response) {
      console.log("failed to post status", response);
      this.props.dispatch(
        SHOW_NOTIFY_ACTION("Post failed - please try again", {
          messageType: "danger"
        })
      );
    }
  };

  statusChanged = e => {
    console.log("submitted", e);
    this.setState({ newStatus: e.target.value });
  };

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
    const { authUser } = this.props;
    return !loading ? (
      <div>
        {authUser.username === this.props.username ? (
          <StatusForm
            addStatus={this.addStatus}
            statusChanged={this.statusChanged}
          />
        ) : null}
        {statusData && statusData.length > 0 ? (
          <div className="list-group">
            {statusData.map(status => (
              <StatusItem key={status.id} status={status} />
            ))}
          </div>
        ) : (
          <div className="alert alert-info">Nothing posted yet.</div>
        )}
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  console.log("mapstate", state);
  return { authUser: state.localAuth.user };
}
export default withFeedSocket(connect(mapStateToProps)(StatusList));
