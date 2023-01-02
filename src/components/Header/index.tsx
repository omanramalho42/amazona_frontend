import React from 'react'

import { Link } from 'react-router-dom'

import { Container } from './styled'

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        Amazona
      </Link>
  </Container>
  )
}

export default Header