exports.main = async (event, callback) => {
  /*****
    Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
  *****/
  const uploadLinks = event.inputFields['file_upload'];
 
	// Function to split string of links
	 function splitStr(str) {
		return str.split(";");
	}
	
	// Store split links in an array 
	const array = splitStr(uploadLinks);
	  
	// Prepare HTML blob
	let innerbody = "";
	
	for (let i = 0; i < array.length; i++) {
		innerbody += "<li> <a href='"  + array[i] + "'>" + "File " + [i+1] + "<\a></li>";
	}  
	  
	const HTMLresult = "<ul>" + innerbody + "</ul>"
	  	
	console.log(HTMLresult);

  /*****
    Use the callback function to output data that can be used in later actions in your workflow.
  *****/
callback({
    outputFields: {
      splitHTML: HTMLresult
    }
  }); 
}
