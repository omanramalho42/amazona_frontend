import React, { lazy, Suspense, Fragment } from 'react'
import { 
  BrowserRouter,
  Route,
  Routes 
} from 'react-router-dom'

import { 
  Header,
  Footer
} from './components'

import { GlobalStyle } from './styles/Global';

import Container from 'react-bootstrap/Container'
import { AppContainer } from './styles/App'

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
        <GlobalStyle />

        <Header />

        <Container>
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
            </Fragment>
          </Routes>
        </Container>

        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App
