// Add an event listener to the search form
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the search query from the input field
  const searchQuery = document.getElementById('searchInput').value.trim();

  if (!searchQuery) {
    alert('Please enter a search query');
    return;
  }

  performSearch(searchQuery); // Call the function to perform the search
});

// Function to perform the search
// API key for Google Books API
const apiKey = 'AIzaSyDAyeDqH5UigJe1-nVRvV-GLRm0MurjIgs';

// Function to perform the search
async function performSearch(query) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    const response = await fetch(url);
    if (response.ok) {
      const searchResults = await response.json();
      displaySearchResults(searchResults.items);
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
      const { title, author } = item.volumeInfo;
      const bookElement = createBookElement(title, author);
      searchResultsContainer.appendChild(bookElement);
    });
  } else {
    searchResultsContainer.innerHTML = '<p>No results found.</p>';
  }
}
