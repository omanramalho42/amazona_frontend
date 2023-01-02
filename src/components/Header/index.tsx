import React from 'react'

import { Container, Anchor } from './styled'

const Header: React.FC = () => {
  return (
    <Container>
      <Anchor
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Amazona
      </Anchor>
  </Container>
  )
}

export default Header