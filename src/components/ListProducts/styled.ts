import styled from "styled-components"

export const Container = styled.main`
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.8em;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  max-height: 400px;
  max-width: 400px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`;

export const Card = styled.div`
  border: 1px solid #404040;

  padding: 1rem;
  margin: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  margin: auto;
`;

export const Anchor = styled.a`

`;


export const Typography = styled.p`
  font-size: 1em;
`;