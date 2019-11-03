import React from 'react';
import { Image, List } from 'semantic-ui-react';
import AddMemberModal from './AddMemberModal';

const Member = props => (
  <List.Item>
    <Image avatar src={props.src} />
    <List.Content>
      <List.Header as="a">{props.name}</List.Header>
      <List.Description style={{ fontSize: '0.8em' }}>
        {props.description}
      </List.Description>
    </List.Content>
  </List.Item>
);

const MembersList = props => {
  let memberItems = props.members.map((member, key) => (
    <Member
      key={key}
      src={member.imageUrl}
      name={member.name}
      description="Offline"
    />
  ));

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
