import React from 'react';
import { Image, List } from 'semantic-ui-react';
import AddMemberModal from './AddMemberModal';


import moment from 'moment';
import 'moment/locale/pl';

const Member = props => {
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



const MembersList = props => {


  let memberItems = props.memberships
    .sort((m1, m2) => m2.online - m1.online)
    .map((member, key) => {
      const { user, online, lastVisit } = member;
      return (
        <Member
          key={key}
          src={user.imageUrl}
          name={user.name}
          isOnline={online}
          lastVisit={lastVisit}
        />
      );
    });



  return (
    <List style={{ height: '100%', overflowY: 'scroll' }}>
      <List.Item>
        <AddMemberModal />
        Dodaj członka
      </List.Item>
      {memberItems}
    </List>
  );
};

export default MembersList;
