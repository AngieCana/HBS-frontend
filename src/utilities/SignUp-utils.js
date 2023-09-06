import axios from "axios"
// utilities folder is for universal, reusable functions

export const signUp = async (formData) => {
 let serverResponse = await axios
 ({
   method: "POST",
   url: "/users/signup",
   // route to do signup
   data: formData 
 });
 return serverResponse;
}
