import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartOffcanvas from './components/CartOffcanvas/CartOffcanvas';
import { CartContextProvider } from './Context/CartContext';

function Layout() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCartButtonClick = () => {
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };
  return (
    <CartContextProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
      onCartButtonClick={handleCartButtonClick}
      style={{ flex: '0 0 auto' }} />
      <div style={{ flex: '1 0 auto', marginTop: '12em' }}>
        <Outlet/>
        <CartOffcanvas show={showOffcanvas} handleClose={handleCloseOffcanvas} />
      </div>
      <Footer style={{ flex: '0 0 auto' }} />
    </div>
    </CartContextProvider>
    
  );
}

export default Layout;
