import React from 'react';
import { Button } from 'semantic-ui-react';
import { MAP } from '../../../../actions/map/creators';
import { connect } from 'react-redux';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 5px',
  width: '60px',
};

const FilterButton = props => {
  const { here, category, fetchPlaces } = props;
  const isLoading = category === here;
  const onClick = () => fetchPlaces(here);

  return (
    <div style={styles}>
      <div>
        <Button
          onClick={onClick}
          loading={isLoading}
          circular
          color={props.color}
          icon={props.icon}
          size="small"
        />
      </div>
      <span style={{ fontSize: '0.8em' }}>{props.name}</span>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.explorePlaces,
});

const mapDispatchToProps = {
  fetchPlaces: MAP.fetchPlaces,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton);
