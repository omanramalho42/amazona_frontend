import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { getError } from '../../util/utils'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../context/Store'
import { LoadingBox, MessageBox } from '../../components'
import { Button } from 'react-bootstrap'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return {...state, orders: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const OrdersScreen:React.FC = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer , {
    orders: {},
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`http://localhost:3001/api/orders/listorders`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS', payload: data.orders });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  useEffect(() => {
    console.log("ordens:", {orders} , "Loading: ",loading, "erro:", error,'info fetch data');
  },[orders])

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>
          { error }
        </MessageBox>
      ) : (
        <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATA</th>
            <th>TOTAL</th>
            <th>PAGAMENTO</th>
            <th>ENTREGA</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
        {orders.map((order: any) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? /*order.paidAt.substring(0,10)*/ 'Sim' : 'Não'}</td>
            <td>
              {order.isDelivered ? (
                order.deliveredAt.substring(0,10)
              ) : (
                'No'
              )}
            </td>
            <td>
              <Button
                type="button"
                variant='light'
                onClick={() => {
                  navigate(`/order/${order._id}`)
                }}
              >
                Detalhes
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      )}
    </div>
  )
}

export default OrdersScreen