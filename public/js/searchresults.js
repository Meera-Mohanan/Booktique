    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchOption = document.getElementById('search-option');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const query = searchInput.value.trim();
      const option = searchOption.value;

      if (query === '') {
        return;
      }

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${option}:${query}`);
        const data = await response.json();

        displaySearchResults(data.items);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch search results');
      }
    });

    function displaySearchResults(items) {
      searchResults.innerHTML = '';

      if (items.length > 0) {
        items.forEach((item) => {
          const bookTitle = item.volumeInfo.title;
          const bookAuthor = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author';

          const bookElement = document.createElement('div');
          bookElement.innerHTML = `
            <h3>${bookTitle}</h3>
            <p>Author: ${bookAuthor}</p>
          `;

          searchResults.appendChild(bookElement);
        });
      } else {
        searchResults.innerHTML = '<p>No results found.</p>';
      }
    }