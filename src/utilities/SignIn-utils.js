import axios from "axios"

export const signIn = async (formData) => {
  let serverResponse = await axios
  ({
      method: "PUT",
      url: "users/signin",
      // route to user login
      data: formData
  });
  console.log(serverResponse);
return serverResponse;
}

export const getUserFromSession = async () => {
  let response = await axios('/session-info')
  console.log(response);
  // WE HAVE A SUCCESSFUL USER LOG IN
  if (response.data.session.passport) {
      let user = response.data.session.passport.user;
      return user;
  } else {
      return false
  }
}