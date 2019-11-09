import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Label } from 'semantic-ui-react';

const ExplorePlaces = props => {
  const { places } = props;

  if (places) {
    let placesList = places.map((plan, key) => {
      const { title, category, vicinity, openingHours } = plan;

      return (
        <Card fluid key={key} style={{ margin: '2' }}>
          <Card.Content>
            <Card.Header>
              {title} <Label tag>{category.title}</Label>
            </Card.Header>
            <Card.Meta>{vicinity}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Button.Group>
              <Button basic color="green">
                Dodaj do planu
              </Button>
              <Button basic color="red">
                Odrzuć
              </Button>
            </Button.Group>
          </Card.Content>
        </Card>
      );
    });
    return (
      <Card.Group style={{ height: '100%', overflowY: 'scroll' }}>
        {placesList}
      </Card.Group>
    );
  }

  return <div />;
};

const mapStateToProps = state => ({ ...state.explorePlaces });

export default connect(mapStateToProps)(ExplorePlaces);
