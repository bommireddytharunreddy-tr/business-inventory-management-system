import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import {

    FaPlus,

    FaEdit,

    FaTrash,

    FaSearch

} from "react-icons/fa";

function Products() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [show, setShow] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({

        name: "",

        purchase_price: "",

        selling_price: "",

        stock: "",

        minimum_stock: "",

        brand: "",

        image: "",

        category_id: ""

    });

    useEffect(() => {

        loadProducts();

        loadCategories();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get("/products/");

            setProducts(response.data.products);

        }

        catch (err) {

            console.log(err);

        }

    };

    const loadCategories = async () => {

        try {

            const response = await api.get("/categories/");

            setCategories(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleClose = () => {

        setShow(false);

        resetForm();

    };

    const handleShow = () => {

        setShow(true);

    };

    const resetForm = () => {

        setEditingId(null);

        setFormData({

            name: "",

            purchase_price: "",

            selling_price: "",

            stock: "",

            minimum_stock: "",

            brand: "",

            image: "",

            category_id: ""

        });

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSearch = async () => {

        if (search === "") {

            loadProducts();

            return;

        }

        try {

            const response = await api.get(

                `/products/search?name=${search}`

            );

            setProducts(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };
        const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId === null) {

                await api.post(

                    "/products/",

                    formData

                );

                Swal.fire({

                    icon: "success",

                    title: "Success",

                    text: "Product Added Successfully",

                    timer: 1500,

                    showConfirmButton: false

                });

            }

            else {

                await api.put(

                    `/products/${editingId}`,

                    formData

                );

                Swal.fire({

                    icon: "success",

                    title: "Updated",

                    text: "Product Updated Successfully",

                    timer: 1500,

                    showConfirmButton: false

                });

            }

            handleClose();

            loadProducts();

        }

        catch (err) {

            console.log(err);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to save product"

            });

        }

    };

    const handleEdit = (product) => {

        setEditingId(product.id);

        setFormData({

            name: product.name,

            purchase_price: product.purchase_price,

            selling_price: product.selling_price,

            stock: product.stock,

            minimum_stock: product.minimum_stock,

            brand: product.brand,

            image: product.image,

            category_id: product.category_id

        });

        setShow(true);

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Product?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed)

            return;

        try {

            await api.delete(

                `/products/${id}`

            );

            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Product Deleted Successfully",

                timer: 1500,

                showConfirmButton: false

            });

            loadProducts();

        }

        catch (err) {

            console.log(err);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to delete product"

            });

        }

    };

    const getCategoryName = (id) => {

        const category = categories.find(

            (cat) => cat.id === id

        );

        return category

            ? category.name

            : "N/A";

    };
        return (

        <>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>Products Management</h2>

                        <Button
                            variant="primary"
                            onClick={handleShow}
                        >

                            <FaPlus />

                            {" "}

                            Add Product

                        </Button>

                    </div>

                    <div className="input-group mb-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Product..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <Button
                            variant="dark"
                            onClick={handleSearch}
                        >

                            <FaSearch />

                        </Button>

                    </div>

                    <div className="card shadow">

                        <div className="card-body">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Image</th>

                                        <th>Name</th>

                                        <th>Brand</th>

                                        <th>Purchase</th>

                                        <th>Selling</th>

                                        <th>Stock</th>

                                        <th>Category</th>

                                        <th width="180">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        products.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="9"
                                                        className="text-center"
                                                    >

                                                        No Products Found

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            products.map(product => (

                                                <tr key={product.id}>

                                                    <td>

                                                        {product.id}

                                                    </td>

                                                    <td>

                                                        {

                                                            product.image

                                                                ?

                                                                <img
                                                                    src={product.image}
                                                                    alt=""
                                                                    width="60"
                                                                    height="60"
                                                                    className="rounded"
                                                                />

                                                                :

                                                                "No Image"

                                                        }

                                                    </td>

                                                    <td>

                                                        {product.name}

                                                    </td>

                                                    <td>

                                                        {product.brand}

                                                    </td>

                                                    <td>

                                                        ₹ {product.purchase_price}

                                                    </td>

                                                    <td>

                                                        ₹ {product.selling_price}

                                                    </td>

                                                    <td>

                                                        {product.stock}

                                                    </td>

                                                    <td>

                                                        {

                                                            getCategoryName(

                                                                product.category_id

                                                            )

                                                        }

                                                    </td>

                                                    <td>

                                                        <Button

                                                            variant="warning"

                                                            size="sm"

                                                            className="me-2"

                                                            onClick={() =>

                                                                handleEdit(product)

                                                            }

                                                        >

                                                            <FaEdit />

                                                        </Button>

                                                        <Button

                                                            variant="danger"

                                                            size="sm"

                                                            onClick={() =>

                                                                handleDelete(product.id)

                                                            }

                                                        >

                                                            <FaTrash />

                                                        </Button>

                                                    </td>

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        size="lg"
                    >

                        <Modal.Header closeButton>

                            <Modal.Title>

                                {

                                    editingId

                                        ?

                                        "Edit Product"

                                        :

                                        "Add Product"

                                }

                            </Modal.Title>

                        </Modal.Header>

                        <form onSubmit={handleSubmit}>

                            <Modal.Body>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <input
                                            className="form-control"
                                            placeholder="Product Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <input
                                            className="form-control"
                                            placeholder="Brand"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Purchase Price"
                                            name="purchase_price"
                                            value={formData.purchase_price}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Selling Price"
                                            name="selling_price"
                                            value={formData.selling_price}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Stock"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Minimum Stock"
                                            name="minimum_stock"
                                            value={formData.minimum_stock}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <select
                                            className="form-select"
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Category

                                            </option>

                                            {

                                                categories.map(category => (

                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >

                                                        {category.name}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                    <div className="col-md-12 mb-3">

                                        <input
                                            className="form-control"
                                            placeholder="Image URL"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </Modal.Body>

                            <Modal.Footer>

                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >

                                    Cancel

                                </Button>

                                <Button
                                    variant="success"
                                    type="submit"
                                >

                                    {

                                        editingId

                                            ?

                                            "Update Product"

                                            :

                                            "Save Product"

                                    }

                                </Button>

                            </Modal.Footer>

                        </form>

                    </Modal>

                </div>

            </div>

        </>

    );

}

export default Products;