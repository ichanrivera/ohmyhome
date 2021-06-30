import React, { useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import './styles/styles.scss';
import { Grid, Header, Icon, Divider, Message } from 'semantic-ui-react';
import PropertyCard from './components/PropertyCard';

import fetchProperties from './services/fetchProperties';
import FilterModal from './components/Modal';

const filterInitialState = {
  minimum: '',
  maximum: '',
  type: '',
  offset: '',
  limit: '',
};

const sampleData = {
  id: 29,
  title: 'Johnson',
  description: '0 Golf Park',
  price: 776479,
  imageurl: 'https://picture.omh.app/0ddcbaad-f1db-4a30-952c-8e6c39c86bec',
  type: 4,
};

const App = () => {
  const [totalPropertiesCount, setTotalPropertiesCount] = useState('');
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState(filterInitialState);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Set Page Data eg. Total page, property details
  const populatePageData = async (query) => {
    const response = await fetchProperties(query);
    if (response) {
      setTotalPropertiesCount(response.totalProperties);
      setProperties(response.list);
    }
  };

  // call function in useEffect
  useEffect(() => {
    populatePageData();
  }, []);

  //request on filter change
  useEffect(() => {
    const getFilteredProperties = async () => {
      const response = await populatePageData(filters);
      return response;
    };
    getFilteredProperties();
  }, [filters]);

  const handleChange = (event, { value, name }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const onScrollBottom = async () => {
    setIsLoading(true);

    const query = {
      ...filters,
      limit: 4,
    };
    const response = await fetchProperties(query);
    if (response) {
      setProperties([...properties, ...response.list]);
      setIsLoading(false);
    }
  };
  useBottomScrollListener(onScrollBottom);

  const toggleFilterModal = () => setOpenFilter(!openFilter);

  const resetFilter = () => {
    setFilters(filterInitialState);
  };

  return (
    <div className='App'>
      <h1>Properties</h1>
      <Divider />

      <Header className='filter' as='h3' onClick={toggleFilterModal}>
        <Icon name='filter' />
        Filter
      </Header>

      <Divider />
      <Grid stackable centered columns={4}>
        <Grid.Column width={14}>
          <h1>Search Properties</h1>
          <h4>Total Properties: {totalPropertiesCount}</h4>

          <Grid stackable doubling columns={4}>
            {totalPropertiesCount > 0 &&
              properties.map((property) => (
                <Grid.Column centered>
                  <PropertyCard
                    price={property.price}
                    imgURL={property.imageurl}
                    name={property.title}
                    address={property.description}
                  />
                </Grid.Column>
              ))}
            {totalPropertiesCount <= 0 && <div>No properties available</div>}
          </Grid>
        </Grid.Column>
      </Grid>
      <FilterModal
        filters={filters}
        open={openFilter}
        reset={resetFilter}
        onFilterChange={handleChange}
        onClose={() => toggleFilterModal(false)}
      />

      {isLoading && (
        <Message icon>
          <Message.Content>
            <Icon name='circle notched' loading />
            <Message.Header>Loading</Message.Header>
            We are loading more properties for you.
          </Message.Content>
        </Message>
      )}
      {isLoading === false && (
        <Message icon>
          <Message.Content>
            <h3>Scroll down to view more properties.</h3>
          </Message.Content>
        </Message>
      )}
    </div>
  );
};

export default App;
