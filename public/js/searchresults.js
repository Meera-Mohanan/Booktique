// Add an event listener to the search form
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const searchQuery = document.getElementById('searchbook').value.trim();

  if (!searchQuery) {
    alert('Please enter a search query');
    return;
  }

  performSearch(searchQuery); // Call the function to perform the search
});

// Function to perform the search
async function performSearch(query) {
  try {
    const response = await fetch(`/searchbyname?id=${query}`);
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

  if (results.length > 0) {
    results.forEach((item) => {
      const { title, authors } = item.volumeInfo;
      const bookElement = createBookElement(title, authors);
      searchResultsContainer.appendChild(bookElement);
    });
  } else {
    searchResultsContainer.innerHTML = '<p>No results found.</p>';
  }
}

// Function to create a book element
function createBookElement(title, authors) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('search-item');

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const authorsElement = document.createElement('p');
  authorsElement.textContent = authors ? authors.join(', ') : 'Unknown Author';

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorsElement);

  return bookElement;
}
