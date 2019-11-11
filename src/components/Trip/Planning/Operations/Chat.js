import React, { useEffect } from 'react';
import { Comment, Form } from 'semantic-ui-react';
import { AUTHENTICATION, REALTIME } from '../../../../actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

const Chat = props => {
  const { id } = useParams();

  useEffect(() => {
    const { currentUser, fetchCurrentUser } = props;
    if (!currentUser) {
      fetchCurrentUser();
    }
  });

  const sendMessage = event => {
    const { input, currentUser, stompClient, typeMessage } = props;
    if (input && stompClient) {
      const chatMessage = {
        content: input,
        sender: currentUser,
      };
      stompClient.send(
        `/app/${id}/chat.sendMessage`,
        {},
        JSON.stringify(chatMessage)
      );
    }
    typeMessage('');
    event.preventDefault();
  };

  const { messages, typeMessage, input } = props;

  let messagesViews = messages.map((message, key) => {
    const { sender, content } = message;
    return (
      <Comment key={key}>
        <Comment.Avatar src={sender.imageUrl} />
        <Comment.Content>
          <Comment.Author as="a">{sender.name}</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>{content}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  });

  return (
    <Comment.Group>
      {messagesViews}
      <Form onSubmit={sendMessage}>
        <Form.Group>
          <Form.Input
            placeholder="Napisz wiadomość..."
            name="message"
            value={input}
            onChange={(event, { value }) => typeMessage(value)}
          />
          <Form.Button content="Wyślij" />
        </Form.Group>
      </Form>
    </Comment.Group>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state.authentication;
  const { messages, input } = state.chat;
  const { stompClient } = state.websockets;
  return {
    currentUser,
    messages,
    input,
    stompClient,
  };
};

const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
  typeMessage: REALTIME.typeMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
