import React, { useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import logger from 'use-reducer-logger'

import { Row, Col } from 'react-bootstrap'

import { Product } from '../../components'

import { ProductProps } from '../../util/data'
import { Helmet } from 'react-helmet-async'

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
      <div>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
        <h1>Feataured images</h1>
      </div>
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