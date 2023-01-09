import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;

    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  button {
    all: unset;
  }

  .checkout-steps > div {
    border-bottom: 0.2rem solid #a0a0a0;
    color: #a0a0a0;
  }

  .checkout-steps > div.active {
    border-bottom: 0.2rem solid #f08000;
    color: #f08000;
  }
`;