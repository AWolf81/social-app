export default (
  state = {
    visible: false,
    messages: [],
    messageType: "info",
    timeout: 3000
  },
  action
) => {
  switch (action.type) {
    case "NOTIFY__SHOW_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length,
            visible: true,
            ...action.payload
          }
        ]
      };
    case "NOTIFY__HIDE_MESSAGE":
      return {
        ...state,
        messages: state.messages.splice(action.id, 1),
        count: state.count > 0 ? state.count - 1 : 0
      };
    default:
      return state;
  }
};
