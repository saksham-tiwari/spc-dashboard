import React from 'react'

import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
  } from "react-bootstrap";

const AddProduct = () => {

    const submit = (e)=>{
        e.preventDefault();
        const fd = new FormData(e.target);
        for (const pair of fd.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }
          
    }
  return (
    <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Product Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Product Name"
                          type="text"
                          name="name"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    {/* <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Product Category</label> <br/>
                        <Form.Select name="category" aria-label="Default select example">
                            <option value="null">Select Category</option>
                            <option value="Soap">Soap</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        {/* <label>Address</label> */}
                        <Form.Group controlId="formFileMultiple">
                            <Form.Label>Upload Product Images</Form.Label>
                            <Form.Control name="image" type="file" multiple size="sm" accept="image/*" />
                        </Form.Group>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Quantity</label>
                        <Form.Control
                          defaultValue={0}
                          placeholder="Quantity"
                          type="number"
                          name="quantity"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Price (₹)</label>
                        <Form.Control
                          defaultValue={10}
                          placeholder="Price in Rs."
                          type="number"
                          name="price"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Product Description</label>
                        <Form.Control
                          cols="80"
                          defaultValue=""
                          placeholder="Describe your product"
                          rows="4"
                          as="textarea"
                          name="description"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Add Product
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  )
}

export default AddProduct