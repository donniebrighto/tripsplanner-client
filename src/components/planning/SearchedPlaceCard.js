import React from 'react';
import { Button, Card, Header, Label } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router';
import { tripPlanningUrl } from '../../config/routes';
import Rating from './Rating';

function mapCategoriesToLabels(categories) {
  return categories.map((category, key) => (
    <Label key={key} tag>
      {category}
    </Label>
  ));
}

const SearchedPlaceCard = props => {
  const history = useHistory();
  const { id } = useParams();
  const {
    place_id,
    name,
    address,
    rating,
    categories,
    priceCategory,
    user_ratings_total,
    photos,
  } = props;
  const categoriesLabels = mapCategoriesToLabels(categories);
  return (
    <Card fluid>
      <Card.Content>
        <Header
          as="h4"
          style={{ float: 'right', margin: '0', textAlign: 'center' }}
        >
          <Rating rating={rating} />
          <Header.Subheader>Liczba ocen: {user_ratings_total}</Header.Subheader>
        </Header>
        <Card.Header>
          {name} {categoriesLabels}
        </Card.Header>
        <Card.Meta>Adres: {address}</Card.Meta>
        <Card.Meta>Przedział cen: {priceCategory}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={() =>
            history.push(
              `${tripPlanningUrl(id)}/search/${place_id}/${
                photos.length ? photos[0].photo_reference : ''
              }`
            )
          }
          basic
          floated="left"
        >
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
