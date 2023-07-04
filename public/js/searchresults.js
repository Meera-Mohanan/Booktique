async function newReviewHandler(event) {
    event.preventDefault();
  
    const search = document.querySelector('#books').value.trim();
    if (!search) {
      alert('Please enter something in the field first');
      return;
    }
  
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
      if (response.ok) {
        const data = await response.json();
        const searchResults = data.items.slice(0, 5);
  
        const searchResultsContainer = document.querySelector('#searchResults');
        searchResultsContainer.innerHTML = '';
  
        searchResults.forEach((item) => {
          const { title, authors, imageLinks } = item.volumeInfo;
          const bookElement = createBookElement(title, authors, imageLinks);
          searchResultsContainer.appendChild(bookElement);
        });
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log('Error:', error.message);
      alert('Failed to fetch search results');
    }
  }
  
  function createBookElement(title, authors, imageLinks) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('search-item');
  
    const imageElement = document.createElement('img');
    imageElement.src = imageLinks?.thumbnail || 'placeholder-image.jpg';
    imageElement.alt = title;
  
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
  
    const authorsElement = document.createElement('p');
    authorsElement.textContent = authors ? authors.join(', ') : 'Unknown Author';
  
    bookElement.appendChild(imageElement);
    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorsElement);
  
    return bookElement;
  }
  