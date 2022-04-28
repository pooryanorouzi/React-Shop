import http from "services/http.service";

export async function getCategories () {
    try {
        const response = await http.get(`/category`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}