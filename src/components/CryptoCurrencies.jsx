import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { NavLink } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';


const CryptoCurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcryptos] = useState(cryptosList?.data?.coins);
  const [SearchTerm, setSearchTerm] = useState('');
  
  useEffect(()=>{
    
    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(SearchTerm));
    setcryptos(filteredData);
  }, [cryptosList,SearchTerm])

  if (isFetching) return <Loader/>

  return (
    <div>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32,32]} className='crypto-card-container'>
        {
          cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <NavLink to={`/crypto/${currency.uuid}`}>
                <Card title={`${currency.rank}.${currency.name}`}
                      extra={<img className='crypto-image' src={currency.iconUrl}/>}
                      hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
                </Card>
              </NavLink>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default CryptoCurrencies