import api from "./api";

// Get all categories
export const getCategories = () => api.get("/categories");

// Create a new category
export const createCategory = (data) =>
    api.post("/categories", data);

// Update a category
export const updateCategory = (id, data) =>
    api.put(`/categories/${id}`, data);

// Delete a category
export const deleteCategory = (id) =>
    api.delete(`/categories/${id}`);