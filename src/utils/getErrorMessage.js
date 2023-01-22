export default function getErrorMessage(error) {
  console.log('error:', error);

  return (
    (error.response && error.response.data) ||
    'Something went wrong :(\nPlease reload the page.'
  );
}
