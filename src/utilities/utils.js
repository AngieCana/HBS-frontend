export const getError = (error) => {
  return error.response && error.response.data.message
  ? error.response.data.message
  : error.message;
}

//accepts error parameter and checks if an error response exists and if there is a message that exists. It fetches the error from the backend to say that product is not found.