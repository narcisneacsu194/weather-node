const yargs = require('yargs');
const axios = require('axios');
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=YU78i8qYTgvdUmalTyiPOdD9wNWKt417&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  console.log(JSON.stringify(response.data, undefined, 2));

  var address = response.data.results[0].providedLocation.location;
  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;

  var weatherUrl = `https://api.darksky.net/forecast/c07db99be2e951c9419f88087bd8c8c4/${lat},${lng}`;
  console.log('Address: ', address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch((error) => {
  if(error.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers.');
  }
});
