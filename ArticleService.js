const article = 'https://sprint-mission-api.vercel.app/articles';

// getArticleList
export function getArticleList(page, pageSize, keyword) {
  return fetch(`${article}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch article list: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Article List:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in getArticleList:', error.message);
    });
}

// getArticle
export function getArticle(id) {
  return fetch(`${article}/${id}`, {
    method: 'GET'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Article:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in getArticle:', error.message);
    });
}


// createArticle
export function createArticle(title, content, image) {
  return fetch(article, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to create article: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Created Article:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in createArticle:', error.message);
    });
}

// patchArticle
export function patchArticle(id, data) {
  return fetch(`${article}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update article: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Updated Article:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in patchArticle:', error.message);
    });
}

// deleteArticle
export function deleteArticle(id) {
  return fetch(`${article}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete article: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Deleted Article:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in deleteArticle:', error.message);
    });
}
