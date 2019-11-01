import React, { Component } from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
};

class SectionHeader extends Component {
  render() {
    const { title, subtitle, iconName, link } = this.props;

    return (
      <Segment style={styles}>
        <Header as="h2">
          <Icon name={iconName} />
          <Header.Content>
            {title}
            <Header.Subheader>{subtitle}</Header.Subheader>
          </Header.Content>
        </Header>
        {!!link && (
          <Link to={link.path}>
            <Button color="black">{link.text}</Button>
          </Link>
        )}
      </Segment>
    );
  }
}

export default SectionHeader;
