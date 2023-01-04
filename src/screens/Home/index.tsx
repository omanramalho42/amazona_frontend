import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

import logger from 'use-reducer-logger'

import { Product } from '../../components'
import { ProductProps } from '../../util/data'

const reducer = (state: any , action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const Home = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps>()
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: ''
  });
  useEffect(() => {
    const fetchDataProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' })

      await axios.get("http://localhost:3001/api/products")
        .then((res) => {
          setDataProducts({ products: res.data })
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
        })
        .catch((error) => dispatch({ type: 'FETCH_FAIL', payload: error.message }))
    }

    fetchDataProducts();
  },[])


  return (
    <div>
      <h4>Feataured images</h4>
      {loading ? ( 
        <div>loading...</div>
      ) : error ? (
        <div>{ error }</div>
      ) : (
        <Row>
          {dataProducts?.products.map(( product, idx) => (
            <Col sm={6} md={4} lg={3} key={product.slug}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default Home