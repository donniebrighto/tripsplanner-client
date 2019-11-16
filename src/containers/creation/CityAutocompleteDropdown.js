import React from 'react';
import { connect } from 'react-redux';
import { CREATION } from '../../actions';
import { Dropdown } from 'semantic-ui-react';

const CityAutocompleteDropdown = props => {
  const { onChange, minCharacters, suggestions, isLoading } = props;

  return (
    <Dropdown
      placeholder="Wyszukaj miasto"
      fluid
      search
      selection
      options={suggestions}
      loading={isLoading}
      minCharacters={minCharacters}
      onChange={onChange}
      onSearchChange={(e, { searchQuery, minCharacters }) =>
        props.suggest(searchQuery, minCharacters)
      }
    />
  );
};

const mapStateToProps = state => {
  const { suggestions, isLoading } = state.creation.cityAutocomplete;
  return {
    suggestions,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    suggest: (searchQuery, minCharacters) => {
      if (searchQuery.length < minCharacters) {
        return;
      }
      dispatch(CREATION.cityAutocomplete(searchQuery));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityAutocompleteDropdown);
