export const SHOW_NOTIFY_ACTION = (message, options) => ({
  type: "NOTIFY__SHOW_MESSAGE",
  payload: {
    message,
    timeout: 2000,
    ...options
  }
});
