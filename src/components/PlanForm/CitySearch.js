import React from 'react';
import {connect} from 'react-redux';
import {PLAN_FORM} from "../../actions";
import {Dropdown} from "semantic-ui-react";

const CitySearch = (props) => {
    const {onChange, minCharacters, value, suggestions, isLoading} = props;

    console.log("on change", onChange);

    return (
        <Dropdown
            placeholder='Wyszukaj miasto'
            fluid
            search
            selection
            value={value}
            options={suggestions}
            loading={isLoading}
            minCharacters={minCharacters}
            onChange={onChange}
            onSearchChange={
                (e, {searchQuery, minCharacters}) => props.suggest(searchQuery, minCharacters)
            }
        />
    );
};

const mapStateToProps = (state) => {
    const {suggestions, isLoading} = state.citySuggestion;
    return {
        suggestions,
        isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        suggest: (searchQuery, minCharacters) => {
            if (searchQuery.length < minCharacters){
                return;
            }
            dispatch(PLAN_FORM.cityAutocomplete(searchQuery));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);