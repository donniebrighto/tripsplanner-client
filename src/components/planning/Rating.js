import React from 'react';
import { Icon } from 'semantic-ui-react';

const Rating = props => {
  const { rating } = props;
  return (
    <span>
      {rating} <Icon name="star" size="small" color="yellow" inactive="true" />
    </span>
  );
};

export default Rating;
