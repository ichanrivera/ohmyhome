import axios from 'axios';

const fetchProperties = async (query) => {
  try {
    console.log('request', query);
    const { type, minimum, maximum, offset, limit } = query;
    const properties = await axios.get(
      `https://m9ojazlunf.execute-api.ap-southeast-1.amazonaws.com/test?limit=${limit}&offset=${offset}&type=${type}&min=${minimum}&max=${maximum}`
    );

    return properties.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchProperties;
