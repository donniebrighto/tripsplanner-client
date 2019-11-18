import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import SearchedPlaceCard from '../../components/planning/SearchedPlaceCard';

const mapGoogleTypesToCategories = types => {
  if (!types) {
    return [];
  }
  return types.slice(0, 2); // TODO
};

const mapPriceLevelToPriceCategory = price_level => {
  switch (price_level) {
    case 0:
      return 'Darmowe';
    case 1:
      return 'Tanio';
    case 2:
      return 'Umiarkowanie';
    case 3:
      return 'Drogo';
    case 4:
      return 'Bardzo drogo';
    default:
      return 'Brak danych';
  }
};

const SearchPlacesCardsContainer = props => {
  const { places } = props;

  const cardsProps = places.map(place => {
    return {
      ...place,
      address: place.vicinity,
      categories: mapGoogleTypesToCategories(place.types),
      priceCategory: mapPriceLevelToPriceCategory(place.price_level),
    };
  });

  const cards = cardsProps.map((cardProps, key) => (
    <SearchedPlaceCard {...cardProps} key={key} />
  ));

  return (
    <Card.Group style={{ height: '100%', overflowY: 'scroll' }}>
      {cards}
    </Card.Group>
  );
};

const mapStateToProps = state => ({ ...state.planning.placesSearch });

export default connect(mapStateToProps)(SearchPlacesCardsContainer);
