exports.main = async (event, callback) => {

 const phone = event.inputFields['phone']; 
 const numDigits = String(phone).length;
  
  let outcome = "";
  let formattedNumber ="";
  let prefix="+61";
  
  if (numDigits === 9 || numDigits === 10 ) {
    formattedNumber = prefix.concat(phone);
    outcome = "Success";
    console.log(formattedNumber);
  } else {
    outcome = "Not formatted";
    console.log(formattedNumber);
  }
  
  
  callback({
    outputFields: {
      outcome: outcome,
      formattedNumber: formattedNumber
    }
  });
}
