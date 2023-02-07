import { message } from 'antd';
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
import { addProduct } from 'server/services/admin/admin.service';

const AddProduct = () => {

    const submit = (e)=>{
        e.preventDefault();
        let c =0;
        Array.from(e.target.querySelectorAll("input,select,textarea")).forEach(ele=>{
          if(!ele.value.trim()){
            c++;
            ele.style.outline="2px solid red";
          } else{
            ele.style.outline="none";
          }
        })
        if(!c) {
          message.loading("Adding...")
          const fd = new FormData(e.target);

          addProduct(fd)
          .then((res)=>{
            message.success("Added successfully!")
            console.log(res);
          })
          .catch((err)=>{
            message.error("Some error occured! Please try again.")
            console.log(err);
          })
        }
        // for (const pair of fd.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        //   }
          
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
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Product Category</label> <br/>
                        <Form.Select name="category" aria-label="Default select example">
                            <option value="">Select Category</option>
                            <option value="Soap">Soap</option>
                        </Form.Select>
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
                          onChange={e=>{if(e.target.value<0)e.target.value=0}}
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
                          onChange={e=>{if(e.target.value<0)e.target.value=0}}
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
                  <Row className='mb-3'>
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
                  <Button
                    className="btn-fill pull-right"
                    style={{background:"#247F70", boxShadow:"0 4px 9px -4px #247F70"}}
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