import React from 'react';
import { Card, Flag, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DEFAULT_PICTURE =
  'https://www.psy.pl/wp-content/uploads/2018/06/shutterstock_310582886-e1529659041281-864x575.jpg';

const getImageUrl = image => {
  if (image) {
    return `http://localhost:8080/image/${image.id}`;
  }
  return DEFAULT_PICTURE;
};

const TripCard = props => {
  const imageUrl = getImageUrl(props.image);

  let tags;
  if (props.tags) {
    tags = props.tags.map((tag, key) => (
      <Label key={key} color="teal">
        {tag.value}
      </Label>
    ));
  }

  return (
    <Card link as={Link} to={`/trips/${props.id}`}>
      <Image src={imageUrl} />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>
          <Icon name="clock outline" />
          <span>{props.durationInDays} dni</span>
        </Card.Meta>
        <Card.Description>
          <Flag name={props.destination.iso2flag} /> {props.destination.label}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>Tagi: {tags}</Card.Content>
    </Card>
  );
};

export default TripCard;
