// ProductService.js

const BASE_URL = 'https://sprint-mission-api.vercel.app/products';

// Fetch product list
export async function getProductList(page = 1, pageSize = 10, keyword = '') {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch product list:', error);
    }
}

// Fetch a single product by ID
export async function getProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
}

// Create a new product
export async function createProduct(name, description, price, tags, images) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, price, tags, images }),
        });
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to create product:', error);
    }
}

// Update an existing product
export async function patchProduct(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to update product:', error);
    }
}

// Delete a product by ID
export async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to delete product:', error);
    }
}
