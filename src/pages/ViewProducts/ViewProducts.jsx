import CustomPaginationActionsTable from 'components/Table/Table'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from 'server/services/product/product.service';

const ViewProducts = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        getAllProducts()
        .then((res)=>{
        console.log(res.data);
        setProducts([...res.data]);
        })
        .catch((err)=>{console.log(err);})
    },[])
    const [titles, setTitles] = useState(["Product Name", "Category", "Quantity", "Price (in Rs.)", "Actions"])
    // const [data,setDate] = useState([])
  return (
    <CustomPaginationActionsTable titles={titles} products={products} />
  )
}

export default ViewProducts