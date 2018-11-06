const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=YU78i8qYTgvdUmalTyiPOdD9wNWKt417&location=${encodedAddress}`,
      json:true
    }, (error, response, body) => {
      if(error){
        reject('Unable to connect to Mapquest servers.')
      }else{
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });

};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
