import React, { useState, useEffect } from "react";

import { Tabs, Card, Avatar, Button } from "antd";

import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';


 

const { TabPane } = Tabs;


 

type UserDTO = {

    id: number,

    email: string,

    username: string,

    password: string,

    profilePictureUrl: string,

    createdAt: string,

    updatedAt: string

}


 

const FollowersFollowing = () => {

  const { userId } = useParams<{ userId: string }>();

  const [following, setFollowing] = useState<UserDTO[]>([]);

  const [followers, setFollowers] = useState<UserDTO[]>([]);


 

  useEffect(() => {

    fetchFollowers();

    fetchFollowing();

  }, [userId]);


 

  const fetchFollowers = async () => {

    await axios.get(`http://localhost:8700/api/users/${userId}/followers`)

      .then(response => {

        setFollowers(response.data);

      })

      .catch(error => {

        console.log(error);

      });

  };


 

  const fetchFollowing = async () => {

    await axios.get(`http://localhost:8700/api/users/${userId}/following`)

      .then(response => {

        setFollowing(response.data);

      })

      .catch(error => {

        console.log(error);

      });

  };


 

  const navigate=useNavigate();

  const goBack = (event: any): void => {

    navigate("/profile");

}

  return (


 

    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>

      <Button type="primary" onClick={goBack} className="edit-profile-button col-3" style={{ width: '10%' }}>Back</Button>

      <Tabs defaultActiveKey="1" centered>

        <TabPane tab="Following" key="1">

          {following.map((person) => (

            <Card key={person.id} style={{ marginBottom: "10px" }}>

              <Card.Meta

                avatar={<Avatar src={person.profilePictureUrl} />}

                title={person.username}

                description="Following"

              />

            </Card>

          ))}

        </TabPane>

        <TabPane tab="Followers" key="2">

          {followers.map((person) => (

            <Card key={person.id} style={{ marginBottom: "10px" }}>

              <Card.Meta

                avatar={<Avatar src={person.profilePictureUrl} />}

                title={person.username}

                description="Follower"

              />

            </Card>

          ))}

        </TabPane>

      </Tabs>

    </div>

  );

};


 

export default FollowersFollowing;