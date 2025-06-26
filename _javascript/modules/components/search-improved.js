/**
 * Improved search functionality with debouncing and better UX
 */

let searchTimeout;
const SEARCH_DELAY = 300; // milliseconds to wait before searching

export function initImprovedSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) {
    return;
  }

  // Override the default simple-jekyll-search behavior
  searchInput.addEventListener('input', function(e) {
    // Clear previous timeout
    clearTimeout(searchTimeout);
    
    const query = e.target.value.trim();
    
    // If search is empty, clear results immediately
    if (query === '') {
      searchResults.innerHTML = '';
      return;
    }
    
    // Only search if query is at least 2 characters long
    if (query.length < 2) {
      searchResults.innerHTML = '<p class="mt-5 text-muted">Type at least 2 characters to search...</p>';
      return;
    }
    
    // Debounce the search
    searchTimeout = setTimeout(() => {
      // Trigger the search manually if SimpleJekyllSearch is available
      if (window.SimpleJekyllSearchInstance) {
        window.SimpleJekyllSearchInstance.search(query);
      }
    }, SEARCH_DELAY);
  });
}
