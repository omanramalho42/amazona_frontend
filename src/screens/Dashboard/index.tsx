import 'react-loading-skeleton/dist/skeleton.css'

import React, { useEffect, useState, useContext, useReducer } from 'react'
import axios from 'axios';


import { Store } from '../../context/Store';
import { getError } from '../../util/utils';

import PieChart from '../../components/PieChart'

import { Toaster, toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { Container } from 'react-bootstrap';
import BarChart from '../../components/BarChart';
import { AreaChart } from '../../components/AreaChart';
import { MessageBox } from '../../components';
import { Helmet } from 'react-helmet-async';

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS_PRODUCTS':
      return {...state, products: action.payload, loading: false}
      case 'FETCH_SUCCESS_ORDERS':
      return {...state, orders: action.payload, loading: false}
      case 'FETCH_SUCCESS_USERS':
      return {...state, users: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const Dashboard:React.FC = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ 
    loading, 
    error, 
    products, 
    orders, 
    users 
  }, dispatch] = useReducer(reducer , {
    products: {},
    orders: {},
    users: {},
    loading: true,
    error: ''
  });

  const [categories, setCategories]               = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const { data }: any = await axios.get('http://localhost:3001/api/products/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`http://localhost:3001/api/orders/listorders`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        // setOrders(data.orders);
        dispatch({ type: 'FETCH_SUCCESS_ORDERS', payload: data.orders });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`http://localhost:3001/api/products/listproducts`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS_PRODUCTS', payload: data.products });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`http://localhost:3001/api/users/listusers`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS_USERS', payload: data.users });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  return (
    <Container>
      <Toaster />
      
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      
      <h1>
        Dashboard
      </h1>

      <div className='p-5 d-flex justify-content-between align-middle flex-row text-center'>
        {users && !loading ? (
          <div className='m-5 w-full text-center shadow p-2'>
            <p>Usuários: {users?.length}</p>
          </div>
        ) : (
          <>
            <Skeleton inline className='p-4 m-5' />
          </>
        )}
        {products && !loading ? (
          <div className='m-5 w-full text-center shadow p-2'>
            <p className=''>
              Produtos: {products?.length}
            </p>
          </div>
        ) : (
          <>
            <Skeleton inline className='p-4 m-5' />
          </>
        )}
        {orders && !loading ? (
          <div className='m-5 w-full text-center shadow p-2'>
            <p>Pedidos: {orders?.length}</p>
          </div>
        ) : (
          <>
            <Skeleton inline className='p-4 m-5' />
          </>
        )}
      </div>

      <div className='d-flex flex-md-row flex-column col-12'>
        <div className='col-12 col-md-6 mt-5'>
          { products?.length > 0 && !loading ? (
            <div className=''>
              <PieChart 
                dataChart={products}
                type="products" 
              />
            </div>
          ) : (
            <>
              <Skeleton inline />
              <Skeleton 
                className='w-75 h-75 m-5'
                borderRadius={"50%"}
              />
            </>
          )}
          { error && !loading && (
            <MessageBox variant='danger'>
              { error }
            </MessageBox>
          )}
        </div>

        <div className='col-12 col-md-6 d-flex flex-column mt-5'>
          {orders?.length > 0 && !loading ? (
            <div className=''>
              <BarChart 
                dataChart={orders} 
                type="orders"
              />
            </div>
          ) : (
            <Skeleton
              className='mt-5' 
              height={200}
            />
          )}
            <div className='w-full mt-5'>
              {orders?.length > 0 && !loading ? (
                <div className=''>
                  <AreaChart 
                    dataChart={orders}
                    type="orders" 
                  />
                </div>
              ) : (
                <Skeleton 
                  className='mt-5'
                  height={200}
                />
              )}
            </div>
        </div>
      </div>
    </Container>
  )
}

export default Dashboard;