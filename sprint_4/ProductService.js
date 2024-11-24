async function getProductList(page = 1, pageSize = 10, keyword = "") {
    const url = `https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
}

async function getProduct(id) {
    const url = `https://sprint-mission-api.vercel.app/products/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
}

async function createProduct({ name, description, price, manufacturer, tags, images }) { 
    const url = "https://sprint-mission-api.vercel.app/products";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ name, description, price, tags, images }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create article: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log("Product created successfully:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
}

async function patchProduct({ id, name, description, price, manufacturer, tags, images }) { 
    const url = `https://sprint-mission-api.vercel.app/products/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ name, description, price, manufacturer, tags, images }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to patch article: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log("Product patched successfully:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
}


async function deleteProduct(id) { 
    const url = `https://sprint-mission-api.vercel.app/products/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete Product: ${response.status}`);
      }
  
      const result = await response.status; 
      console.log("Product deleted successfully:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
}

export { getProductList, getProduct, createProduct, patchProduct, deleteProduct };