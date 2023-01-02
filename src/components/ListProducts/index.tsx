import React, { useEffect, useState } from 'react'

import { 
  Container,
  Title,
  CardContainer,
  Content,
  Card,
  Typography,
  Image,
  Anchor,
  Button
} from './styled'

import { Link } from 'react-router-dom';

import data, { ProductProps } from '../../util/data'

const ListProducts: React.FC = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps>()

  useEffect(() => {
    if(data.products) {
      setDataProducts(data);
    }
  },[])
  
  return (
    <Container>
      <Title>Produtos</Title>
      <CardContainer>
        {dataProducts?.products.map((product, idx) => (
          <Card key={idx}>
            <Link to={`/product/${product.slug}`}>
              <Image
                src={product.image} 
                alt={product.name} 
              />
            </Link>
            <Content>
              <Link to={`/product/${product.slug}`}>
                <Typography>
                  { product.name }
                </Typography>
              </Link>
              <Typography>
                <strong>${ product.price }</strong>
              </Typography>
              <Button>Adiconar ao carrinho</Button>
            </Content>
          </Card>
        ))}
      </CardContainer>
    </Container>
  )
}

export default ListProducts