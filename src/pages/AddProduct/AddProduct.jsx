import { message } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'

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
import { useHistory } from 'react-router';
import { updateProduct } from 'server/services/admin/admin.service';
import { addProduct } from 'server/services/admin/admin.service';
import { BaseUrl } from 'server/services/BaseUrl';

const AddProduct = () => {
  const [images,setImages] = useState([])
  const [files,setFiles] = useState([])
  const [updateProd,setUpdateProd] = useState({})
  const [oldImgArray,setOldImgArray] = useState([])
  const history = useHistory();
  useEffect(()=>{
    if(history.location.state){
      let prod = history.location.state.product
      console.log(prod);
      setUpdateProd(prod);
      const allChild =  document.getElementsByName("product-form")[0].querySelectorAll("input,select,textarea")
      Array.from(allChild).forEach(child=>{if(child.name in prod) child.value = prod[child.name]})
      setOldImgArray(prod.imageUrl)
    }
    
  },[])
    const submit = (e)=>{
        e.preventDefault();
        let c =0;
        Array.from(e.target.querySelectorAll("input,select,textarea")).forEach(ele=>{
          if(!ele.value.trim() && ele.name!=="image"){
            console.log(ele.name);
            c++;
            ele.style.outline="2px solid red";
          } else if(ele.name==="image" && (files.length===0&&oldImgArray.length===0)){
            c++;
            ele.style.outline="2px solid red";
          } else{
            ele.style.outline="none";
          }
        })
        if(files.length+oldImgArray.length>5){
          c++;
          message.error("Maximum 5 images allowed!")
        }
        if(!c) {
          const fd = new FormData(e.target);
          fd.delete("image")
          files.forEach((file)=>{
            fd.append("image",file)
          })
          // for (const pair of fd.entries()) {
          //   console.log(`${pair[0]}, ${pair[1]}`);
          // }

          if(_.isEmpty(updateProd)){
            message.loading("Adding...")
            addProduct(fd)
            .then((res)=>{
              message.success("Added successfully!")
              console.log(res);
              history.push("/admin/product-listing")
            })
            .catch((err)=>{
              message.error("Some error occured! Please try again.")
              console.log(err);
            })
          } else {
            message.loading("Updating...")
            fd.append("productid",updateProd._id)
            fd.append("oldImgArray",JSON.stringify(oldImgArray))
            updateProduct(fd)
            .then((res)=>{
              message.success("Updated successfully!")
              console.log(res);
              history.push("/admin/product-listing")
            })
            .catch((err)=>{
              message.error("Some error occured! Please try again.")
              console.log(err);
            })
          }
        }
        
          
    }


    const imageHandle = (e)=>{
      let temp = [...images];
      let temp2 = [...files];
      [...e.target.files].forEach((file)=>{
        let url = URL.createObjectURL(file)
        temp.push(url)
        temp2.push(file)
      })
      setImages(temp)
      setFiles(temp2)
      e.target.value =''
    }

    const removeImg = (i)=>{
      let temp = [...images];
      let temp2 = [...files];
      temp.splice(i,1);
      temp2.splice(i,1)
      setImages(temp)
      setFiles(temp2)
    }
    useEffect(()=>{
      console.log(images);
    },[images])
  return (
    <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{!_.isEmpty(updateProd)?"Update":"Add"} Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form name={"product-form"} onSubmit={submit}>
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
                            <Form.Control name="image" type="file" multiple size="sm" accept="image/*" onChange={(e)=>imageHandle(e)} />
                        </Form.Group>
                        <div className='prodImages mt-3'>
                          {images.map((img,i)=><>
                            <img src={img} key={i} alt="Product Image"></img>
                            <span className='cross cursor-pointer' onClick={()=>removeImg(i)}>&times;</span>
                          </>)}
                          {oldImgArray.map((img,i)=><>
                            <img src={BaseUrl+img} key={i+"old"} alt="Product Image"></img>
                            <span className='cross cursor-pointer' onClick={()=>{
                              let temp = [...oldImgArray]
                              temp.splice(i,1)
                              setOldImgArray(temp)
                            }}>&times;</span>
                          </>)}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    style={{background:"#247F70", boxShadow:"0 4px 9px -4px #247F70"}}
                    type="submit"
                    variant="info"
                  >
                    {!_.isEmpty(updateProd)?"Update":"Add"} Product
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