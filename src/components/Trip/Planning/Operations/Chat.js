import React, { useEffect } from 'react';
import { Comment, Form } from 'semantic-ui-react';
import { AUTHENTICATION, REALTIME } from '../../../../actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import moment from 'moment';
import 'moment/locale/pl';

const Chat = props => {
  const { id } = useParams();

  useEffect(() => {
    const {
      currentUser,
      fetchCurrentUser,
      messages,
      fetchTripMessages,
    } = props;
    if (!currentUser) {
      fetchCurrentUser();
    }
    if (!messages.length) {
      fetchTripMessages(id);
    }
  }, []);

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
    const { sender, content, createdAt } = message;
    const date = moment(createdAt).locale('pl');
    return (
      <Comment key={key}>
        <Comment.Avatar src={sender.imageUrl} />
        <Comment.Content>
          <Comment.Author as="a">{sender.name}</Comment.Author>
          <Comment.Metadata>
            <div>{date.fromNow()}</div>
          </Comment.Metadata>
          <Comment.Text>{content}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  });
  /*TODO - rozszerzenie widoku do 100% */
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <Comment.Group
        style={{
          height: 'calc(100% - 40px)',
          padding: '5',
          overflowY: 'scroll',
        }}
      >
        {messagesViews}
      </Comment.Group>
      <Form>
        <Form.Input
          onKeyPress={event => {
            event.key === 'Enter' && sendMessage(event);
          }}
          placeholder="Napisz wiadomość..."
          name="message"
          action={{
            icon: 'send',
            onClick: sendMessage,
          }}
          value={input}
          onChange={(event, { value }) => typeMessage(value)}
        />
      </Form>
    </div>
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
  fetchTripMessages: REALTIME.fetchTripMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
