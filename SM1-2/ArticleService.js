// ArticleService.js

const BASE_URL = 'https://sprint-mission-api.vercel.app/articles';

// Fetch articles list
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
    return fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        .then((response) => {
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => console.error('Failed to fetch article list:', error));
}

// Fetch a single article by ID
export function getArticle(id) {
    return fetch(`${BASE_URL}/${id}`)
        .then((response) => {
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => console.error('Failed to fetch article:', error));
}

// Create a new article
export function createArticle(title, content, image) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image }),
    })
        .then((response) => {
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => console.error('Failed to create article:', error));
}

// Update an existing article
export function patchArticle(id, data) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => console.error('Failed to update article:', error));
}

// Delete an article by ID
export function deleteArticle(id) {
    return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => console.error('Failed to delete article:', error));
}
