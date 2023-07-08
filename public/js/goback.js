function goBackToHome() {
    var currentURL = window.location.href;
    var homeURL = 'http://example.com'; // Replace with your home page URL

    if (currentURL !== homeURL) {
      window.history.go(-1);
    } else {
      window.location.href = homeURL;
    }
  }