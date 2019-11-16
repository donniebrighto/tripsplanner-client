import React from 'react';
import { List } from 'semantic-ui-react';
import AddMemberModal from './AddMemberModal';
import MemberItem from './TripMemberListItem';

const TripMembersList = props => {
  let memberItems = props.memberships
    .sort((m1, m2) => m2.online - m1.online)
    .map((member, key) => {
      const { user, online, lastVisit } = member;
      return (
        <MemberItem
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

export default TripMembersList;
