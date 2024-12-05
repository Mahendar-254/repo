import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Button, Input, List, Spin, message, Avatar } from 'antd';

import { FaUserPlus, FaUserFriends } from 'react-icons/fa';

import { UserOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';




 

interface User {

  id: number;

  username: string;

  requestStatus: 'Requested' | 'Pending' | 'Accepted';

  userDTO : {id:number};

}


 

interface LoginDetails {

  email: string,

  password: string;

}



 

interface Invitation {

  userId: number;

  inviterId: number;

  description: string;

  status: string;

}


 

const FindFriends: React.FC = () => {


 

  // const [invit, ]

  var userId: number;


 

  const [status, setStatus] = useState("Accept Request");


 

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);


 

  const apiUrl = 'http://localhost:8700/api/users';

  var loginCred: LoginDetails;


 

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await axios.get<User[]>(apiUrl);

       

        console.log(response.data)

         setUsers(response.data);

        setLoading(false);

      } catch (error) {

        message.error('Error loading users');

        setLoading(false);

      }



 

    };

    fetchUsers();

  }, []);




 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSearchTerm(e.target.value);

  };


 

  const filteredUsers = users.filter((user) =>

    user.username.toLowerCase().includes(searchTerm.toLowerCase())

  );


 

  const handleSendRequest = async (id: number) => {

    setLoadingRequest(true);


 

    try {

      await axios.post(`${apiUrl}/friend-request`, { userId: id });


 

      const updatedUsers = users.map((user) =>

        user.id === id ? { ...user, requestStatus: 'Pending' } : user

      );

     

      message.success('Friend request sent');

    } catch (error) {

      message.error('Error sending friend request');

    } finally {

      setLoadingRequest(false);

    }

  };


 

  const sendInvitation = async (follower:number) =>{


 

    let loginCredentials = localStorage.getItem("credentials");

      if (loginCredentials) {

        loginCred = JSON.parse(loginCredentials);

      }


 

    await axios.get("http://localhost:8700/api/users/email/" + loginCred.email)

      .then(response => {

        console.log(response.data)

        userId = response.data.id;

      }).catch(error => {

        console.log(error)

      })

    await axios.post(`http://localhost:8700/api/users/${follower}/follow/${userId}`, ).then(response=>{

      console.log(response.data)

      setStatus("Friends")

    }).catch(error=>{

      console.log(error)

    })

  }

 const navigate=useNavigate();

  const handleAcceptRequest = (id: number) => {


 

    sendInvitation(id);

    navigate("/profile")

  };

  const goBack = (event: any): void => {

    navigate("/home");

}

  return (

   

    <div className="find-friends">

      <Button type="primary" onClick={goBack} className="edit-profile-button col-3" style={{ width: '10%' }}>Back</Button>

      <Input

        placeholder="Search for friends..."

        value={searchTerm}

        onChange={handleSearchChange}

        style={{ width: '300px', marginBottom: '20px' }}

      />


 

      {loading ? (

        <Spin tip="Loading..." />

      ) : filteredUsers.length === 0 ? (

        <p>No users found</p>

      ) : (

        <List

          itemLayout="horizontal"

          dataSource={filteredUsers}

          renderItem={(user:any) => (

            <List.Item

              actions={[

                user.requestStatus === 'Requested' ? (

                  <Button

                    icon={<FaUserPlus />}

                    type="primary"

                    onClick={() => handleSendRequest(user.id)}

                  >

                    Accept Request

                  </Button>

                ) : user.requestStatus === 'Pending' ? (

                  <Button disabled icon={<FaUserFriends />}>

                    Request Pending

                  </Button>

                ) : (

                  <Button

                    icon={<FaUserFriends />}

                    type="dashed"

                    onClick={() => handleAcceptRequest(user.id)}

                  >

                   {status}

                  </Button>

                ),

              ]}

            >

              <List.Item.Meta

                avatar={<Avatar icon={<UserOutlined />} />}

                title={user.username}

                description={`Status: ${user.requestStatus}`}

              />

            </List.Item>

          )}

        />

      )}

    </div>

  );

};


 

export default FindFriends;