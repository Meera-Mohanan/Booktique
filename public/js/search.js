const searchInput = document.getElementById('searchbook');

const searchHandler = (event) => {
  if (event.key === 'Enter') {
    const searchText = searchInput.value.trim();
    if (searchText !== '') {
      // Redirect to the search route with the search query
      window.location.href = '/searchbyname?inputtext=' + encodeURIComponent(searchText);
      
    }
  }
};

searchInput.addEventListener('keydown', searchHandler);
