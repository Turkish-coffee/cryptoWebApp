import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { NavLink } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { CryptoCurrencies, News, Loader } from '.';

const { Title } = Typography;

const Homepage = () => {
  
  const {data, isFetching} = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader/>

  return (
    <div>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}> <Statistic title='Total Cryptocurrencies' value={globalStats.total}/> </Col>
        <Col span={12}> <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}/> </Col>
        <Col span={12}> <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}/> </Col>
        <Col span={12}> <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}/> </Col>
        <Col span={12}> <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)}/> </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><NavLink to="/cryptocurrencies">Show more</NavLink></Title>
      </div>
      <CryptoCurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3}><NavLink to="/news">Show more</NavLink></Title>
      </div>
      <News simplified />
    </div>
  )
}

export default Homepage