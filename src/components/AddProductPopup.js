import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CartState } from "../context/Context";


export default function AddProductPopup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product, setProductData] = useState({
        name: '',
        image: '',
        cat: '',
        discription: '',
        ratings:'',
        id:'',
        price:''
    })

    const { addProductDispatch } = CartState();

    let handleSubmit = () => {
        product.id = Math.random().toString(16).slice(2);
        product.ratings =Math.floor(Math.random() * 5);
        addProductDispatch(
            {
                type: "ADD_PRODUCT",
                payload: product,
            }
        )
         handleClose()
    }



    let onChangeHandle = async (key, val) => {
        if (key === 'image') {
            await getBase64(val).then(basn64 => {
                console.log('mmm', basn64);
                val = basn64
            })
        }
        setProductData((prevData) => ({
            ...prevData,
            [key]: val
        }))
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });

    }

    console.log('Hellllooooo', product);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="AddProductPopup.Name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                onChange={(e) => onChangeHandle('name', e.target.value)}
                                placeholder="product name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="AddProductPopup.Image">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => onChangeHandle('image', e.target?.files?.[0])}
                                placeholder="product image"
                                name='image'
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="AddProductPopup.Image">
                            <Form.Label>Product price</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => onChangeHandle('price', e.target.value)}
                                placeholder="product price"
                                name='price'
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="AddProductPopup.ControlInput1">
                            <Form.Label>Product Category</Form.Label>
                            <DropdownButton
                                title="Dropdown"
                                id="dropdown-menu"
                                onSelect={(e) => onChangeHandle('cat', e)}
                            >
                                <Dropdown.Item eventKey="men">Men</Dropdown.Item>
                                <Dropdown.Item eventKey="women">women</Dropdown.Item>
                                <Dropdown.Item eventKey="child">Child</Dropdown.Item>

                            </DropdownButton>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="AddProductPopup.ControlTextarea1"
                        >
                            <Form.Label>Product  Description</Form.Label>
                            <Form.Control onChange={(e) => onChangeHandle('discription', e.target.value)} name='discription' as="textarea" rows={3} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
