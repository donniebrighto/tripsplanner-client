const addMessage = message => ({
  type: 'ADD_MESSAGE',
  message,
});
const typeMessage = input => ({
  type: 'TYPE_MESSAGE',
  input,
});

export const PLANNING = {
  addMessage,
  typeMessage,
};
