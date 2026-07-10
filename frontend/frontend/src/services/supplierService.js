import api from "./api";

// Get all suppliers
export const getSuppliers = () => api.get("/suppliers");

// Create a new supplier
export const createSupplier = (data) =>
    api.post("/suppliers", data);

// Update a supplier
export const updateSupplier = (id, data) =>
    api.put(`/suppliers/${id}`, data);

// Delete a supplier
export const deleteSupplier = (id) =>
    api.delete(`/suppliers/${id}`);