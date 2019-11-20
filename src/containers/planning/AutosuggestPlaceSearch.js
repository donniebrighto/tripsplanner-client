import React from 'react';
import { Search } from 'semantic-ui-react';
import { PLANNING } from '../../actions/planning';
import { connect } from 'react-redux';

const AutosuggestPlaceSearch = props => {
  const { suggestions, isLoading } = props;
  const results = suggestions.map((suggestion, key) => ({
    key: key,
    title: suggestion.title,
    description: suggestion.vicinity,
    price: suggestion.categoryTitle,
  }));
  return (
    <Search
      aligned="left"
      onSearchChange={(event, { value }) => props.fetchAutosuggestions(value)}
      results={results}
      loading={isLoading}
    />
  );
};

const mapStateToProps = state => ({
  suggestions: state.planning.placesAutosuggestion.suggestions,
  isLoading: state.planning.placesAutosuggestion.isLoading,
});

const mapDispatchToProps = {
  fetchAutosuggestions: PLANNING.PLACES_AUTOSUGGESTIONS.fetchAutosuggestions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutosuggestPlaceSearch);
