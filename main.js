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


function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
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


