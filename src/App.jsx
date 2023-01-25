import React from 'react'
import { Layout, Typography, Space } from 'antd';
import { createBrowserRouter, createRoutesFromElements, Route, NavLink, Outlet, RouterProvider } from 'react-router-dom';
import { CryptoDetails, CryptoCurrencies, Exchanges, Homepage, Navbar, News } from './components';
import './App.css'



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Homepage />} />
        <Route exact path='/exchanges' element={<Exchanges />} />
        <Route exact path='/cryptocurrencies' element={<CryptoCurrencies />} />
        <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
        <Route exact path='/news' element={<News />} />
      </Route>
    )
  )

  return (

    <div>
      <RouterProvider router={router} />;
    </div>
  )
}

const Root = () => {

  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Outlet />
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/exchanges'>Exchanges</NavLink>
            <NavLink to='/news'>News</NavLink>
          </Space>
        </div>
      </div>
    </div>
  )
}


export default App;