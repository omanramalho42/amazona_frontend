import React, { useEffect, useReducer } from 'react'

import axios from 'axios'

import { useParams } from 'react-router-dom'

import { Image } from '../../styles/ProductScreen'

import { Col, Row, ListGroup, Card, Badge, Button } from 'react-bootstrap'
import { Rating } from '../../components'
import { Helmet } from 'react-helmet-async'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, product: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  
  const [{loading, error, product}, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: ''
  });
  useEffect(() => {
    const fetchDataProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' })

      await axios.get(`http://localhost:3001/api/products/slug/${slug}`)
        .then((res) => {
          console.log(res.data)
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
        })
        .catch((error) => dispatch({ type: 'FETCH_FAIL', payload: error.message }))
    }

    fetchDataProducts();
  },[slug])

  return (
    loading ? (
      <div>...loading</div>
    ) : error ? (
      <div>{ error }</div>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <Image 
              src={product.image} 
              alt={product.name} 
            />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating 
                  rating={product.rating} 
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Preço : R${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Descrição : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col> Preço: </Col>
                      <Col> R${product.price} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> Status: </Col>
                      <Col> 
                        {product.counterInStock > 0 ? (
                          <Badge bg="success">
                            Em estoque
                          </Badge>
                        ) : (
                          <Badge bg="danger">
                            Fora de estoque
                          </Badge>
                        )} 
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.counterInStock > 0 && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                      <Button variant='primary'>
                        Adiconar ao carrinho
                      </Button>
                      </div>
                    </ListGroup.Item>
                  )}

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
}

export default ProductScreen