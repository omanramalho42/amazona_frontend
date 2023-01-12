import axios from 'axios';
import React, { useContext, useState, useReducer, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../context/Store'

import { Container } from '../../styles/Profile';
import { getError } from '../../util/utils';

const reducer = (state:any, action:any) => {
  switch(action.type) {
    case 'UPDATE_REQUEST':
      return {
        ...state, loadingUpdate: true
      }
    case 'UPDATE_SUCCESS':
      return {
        ...state, loadingUpdate: false
      }
    case 'UPDATE_FAIL':
      return {
        ...state, loadingUpdate: false
      }

    default:
      return state;
  }

}

const Profile:React.FC = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingUpdated }, dispatch] = useReducer(reducer , {
    loadingUpdated: false,
  });

  const [name, setName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if(password !== confirmPassword) {
      toast.warning("As senhas nao se conhecidem");
      return;
    }

    try {
      const { data }:any  = await axios.put(
        `http://localhost:3001/api/users/profile`, 
      {
        name,
        email,
        password,
      },
      {
        headers: { authorization: `Bearer ${userInfo.token}` } 
      },
    );
    dispatch({ 
      type: 'UPDATE_SUCCESS'
    });
    ctxDispatch({ type: 'USER_SIGNIN', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success("Usuário atualizido com sucesso!");

    } catch (err) {
      dispatch({ 
        type: 'UPDATE_FAIL' 
      });
      toast.error(getError(err));
    }
  }
  
  return (
    <Container className='container'>
      <Helmet>
        <title>Perfil do usuário</title>
      </Helmet>
      <h1>
        Perfil do usuário
      </h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirmar a senha</Form.Label>
          <Form.Control
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">
          Atualizar
        </Button>
      </form>
    </Container>
  )
}

export default Profile;