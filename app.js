const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv['address'], (errorMessage, result) => {
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(result.address);
    weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult) =>{
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`The temperature is ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}.`);
      }
    });
  }
});
