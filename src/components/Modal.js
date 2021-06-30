import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'semantic-ui-react';

export const FilterModal = ({
  open,
  onClose,
  reset,
  onFilterChange,
  filters,
}) => {
  console.log(filters);
  return (
    <Modal size='tiny' open={open} closeIcon onClose={onClose}>
      <Modal.Header>Filter Properties</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group grouped>
            <label>Price Range: </label>
            <Form.Field>
              <Input
                fluid
                type='number'
                name='minimum'
                value={filters.minimum}
                onChange={onFilterChange}
                icon='dollar'
                iconPosition='left'
                placeholder='Minimum'
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                type='number'
                name='maximum'
                value={filters.maximum}
                onChange={onFilterChange}
                icon='dollar'
                iconPosition='left'
                placeholder='Maximum'
              />
            </Form.Field>
          </Form.Group>
          <Form.Group grouped>
            <label>Property Type:</label>
            <Form.Field>
              <Radio
                label='Studio'
                name='type'
                value='0'
                checked={filters && filters.type === '0'}
                onChange={onFilterChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='1 Bedroom'
                name='type'
                value='1'
                checked={filters && filters.type === '1'}
                onChange={onFilterChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='2 Bedrooms'
                name='type'
                value='2'
                checked={filters && filters.type === '2'}
                onChange={onFilterChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='3 Bedrooms'
                name='type'
                value='3'
                checked={filters && filters.type === '3'}
                onChange={onFilterChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='4 or more bedrooms'
                name='type'
                value='4'
                checked={filters && filters.type === '4'}
                onChange={onFilterChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={onClose} positive>
          Apply
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FilterModal;
