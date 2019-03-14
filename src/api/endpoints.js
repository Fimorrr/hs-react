const host = 'http://localhost:9000/api/v1';

export default {
  getRedditUrl: ({ redditName = 'reactjs' } = { redditName: '' }) => `${host}/${redditName}.json`,
  getUrl: url => `${host}/${url}`,
};
