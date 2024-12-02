const product = 'https://sprint-mission-api.vercel.app/products';

// getProductList
export const getProductList = async (page, pageSize, keyword) => {
  try {
    const response = await fetch(`${product}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product list: ${response.status}`);
    }
    const data = await response.json();
    console.log('Product List:', data);
    return data;
  } catch (error) {
    console.error('Error in getProductList:', error.message);
    throw error;
  }
};

// getProduct
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${product}/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    const data = await response.json();
    console.log('Product:', data);
    return data;
  } catch (error) {
    console.error('Error in getProduct:', error.message);
    throw error;
  }
};

// createProduct
export const createProduct = async (name, description, price, tags, images) => {
  try {
    const response = await fetch(product, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.status}`);
    }
    const data = await response.json();
    console.log('Created Product:', data);
    return data;
  } catch (error) {
    console.error('Error in createProduct:', error.message);
    throw error;
  }
};

// patchProduct
export const patchProduct = async (id, updateData) => {
  try {
    const response = await fetch(`${product}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`);
    }
    const data = await response.json();
    console.log('Updated Product:', data);
    return data;
  } catch (error) {
    console.error('Error in patchProduct:', error.message);
    throw error;
  }
};

// deleteProduct
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${product}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.status}`);
    }
    const data = await response.json();
    console.log('Deleted Product:', data);
    return data;
  } catch (error) {
    console.error('Error in deleteProduct:', error.message);
    throw error;
  }
};
