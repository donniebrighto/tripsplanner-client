const registerClient = stompClient => ({
  type: 'REGISTER_CLIENT',
  stompClient,
});
const unregisterClient = () => ({
  type: 'UNREGISTER_CLIENT',
});
const addMessage = message => ({
  type: 'ADD_MESSAGE',
  message,
});
const typeMessage = input => ({
  type: 'TYPE_MESSAGE',
  input,
});
const notify = notification => ({
  type: 'NOTIFY',
  notification,
});

export const REALTIME = {
  registerClient,
  unregisterClient,
  addMessage,
  typeMessage,
  notify,
};

