const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json()) 
    .then(data => cities.push(...data));


function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // Here we will implement searching for City or States that match ${wordToMatch}
      // Below g is for global and i is for insensitive, will match upper and lower case
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex)  || place.state.match(regex);  
    })
}

// Can be used to convert a number to be comma deliniated number correctly, uses a regex expression
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi'); //g is for global and i is for case-insensitive matching
    // The .replace() method is used on place.city and place.state to replace occurrences of the input value with a highlighted version
    // using an HTML <span> element with the class "hl". The replace method takes two arguments: the regular expression (regex) and the replacement string (in this case, the highlighted version of the input value).
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`); 
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');  // .join('') will convert the return from an array with lots of items into a single string
  suggestions.innerHTML = html; // adds the returned html <li> elements and contained content to the .suggestions <ul>
}


  // Access the HTML search field and suggestions <ul> element
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

  // Add 2 types of event listener to the searchInput (class="search") field, that will update the suggestions displayed,
  // by calling the displayMatches function
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);


