// Function to create a book element
function createBookElement(title, authors, categories, user, image_url) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');

  const imageElement = document.createElement('img');
  imageElement.src = image_url;
  imageElement.alt = title;
  bookElement.appendChild(imageElement);

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  bookElement.appendChild(titleElement);

  const authorElement = document.createElement('p');
  authorElement.textContent = `Author: ${authors.join(', ')}`;
  bookElement.appendChild(authorElement);

  const genreElement = document.createElement('p');
  genreElement.textContent = `Genre: ${categories.join(', ')}`;
  bookElement.appendChild(genreElement);

  const userElement = document.createElement('p');
  userElement.textContent = `User: ${user}`;
  bookElement.appendChild(userElement);

  return bookElement;
}

// Function to perform the search
async function performSearch(query) {
  try {
    console.log('Performing search:', query);
    const response = await fetch(`/api/search?searchbook=${query}`);
    if (response.ok) {
      const searchResults = await response.json();
      displaySearchResults(searchResults);
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to fetch search results');
  }
}

// Function to display the search results
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  searchResultsContainer.innerHTML = '';

  if (results && results.length > 0) {
    results.forEach((item) => {
      const { volumeInfo } = item;
      const { title, authors, categories, imageLinks } = volumeInfo;
      const bookElement = createBookElement(title, authors, categories, '', imageLinks?.thumbnail || '');
      searchResultsContainer.appendChild(bookElement);
    });
  } else {
    const noResultsElement = document.createElement('p');
    noResultsElement.textContent = 'No results found.';
    searchResultsContainer.appendChild(noResultsElement);
  }
}

// Function to perform autocomplete
async function performAutocomplete(query) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (response.ok) {
      const autocompleteResults = await response.json();
      displayAutocompleteResults(autocompleteResults);
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to fetch autocomplete results');
  }
}

// Function to display the autocomplete results
function displayAutocompleteResults(results) {
  const autocompleteResultsContainer = document.getElementById('autocompleteResultsContainer');
  autocompleteResultsContainer.innerHTML = '';

  if (results.length > 0) {
    results.forEach((result) => {
      const optionElement = document.createElement('option');
      optionElement.value = result;
      autocompleteResultsContainer.appendChild(optionElement);
    });
  }
}

// Add an event listener to the search input field
const searchInput = document.getElementById('searchbook');
searchInput.addEventListener('input', function () {
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    performAutocomplete(searchQuery);
  }
});

// Add an event listener to the search form
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const selectedOption = document.getElementById('autocompleteResultsContainer').value;
  let searchQuery = searchInput.value.trim();
  if (selectedOption) {
    searchQuery = selectedOption;
  }

  if (!searchQuery) {
    alert('Please enter a search query');
    return;
  }

  performSearch(searchQuery); // Call the function to perform the search
});

// Add an event listener to the search form
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const searchQuery = document.getElementById('searchbook').value.trim();

  if (!searchQuery) {
    alert('Please enter a search query');
    return;
  }

  performSearch(searchQuery); // Call the function to perform the search
});
