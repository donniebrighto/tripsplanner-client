import React from 'react';
import { Search } from 'semantic-ui-react';
import { PLANNING } from '../../actions/planning';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

const AutosuggestPlaceSearch = props => {
  const { id } = useParams();
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
      onResultSelect={(event, { result }) =>
        props.fetchAutosuggestionDetails(
          id,
          result.title,
          suggestions[result.key].position.join(',')
        )
      }
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
  fetchAutosuggestionDetails:
    PLANNING.PLACES_AUTOSUGGESTIONS.fetchAutosuggestionDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutosuggestPlaceSearch);
