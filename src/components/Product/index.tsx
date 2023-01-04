import React from 'react'

import { 
  Container,
  Typography,
  Image
} from './styled'

import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

import Rating from '../Rating'

import { ProductsProps } from '../../util/data'

interface ProductProps {
  product: ProductsProps;
}

const Product = ({ product }: ProductProps) => {
  return (
    <Container>
      <Card>
        <Link to={`/product/${product.slug}`}>
          <Image
            src={product.image} 
            alt={product.name}
            className="card-img-top" 
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Typography>
              { product.name }
            </Typography>
          </Link>
          
          <Rating 
            rating={product.rating} 
            numReviews={product.numReviews} 
          />

          <Card.Text>
            <strong>${ product.price }</strong>
          </Card.Text>
          <Button 
            style={{ 
              color: '#000', 
              backgroundColor: '#f0c040' 
            }}
          >
            Adiconar ao carrinho
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product