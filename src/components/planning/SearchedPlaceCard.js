import React from 'react';
import { Button, Card, Header, Label } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router';
import { tripPlanningUrl } from '../../config/routes';
import Rating from './Rating';
import AddToPlanPopup from '../../containers/planning/AddToPlanPopup';

const categoryMapping = {
  museum: 'muzeum',
  tourist_attraction: 'atrakcja turystyczna',
  synagogue: 'synagoga',
  point_of_interest: 'punkt zainteresowań',
};

function mapCategoriesToLabels(categories) {
  return categories.map(category => categoryMapping[category]).toString();

  //   (
  //   <Label key={key} tag>
  //     {category}
  //   </Label>
  // ));
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
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{categoriesLabels}</Card.Meta>
        <Card.Meta>Adres: {address}</Card.Meta>
        <Card.Meta>Przedział cen: {priceCategory}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={() =>
            history.push(
              `${tripPlanningUrl(id)}/search/${place_id}/${
                photos && photos.length ? photos[0].photo_reference : ''
              }`
            )
          }
          basic
          floated="left"
        >
          Więcej
        </Button>
        <AddToPlanPopup placeId={place_id} position="top right">
          <Button basic floated="right" color="green">
            Dodaj do planu
          </Button>
        </AddToPlanPopup>
      </Card.Content>
    </Card>
  );
};

export default SearchedPlaceCard;
