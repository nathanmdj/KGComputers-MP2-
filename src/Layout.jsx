import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header style={{ flex: '0 0 auto' }} />
      <div style={{ flex: '1 0 auto', marginTop: '10em' }}>
        <Outlet/>
      </div>
      <Footer style={{ flex: '0 0 auto' }} />
    </div>
  );
}

export default Layout;
