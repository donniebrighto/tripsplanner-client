const registerClient = stompClient => ({
  type: 'REGISTER_CLIENT',
  stompClient,
});
const unregisterClient = () => ({
  type: 'UNREGISTER_CLIENT',
});

export const WEBSOCKETS_CONTEXT = {
  registerClient,
  unregisterClient,
};
