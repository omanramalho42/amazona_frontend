import React, { lazy, Suspense, Fragment, useContext } from 'react'
import { 
  BrowserRouter,
  Route,
  Routes 
} from 'react-router-dom'

import { 
  Header,
  Footer
} from './components'

import { GlobalStyle } from './styles/Global'

import { Container, ToastContainer } from 'react-bootstrap'
import { AppContainer } from './styles/App'

import Cart from './screens/Cart'
import { SignIn } from './screens'

import 'react-toastify/dist/ReactToastify.css';
import ShippingScreen from './screens/ShippingScreen'

const Home = lazy(() => import('./screens/Home'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));

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
  return (
    <BrowserRouter>
      <AppContainer>
        <ToastContainer position='bottom-center' />
          <GlobalStyle />

          <Header />

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
                  path='/shipping' 
                  element={
                    <Suspense fallback={<Loading />}>
                      <ShippingScreen />
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
              </Fragment>
            </Routes>
          </Container>

          <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App
