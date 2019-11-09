import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

const ExplorePlaces = props => {
  const { places } = props;

  if (places) {
    let placesList = places.map((plan, key) => (
      <Card
        fluid
        key={key}
        style={{ margin: '2' }}
        color="red"
        header={plan.title}
      />
    ));
    return (
      <Card.Group
        style={{ height: '481px', padding: '0 20 5 3', overflowY: 'scroll' }}
      >
        {placesList}
      </Card.Group>
    );
  }

  return <div />;
};

const mapStateToProps = state => ({ ...state.explorePlaces });

export default connect(mapStateToProps)(ExplorePlaces);
