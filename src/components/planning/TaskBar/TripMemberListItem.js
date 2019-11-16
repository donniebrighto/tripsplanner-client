import React from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import { Image, List } from 'semantic-ui-react';

const TripMemberListItem = props => {
  let status;
  if (props.isOnline) {
    status = (
      <span style={{ color: 'green' }}>
        <strong>Online</strong>
      </span>
    );
  } else {
    const date = moment(props.lastVisit).locale('pl');
    status = (
      <span>Ostatnio online: {date.isValid() ? date.fromNow() : 'Brak'}</span>
    );
  }
  return (
    <List.Item>
      <Image avatar src={props.src} />
      <List.Content>
        <List.Header as="a">{props.name}</List.Header>
        <List.Description style={{ fontSize: '0.8em' }}>
          {status}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default TripMemberListItem;
