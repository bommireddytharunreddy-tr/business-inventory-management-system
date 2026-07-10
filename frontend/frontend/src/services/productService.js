import api from "./api";

// Get all products
export const getProducts = () => api.get("/products");

// Create a new product
export const createProduct = (data) =>
    api.post("/products", data);

// Update a product
export const updateProduct = (id, data) =>
    api.put(`/products/${id}`, data);

// Delete a product
export const deleteProduct = (id) =>
    api.delete(`/products/${id}`);