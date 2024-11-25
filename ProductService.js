/**
 *
 *getProductList : page, pageSize, keyword부분
 */

export async function getProductList(page, pageSize, keyword) {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );

    if (!res.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error!", error);
  }
}

/**
 *
 *getProduct : GET메서드
 */

export async function getProduct(id) {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`
    );

    if (!res.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error!!", error);
  }
}

/**
 *
 *createProduct POST메서드 : name, description, price, tags, images부분
 */

export async function createProduct(name, description, price, tags, images) {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/products", {
      method: "POST",
      body: JSON.stringify({ name, description, price, tags, images }),
      headers: {
        "content-type": "applocation/json",
      },
    });

    if (!res.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error!!!", error);
  }
}

// PATCH메서드
export async function patchProduct() {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/products", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error!!!", error);
  }
}
// DELETE메서드
export async function deleteProduct() {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/products", {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error!!!", error);
  }
}
