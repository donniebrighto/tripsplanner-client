import React, { useEffect } from 'react';
import { Dropdown, Flag, Icon } from 'semantic-ui-react';
import { AUTHENTICATION } from '../../actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { tripPlanningUrl } from '../../config/routes';

function mapTripsToPlanItems(futureTrips) {
  if (!futureTrips) return;
  return futureTrips.map((trip, key) => {
    const { destination, id } = trip;
    return (
      <Dropdown.Item as={NavLink} to={tripPlanningUrl(id)} key={key}>
        <Flag name={destination.iso2flag} />
        {destination.label}
      </Dropdown.Item>
    );
  });
}

const CurrentTripsDropdownItem = props => {
  const { plan, futureTrips, fetchCurrentUser } = props;

  useEffect(() => {
    if (!futureTrips) {
      fetchCurrentUser();
    }
  });

  const planItems = mapTripsToPlanItems(futureTrips);

  return (
    <Dropdown
      trigger={
        <span>
          <Icon name={plan.icon} />
          {plan.text}
        </span>
      }
      item
      simple
    >
      <Dropdown.Menu>{planItems}</Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = state => ({
  futureTrips: state.authentication.futureTrips,
});

const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentTripsDropdownItem);
