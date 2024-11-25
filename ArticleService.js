/**
 *
 *getArticleList : page, pageSize, keyword부분
 */

export async function getProductList(page, pageSize, keyword) {
  const res = await fetch(
    `https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error!", error);
      throw new Error("데이터를 불러오는데 실패했습니다.");
    });

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

/**
 *
 *getArticle : 그냥 GET메서드
 */

export async function getArticle(id) {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      return res.json();
    })
    .catch((error) => {
      console.log("Error!", error);
      throw new Error("데이터를 불러오는데 실패했습니다.");
    });
}

/**
 *
 *createArticle : title, content, image
 */

export async function createArticle(title, content, image) {
  const res = await fetch("https://sprint-mission-api.vercel.app/articles", {
    method: "POST",
    body: JSON.stringify({ title, content, image }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error!", error);
      throw new Error("데이터를 불러오는데 실패했습니다.");
    });
}

/**
 *
 *patchArticle : 그냥 PATCH메서드
 */

export async function patchArticle() {
  const res = await fetch("https://sprint-mission-api.vercel.app/articles", {
    method: "PATCH",
    body: JSON.stringify({ title, content, image }),
    headers: {
      "content-type": "applocation/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error!", error);
      throw new Error("데이터를 불러오는데 실패했습니다.");
    });
}

/**
 *
 *deleteArticle : 그냥 DELETE메서드
 */

export async function deleteArticle() {
  const res = await fetch("https://sprint-mission-api.vercel.app/articles", {
    method: "DELET",
    body: JSON.stringify({ title, content, image }),
    headers: {
      "content-type": "applocation/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error!", error);
      throw new Error("데이터를 불러오는데 실패했습니다.");
    });
}
