import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";

const notifyClass = css`
  position: relative;
  display: inline-block;
  border-radius: 5px;
  padding-top: 5px;
  text-align: center;
  vertical-align: middle;
`;

const wrapperClass = css`
  position: absolute;
  top: 0.375rem;
  left: 0;
  width: 100%;
  text-align: center;
`;

class Notification extends Component {
  renderMessages = () => {
    return this.props.messages.map(
      ({ visible, id, message, messageType }) =>
        visible ? (
          <div
            key={id}
            className={wrapperClass}
            style={{ top: id * (2.5 + 0.375) + "rem" }}
          >
            <div className={`${notifyClass} alert alert-${messageType}`}>
              {message}
            </div>
          </div>
        ) : null
    );
  };

  render() {
    const { messages } = this.props;

    for (let message of messages) {
      console.log("create hide timeouts", message);
      if (message.timeout) {
        setTimeout(
          this.hideAlert,
          (message.id + 1) * message.timeout,
          message.id
        );
      }
    }
    // if (timeout) {
    //   this.timeoutId = setTimeout(this.hideAlert, count * timeout);
    // }

    return this.renderMessages();
  }

  hideAlert = id => {
    // this.timeoutId = null;
    this.props.dispatch({
      type: "NOTIFY__HIDE_MESSAGE",
      id
    });
  };
}

function mapStateToProps(state) {
  return {
    ...state.notification
  };
}

export default connect(mapStateToProps)(Notification);
