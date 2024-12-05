import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Spinner } from 'react-bootstrap';

import { Layout, Typography, Divider } from 'antd';

import { FaPinterest } from 'react-icons/fa';

import axios from 'axios';

import './Sponsored.css';

import { useParams } from 'react-router-dom';


 

const { Title } = Typography;

const { Content } = Layout;


 

interface Board {

  id: number;

  title: string;

  description: string;

  logoUrl: string;

  websiteUrl: string;

}




 

const BoardDetails: React.FC = () => {


 

    const {id} = useParams<{id:string}>();


 

  const [board, setBoard] = useState<Board | null>(null);

  const [loading, setLoading] = useState<boolean>(true);


 

  useEffect(() => {

    const fetchBoardDetail = async () => {

      try {

        const boardResponse = await axios.get(`http://localhost:8704/api/business_profiles/${id}`);

        setBoard(boardResponse.data);

        setLoading(false);

      } catch (error) {

        console.error('Error fetching board details:', error);

        setLoading(false);

      }

    };


 

    fetchBoardDetail();

  }, [id]);


 

  if (loading) {

    return (

      <div className="text-center my-5">

       

        <Spinner animation="border" variant="primary" />

      </div>

    );

  }


 

  if (!board) {

    return <div>No board found</div>;

  }


 

  return (

    <Layout>

      <Content>

        <Container fluid>

          <Row className="justify-content-center my-5">

            <Col md={8}>

              <FaPinterest size={40} />

              <Title level={2}>Board Details: {board.title}</Title>

              <Divider />

             

              <div className="board-detail1">

                <div className="card">

                  {/* Image with improved styling */}

                  <img className="card-img2" src={board.logoUrl} alt={board.title} />

                  <div className="card-body2">

                    <Title level={4}>{board.title}</Title>

                    <p>{board.description}</p>

                    <a href={board.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">

                      Visit Website

                    </a>

                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </Content>

    </Layout>

  );

};


 

export default BoardDetails;