import axios from "axios";

import { useEffect, useState } from "react";

import { Avatar, Row, Col, Button } from 'antd';

import { Link, useParams } from "react-router-dom";


 

type AllPins = {

    title : string;

    imageUrl : string;

    description:string;

    pinId:string;

}



 

const BoardPins : React.FC = () =>{


 

    const [pins, setPins] = useState<AllPins[]>();


 

    const {id} = useParams<{id:string}>();


 

    useEffect(()=>{

        axios.get(`http://localhost:8701/api/pins/board/` + id)

        .then(response=>{

            setPins(response.data)

            console.log(response.data)

        })

        .catch(error=>{

            console.log(error)

        })

    },[])


 

    return(

        <div className="container mt-4">

      {/* <Row justify="center">

        <Col span={8}>

          <div className="text-center mb-4">

            <Avatar size={100} src={proPic} />

            <h2 className="mt-3">{userName}</h2>

          </div>

        </Col>

      </Row> */}

      {/* <Row justify="center">

        <Col span={8}>

          <Button type="primary" block>Edit Profile</Button>

        </Col>

      </Row> */}

      <Row className="mt-4">

        <Col span={24}>

          <h4>Pins</h4>

          <div className="d-flex flex-wrap">

            {/* Board cards go here */}

            {

              pins?.map((pin, index) => {

                return (

                  <div key={index} className="card m-2" style={{ width: '18rem' }}>

                    <Link to={`/image/${pin.pinId}`}><img src={pin.imageUrl} className="card-img-top fixed-size" alt="Board" /></Link>

                   

                  </div>

                )

              })

            }

            {/* Repeat for other boards */}

          </div>

        </Col>

      </Row>

    </div>

    )

}


 

export default BoardPins;