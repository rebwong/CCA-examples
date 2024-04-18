const axios = require('axios');
const params = { headers : {'Authorization': `Bearer ${process.env.access_token}`, 'Content-Type': 'application/json'} }; 

exports.main = async (event, callback) => {  
  // Define all variables to be used
  let contactId = event.inputFields['hs_object_id']; // Get enrolled contact ID
  let event_owner = event.inputFields['most_recent_event_owner']; // Get the most recently created Event owner ID copied over
  
  let all_owners = [
    event.inputFields['owner_1'],
    event.inputFields['owner_2'],
    event.inputFields['owner_3'],
    event.inputFields['owner_4'],
    event.inputFields['owner_5'],
    event.inputFields['owner_6']
  ]; // store array of all existing owners on the contact

  let owner_present = all_owners.includes(event_owner.toString()); // convert to string so that we can search up the array
  
  console.log(owner_present); // output True or False to see if owner is already on contact
  
  function findBlank(array) {
    return array == null;
  }
  
	if (owner_present == true) {
      console.log("No action needed. Owner exists on Contact");
    }
    else {  

      // Find the owner field that is blank & prepare the field name for API call
      let index = all_owners.findIndex(findBlank) + 1; 
      let text1 = "owner_";
      let blank_owner = text1.concat(index);

      // Format API call
      let URL = "https://api.hubapi.com/crm/v3/objects/contacts/" + contactId;
      let body = { "properties": 
                  {
                    [blank_owner]: event_owner
                  }
                 };

      axios.patch(URL, JSON.stringify(body), params)
        .then(res => {
          console.log(res.data.properties[blank_owner]);  
          console.log("Added owner to the back");
      })
        .catch(error => {
          console.log(error);
          throw error.message;
         });
	}	

}
