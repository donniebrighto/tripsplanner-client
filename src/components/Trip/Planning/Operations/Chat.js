import React from 'react';
import { Comment, Form } from 'semantic-ui-react';
import { Stomp } from '@stomp/stompjs';
import { AUTHENTICATION, PLANNING } from '../../../../actions';
import { connect } from 'react-redux';

const wsEndpoint = 'ws://localhost:8080/ws';

class Chat extends React.Component {
  stompClient;
  id;

  constructor(props) {
    super(props);
    this.bindMethods(this);
    this.id = props.match.params.id;
    const sock = new WebSocket(wsEndpoint);
    this.stompClient = Stomp.over(sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  componentDidMount() {
    const { currentUser, fetchCurrentUser } = this.props;
    if (!currentUser) {
      fetchCurrentUser();
    }
  }

  bindMethods(context) {
    this.onConnected = this.onConnected.bind(context);
    this.onMessageReceived = this.onMessageReceived.bind(context);
    this.onError = this.onError.bind(context);
    this.sendMessage = this.sendMessage.bind(context);
  }

  onConnected = () => {
    this.stompClient.subscribe(
      `/topic/${this.id}/chat`,
      this.onMessageReceived
    );
  };

  onMessageReceived = payload => {
    const { addMessage } = this.props;
    const message = JSON.parse(payload.body);
    addMessage(message);
  };

  onError = error => {
    console.log(error);
  };

  sendMessage = event => {
    const { input, currentUser } = this.props;
    if (input && this.stompClient) {
      const chatMessage = {
        content: input,
        sender: currentUser
      };
      this.stompClient.send(
        `/app/${this.id}/chat.sendMessage`,
        {},
        JSON.stringify(chatMessage)
      );
    }
    event.preventDefault();
  };

  render() {
    const { messages, typeMessage } = this.props;

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
        <Form onSubmit={this.sendMessage}>
          <Form.Group>
            <Form.Input
              placeholder="Napisz wiadomość..."
              name="message"
              onChange={(event, { value }) => typeMessage(value)}
            />
            <Form.Button content="Wyślij" />
          </Form.Group>
        </Form>
      </Comment.Group>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.authentication;
  const { messages, input } = state.chat;
  return {
    currentUser,
    messages,
    input,
  };
};

const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
  addMessage: PLANNING.addMessage,
  typeMessage: PLANNING.typeMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
