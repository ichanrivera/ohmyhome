import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export const PropertyCard = ({ imgURL, name, address, price }) => {
  return (
    <Card fluid>
      <img alt='' height={250} src={imgURL} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span>{address}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Icon name='dollar' />
        {price}
      </Card.Content>
    </Card>
  );
};

export default PropertyCard;
