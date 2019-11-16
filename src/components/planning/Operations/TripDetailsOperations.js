import React from 'react';
import { Routes } from '../../../Routes';
import { planningRoutes } from '../../../config/routes';
import PlanningOperationsMenu from '../../navigation/PlanningOperationsMenu';

const TripDetailsOperations = () => {
  return (
    <React.Fragment>
      <div
        style={{
          height: 'calc(100% - 40px)',
          padding: '5px',
        }}
      >
        <Routes routes={planningRoutes} />
      </div>
      <PlanningOperationsMenu routes={planningRoutes} />
    </React.Fragment>
  );
};

export default TripDetailsOperations;
