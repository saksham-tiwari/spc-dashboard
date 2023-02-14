import CustomPaginationActionsTable from 'components/Table/Table'
import React, { useEffect, useState } from 'react'
import { getAllOrders } from 'server/services/admin/admin.service';
import { getAllProducts } from 'server/services/product/product.service';

const ViewOrders = () => {
    const [products,setProducts] = useState([]);
    const [update,setUpdate] = useState(false);
    const [filter,setFilter] = useState("")
    const [search,setSearch] = useState("")

    useEffect(()=>{
        getAllOrders(filter,search)
        .then((res)=>{
        console.log(res.data);
        setProducts([...res.data]);
        })
        .catch((err)=>{console.log(err);})
    },[update,filter,search])
    const [titles, setTitles] = useState(["Order Id", "Status", "Amount (in Rs.)", "Customer","Date of Order", "Actions"])
    // const [data,setDate] = useState([])
  return (
    <CustomPaginationActionsTable titles={titles} products={products} setUpdate={setUpdate} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
  )
}

export default ViewOrders