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

import data, { ProductProps } from '../../util/data'

const ListProducts: React.FC = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps>()

  useEffect(() => {
    if(data.products) {
      setDataProducts(data);
    }
  },[])

  // useEffect(() => {
  //   console.log({ dataProducts },'products')
  // },[dataProducts])
  
  return (
    <Container>
      <Title>Produtos</Title>
      <CardContainer>
        {dataProducts?.products.map((product, idx) => (
          <Card key={idx}>
            {/* <Anchor href={`/product/${product.slug}`}> */}
              <Image
                src={product.image} 
                alt={product.name} 
              />
              <Content>
                <Anchor href={`/product/${product.slug}`}>
                  <Typography>
                    { product.name }
                  </Typography>
                </Anchor>
                <Typography>
                  <strong>${ product.price }</strong>
                </Typography>
                <Button>Adiconar ao carrinho</Button>
              </Content>
            {/* </Anchor> */}
          </Card>
        ))}
      </CardContainer>
    </Container>
  )
}

export default ListProducts