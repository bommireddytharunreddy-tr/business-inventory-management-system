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

function Categories() {

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [show, setShow] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const response = await api.get("/categories/");

            setCategories(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleShow = () => {

        setShow(true);

    };

    const handleClose = () => {

        setShow(false);

        setEditingId(null);

        setName("");

    };

    const handleSearch = async () => {

        if (search === "") {

            loadCategories();

            return;

        }

        try {

            const response = await api.get(

                `/categories/search?name=${search}`

            );

            setCategories(response.data);

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

                    "/categories/",

                    {

                        name

                    }

                );

                Swal.fire({

                    icon: "success",

                    title: "Success",

                    text: "Category Added Successfully",

                    timer: 1500,

                    showConfirmButton: false

                });

            }

            else {

                await api.put(

                    `/categories/${editingId}`,

                    {

                        name

                    }

                );

                Swal.fire({

                    icon: "success",

                    title: "Updated",

                    text: "Category Updated Successfully",

                    timer: 1500,

                    showConfirmButton: false

                });

            }

            handleClose();

            loadCategories();

        }

        catch (err) {

            console.log(err);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to save category"

            });

        }

    };

    const handleEdit = (category) => {

        setEditingId(category.id);

        setName(category.name);

        setShow(true);

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Category?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed)

            return;

        try {

            await api.delete(

                `/categories/${id}`

            );

            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Category Deleted Successfully",

                timer: 1500,

                showConfirmButton: false

            });

            loadCategories();

        }

        catch (err) {

            console.log(err);

        }

    };
        return (

        <>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>Categories Management</h2>

                        <Button
                            variant="primary"
                            onClick={handleShow}
                        >

                            <FaPlus />

                            {" "}

                            Add Category

                        </Button>

                    </div>

                    <div className="input-group mb-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Category..."
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

                            <table className="table table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Category Name</th>

                                        <th width="180">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        categories.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="3"
                                                        className="text-center"
                                                    >

                                                        No Categories Found

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            categories.map(category => (

                                                <tr
                                                    key={category.id}
                                                >

                                                    <td>

                                                        {category.id}

                                                    </td>

                                                    <td>

                                                        {category.name}

                                                    </td>

                                                    <td>

                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() =>
                                                                handleEdit(category)
                                                            }
                                                        >

                                                            <FaEdit />

                                                        </Button>

                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(category.id)
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
                    >

                        <Modal.Header closeButton>

                            <Modal.Title>

                                {

                                    editingId

                                        ?

                                        "Edit Category"

                                        :

                                        "Add Category"

                                }

                            </Modal.Title>

                        </Modal.Header>

                        <form
                            onSubmit={handleSubmit}
                        >

                            <Modal.Body>

                                <input
                                    className="form-control"
                                    placeholder="Category Name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />

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

                                            "Update Category"

                                            :

                                            "Save Category"

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

export default Categories;