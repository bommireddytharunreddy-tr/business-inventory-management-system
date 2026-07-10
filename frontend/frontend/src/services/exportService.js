import api from "../api/axios";

export const exportProducts = async () => {

    const response = await api.get(
        "/export/products",
        {
            responseType: "blob"
        }
    );

    downloadFile(response, "products.xlsx");

};

export const exportSales = async () => {

    const response = await api.get(
        "/export/sales",
        {
            responseType: "blob"
        }
    );

    downloadFile(response, "sales.xlsx");

};

export const exportPurchases = async () => {

    const response = await api.get(
        "/export/purchases",
        {
            responseType: "blob"
        }
    );

    downloadFile(response, "purchases.xlsx");

};

export const exportStock = async () => {

    const response = await api.get(
        "/export/stock",
        {
            responseType: "blob"
        }
    );

    downloadFile(response, "stock.xlsx");

};

function downloadFile(response, filename) {

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
        "download",
        filename
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

}