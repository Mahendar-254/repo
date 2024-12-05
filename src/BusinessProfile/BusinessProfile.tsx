import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Spinner } from 'react-bootstrap';

import { Layout, Typography, Divider, Button } from 'antd';

import { FaPinterest } from 'react-icons/fa';

import axios from 'axios';

import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation

import './Sponsored.css';


 

const { Title } = Typography;

const { Content } = Layout;


 

// Board interface

interface Board {

  id: number;

  title: string;

  description: string;

  logoUrl: string;

  websiteUrl: string;

}


 

interface Pins {

  "id":number;

  "showcaseId": number;

  "title": string;

  "description": string;

  "imageUrl": string;

  "externalUrl": string;

  "keywords": string;

}


 

const BusinessProfile: React.FC = () => {

  const [boards, setBoards] = useState<Board[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [pins, setPins] = useState<Pins[]>([]);


 

  useEffect(() => {

    const fetchData = async () => {

      try {

        const boardsResponse = await axios.get('http://localhost:8704/api/business_profiles');

        setBoards(boardsResponse.data);

        setLoading(false);

      } catch (error) {

        console.error('Error fetching data:', error);

        setLoading(false);

      }

    };


 

    const fetchPins = async () => {

      try {

        const boardsResponse = await axios.get('http://localhost:8704/api/pins');

        setPins(boardsResponse.data);

        setLoading(false);

      } catch (error) {

        console.error('Error fetching data:', error);

        setLoading(false);

      }

    }



 

    fetchData();

    fetchPins();

  }, []);


 

  const navigate = useNavigate();

  const goBack = (event: any): void => {

    navigate("/home");

  }


 

  if (loading) {

    return (

      <div className="text-center5 my-5">


 

        <Spinner animation="border" variant="primary" />

      </div>

    );

  }


 

  return (

    <Layout>

      <Content>

        <Container fluid>

          <Row className="justify-content-center my-5">

            <Col md={8}>

              <FaPinterest size={40} />

              <Title level={2}>Business Profile: Sponsored Pins & Boards</Title>

              <Divider />


 

              <Title className='text text-success' level={4}>Sponsored Boards</Title>

              <Row>

                {boards.map((board) => (

                  <Col key={board.id} md={4}>

                    <Link to={`/sponseredBoard/${board.id}`}> {/* Add Link to navigate */}

                      <div className="card-container5">

                        <div className="card5">

                          <img className="card-img5" src={board.logoUrl} alt={board.title} style={{ height: '200px' }} />

                          <div className="card-body5">

                            <Title level={5}>{board.title}</Title>

                            <div className="card-actions5">

                              <button className="action-btn5">

                                <HeartOutlined /> Like

                              </button>

                              <button className="action-btn5">

                                <ShareAltOutlined /> Share

                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </Link>

                  </Col>

                ))}

              </Row>


 

              <Divider />


 

              <Title level={4}>Sponsored Pins</Title>

              <Row>

                {pins.map((pin) => (

                  <Col key={pin.id} md={4}>

                    <Link to={`/sponseredBoard/${pin.id}`}>

                      <div className="card-container5">

                        <div className="card5">

                          <img className="card-img5" src={pin.imageUrl} alt={pin.title} style={{ height: '200px' }} />

                          <div className="card-body5">

                            <Title level={5}>{pin.title}</Title>

                            <div className="card-actions5">

                              <button className="action-btn5">

                                <HeartOutlined /> Like

                              </button>

                              <button className="action-btn5">

                                <ShareAltOutlined /> Share

                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </Link>

                  </Col>

                ))}

              </Row>

            </Col>

          </Row>

        </Container>

      </Content>

    </Layout>

  );

};


 

export default BusinessProfile;