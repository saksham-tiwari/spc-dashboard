import CustomPaginationActionsTable from 'components/Table/Table'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from 'server/services/product/product.service';

const ViewOrders = () => {
    const [products,setProducts] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(()=>{
        getAllProducts()
        .then((res)=>{
        console.log(res.data);
        setProducts([...res.data]);
        })
        .catch((err)=>{console.log(err);})
    },[update])
    const [titles, setTitles] = useState(["Product Name", "Category", "Quantity", "Price (in Rs.)", "Actions"])
    // const [data,setDate] = useState([])
  return (
    <CustomPaginationActionsTable titles={titles} products={products} setUpdate={setUpdate} />
  )
}

export default ViewOrders