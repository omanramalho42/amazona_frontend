import React, { lazy, Suspense, Fragment, useState, useEffect, useContext } from 'react'

import { 
  BrowserRouter,
  Route,
  Routes, 
  useLocation, 
  useNavigate
} from 'react-router-dom'

import { 
  Header,
  Footer
} from './components'

import { GlobalStyle } from './styles/Global'

import { 
  Container, 
  ToastContainer 
} from 'react-bootstrap'

import { AppContainer } from './styles/App'

import { getError } from './util/utils'

import { toast } from 'react-toastify'

import axios from 'axios'
import ProtectedRoute from './components/ProtecetedRoute'
import Dashboard from './screens/Dashboard'
import AdminRoute from './components/AdminRoute'
import Sidebar from './components/Sidebar'
import { OrdersScreen, ProductsScreen, UsersList } from './screens'
import { Store } from './context/Store'

const SearchScreen = lazy(() => import('./screens/SearchScreen'));
const OrderHistory =lazy(() => import('./screens/OrderHistory'));
const Profile =lazy(() => import('./screens/Profile'));
const Payament = lazy(() => import('./screens/Payament'));
const PlaceOrder = lazy(() => import('./screens/PlaceOrder'));
const Order = lazy(() => import('./screens/Order'));
const SignUp = lazy(() => import('./screens/SignupScreen'));
const Cart = lazy(() => import('./screens/Cart'));
const SignIn = lazy(() => import('./screens/SigninScreen'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen')); 
const Home = lazy(() => import('./screens/Home'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'));
const CreateProductScreen = lazy(() => import('./screens/CreateProductScreen'))

const Loading: React.FC = () => {
  return (
    <div>
      <h1>
        loading.........
      </h1>
    </div>
  )
}

function App() {  
  const [sidebar, setSidebar] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data }: any = await axios.get('http://localhost:3001/api/products/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };

    fetchCategories();
  },[]);
  
  return (
    <BrowserRouter>
      <div 
        className={
          sidebar 
          ? 'd-flex flex-column side-container active-cont' 
          : 'd-flex flex-column side-container'
        }
      >
        <AppContainer>
          <ToastContainer 
            position='bottom-center' 
          />
          <GlobalStyle />

          <Header setSidebar={setSidebar} />
          <Sidebar 
            categories={categories} 
            setShow={setSidebar}
            show={sidebar}
          />

          <Container className='mt-3'>
            <Routes>
              <Fragment>
                <Route 
                  path='/' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route 
                  path='/product/:slug' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProductScreen />
                    </Suspense>
                  }
                />
                <Route 
                  path='/cart' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <Cart />
                    </Suspense>
                  }
                />
                <Route 
                  path='/search' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <SearchScreen />
                    </Suspense>
                  }
                />
                <Route 
                  path='/profile' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route 
                  path='/shipping' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ShippingScreen />
                    </Suspense>
                  }
                />
                <Route 
                  path='/payament' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <Payament />
                    </Suspense>
                  }
                />
                <Route 
                  path='/placeorder' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProtectedRoute>
                        <PlaceOrder />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route 
                  path='/order/:id' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <Order />
                    </Suspense>
                  }
                />
                <Route 
                  path='/orderhistory' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProtectedRoute>
                        <OrderHistory />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route 
                  path='/signin' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <SignIn />
                    </Suspense>
                  }
                />
                <Route 
                  path='/signup' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <SignUp />
                    </Suspense>
                  }
                />

                {/* ASDMIN ROUTES */}
                <Route 
                  path='/admin/dashboard' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    </Suspense>
                  }
                />
                <Route 
                  path='/admin/users' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <AdminRoute>
                        <UsersList />
                      </AdminRoute>
                    </Suspense>
                  }
                />
                <Route 
                  path='/admin/products' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <AdminRoute>
                        <ProductsScreen />
                      </AdminRoute>
                    </Suspense>
                  }
                />
                <Route 
                  path='/admin/product/edit/:slug' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProductEditScreen />
                    </Suspense>
                  }
                />
                <Route 
                  path='/admin/product/create' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <CreateProductScreen />
                    </Suspense>
                  }
                />
                <Route 
                  path='/admin/orders' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <AdminRoute>
                        <OrdersScreen />
                      </AdminRoute>
                    </Suspense>
                  }
                />
              </Fragment>
            </Routes>
          </Container>

          <Footer />
        </AppContainer>
      </div>
    </BrowserRouter>
  );
}

export default App
