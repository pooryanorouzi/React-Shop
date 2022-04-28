import http from "services/http.service";

// export async function getAllProducts() {
//   try {
//     const response = await http.get("/products");
//     // console.log({
//     //   data: response.data,
//     //   total: +response.headers["x-total-count"],
//     // });
//     // console.log(response.data.length);
//     return { data: response.data, total: response.data.length };
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

// page && limit
//   ? await http.get(`/products?_page=${page}&_limit=${limit}`)
//   : await http.get(`/products`);

export async function getProducts(page, limit) {
  try {
    if (page === "all" && limit === "all") {
      const response = await http.get("/products");
      return { data: response.data, total: response.data.length };
    } else {
      const response = await http.get(
        `/products?_page=${page}&_limit=${limit}`
      );
      return { data: response.data, total: response.headers["x-total-count"] };
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await http.delete(`/products/${id}`);
    return { data: response.data, total: response.headers["x-total-count"] };
  } catch (error) {
    return error;
  }
}

export async function getProd(id) {
  try {
    const response = await http.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function editProducts(id, data) {
  try {
    const response = await http.patch(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function sendProductDataToServer(data) {
  try {
    const resp = await http.post("/products", data);
    return resp.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
