async function getArticleList(page=1, pageSize=10, keyword="") {
    const url = `https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
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
  
  async function getArticle(id) {
    const url = `https://sprint-mission-api.vercel.app/articles/${id}`;
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
  
async function createArticle(title, content, image) { 
    const url = "https://sprint-mission-api.vercel.app/articles";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({title, content, image}),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create article: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log("Article created successfully:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  async function patchArticle(id,title, content, image) { 
    const url = `https://sprint-mission-api.vercel.app/articles/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({title, content, image}),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to patch article: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log("Article patched successfully:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  async function deleteArticle(id) { 
    const url = `https://sprint-mission-api.vercel.app/articles/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete article: ${response.status}`);
      }
  
      const result = await response.status; 
      console.log("Article deleted successfully:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  export { getArticleList, getArticle, createArticle, patchArticle, deleteArticle };