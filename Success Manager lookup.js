// Use the Axios client to make API calls
const axios = require('axios');

// Define the Private App token to make the API calls
const params = { headers : {'Authorization': `Bearer ${process.env.CCA_token}`, 'Content-Type': 'application/json'} };


exports.main = async (event, callback) => {
  
 // Pull in amount + Secondary Owner field from the enrolled deal
  const amount = event.inputFields['amount'];
  const owner_id = event.inputFields['partner_user'];
  
  //create request URL with parameters based on Custom Object API. idProperty is where the unique ID is stored on the Custom Object.
  let URL = "https://api.hubapi.com/crm/v3/objects/p6137087_success_managers/" + owner_id + "?properties=n2024_target&archived=false&idProperty=csm_user_id";

  
  // Make authenticated API call to search up the Succeess Manager records based on the success owner field
  axios.get(URL, params)
    .then(resp => {
    
    // Save the "2024 target value" from the returned Success Manager record in a variable + calculate result
      let target = resp.data.properties.n2024_target;
      let result = amount / target;
    
      callback({
        outputFields: {
          NRR: result
        }
      });
    })
    .catch( error => {
    // Notify if error arises due to missing owner name
    console.log("Owner not found in Success Manager list.", error.message);
    throw error;
  });

  

  
}
