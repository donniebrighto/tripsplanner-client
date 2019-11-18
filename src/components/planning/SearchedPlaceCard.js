import React from 'react';
import { Button, Card, Header, Icon, Label } from 'semantic-ui-react';

function mapCategoriesToLabels(categories) {
  return categories.map((category, key) => (
    <Label key={key} tag>
      {category}
    </Label>
  ));
}

const SearchedPlaceCard = props => {
  const {
    name,
    address,
    rating,
    categories,
    priceCategory,
    user_ratings_total,
  } = props;
  const categoriesLabels = mapCategoriesToLabels(categories);
  return (
    <Card fluid>
      <Card.Content>
        <Header as="h5" style={{ float: 'right', margin: '0' }}>
          <span>
            {rating}{' '}
            <Icon name="star" size="tiny" color="yellow" inactive="true" />
          </span>
          <Header.Subheader>Liczba ocen: {user_ratings_total}</Header.Subheader>
        </Header>
        <Card.Header>
          {name} {categoriesLabels}
        </Card.Header>
        <Card.Meta>Adres: {address}</Card.Meta>
        <Card.Meta>Przedział cen: {priceCategory}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button basic floated="left">
          Więcej
        </Button>
        <Button basic floated="right" color="green">
          Dodaj do planu
        </Button>
      </Card.Content>
    </Card>
  );
};

export default SearchedPlaceCard;
