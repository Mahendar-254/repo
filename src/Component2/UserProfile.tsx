import { useEffect, useState } from 'react';

import { Row, Col, Button, Card, Avatar } from 'antd';

import { Link } from 'react-router-dom';

import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import axios from 'axios';

import './UserProfile.css'; // Optional Custom CSS


 

interface LoginDetails {

  email: string;

  password: string;

}


 

interface DraftPin {

  draftId : number;

  title : string;

  description : string;

  imageUrl : string;

  videoUrl : string;

  userDTO : { id : number};

  boardDTO : { id : number};

}


 

interface UserBoard {

  id: number;

  name: string;

  description: string;

  boardPoster: string;

}


 

const UserProfile = () => {

  const [boards, setBoards] = useState<UserBoard[]>();

  const [proPic, setProPic] = useState('');

  const [userName, setUserName] = useState('');

  const [countFollowers, setCountFollowers] = useState(0);

  const [countFollowing, setCountFollowing] = useState(0);

  const [userId, setUserId] = useState(0);


 

  // Define state for drafts

  const [draftPins, setDraftPins] = useState<DraftPin[]>([]);


 

  // Login credentials from localStorage

  const loginCred: LoginDetails = JSON.parse(localStorage.getItem('credentials') || '{}');


 

  useEffect(() => {

    // Fetch user profile data (username, profile picture, followers, following)

    getUserByEmail();

  }, []);


 

  const getDraftPins = (userId:number)=>{


 

   axios.get("http://localhost:8701/api/drafts/" + userId)

    .then(response=>{

    setDraftPins(response.data)

  })

}


 

  // Fetch user profile data by email

  const getUserByEmail = async () => {

    try {

      // Fetch user info by email

      const response = await axios.get(`http://localhost:8700/api/users/email/${loginCred.email}`);

      setProPic(response.data.profilePictureUrl);

      setUserName(response.data.username);

      setUserId(response.data.id);


 

      // Fetch user boards

      await axios.get(`http://localhost:8701/api/boards/user/${response.data.id}`).then((res) => {

        setBoards(res.data);

      });


 

      // Fetch followers and following count

      getCountFollowers(response.data.id);

      getCountFollowing(response.data.id);

      getDraftPins(response.data.id);

     

    } catch (error) {

      console.log('Error fetching user data:', error);

    }

  };


 

  // Fetch followers count

  const getCountFollowers = async (userId: number) => {

    try {

      const response = await axios.get(`http://localhost:8700/api/users/followers/${userId}`);

      setCountFollowers(response.data);

    } catch (error) {

      console.log('Error fetching followers count:', error);

    }

  };


 

  // Fetch following count

  const getCountFollowing = async (userId: number) => {

    try {

      const response = await axios.get(`http://localhost:8700/api/users/following/${userId}`);

      setCountFollowing(response.data);

    } catch (error) {

      console.log('Error fetching following count:', error);

    }

  };


 

  // Logout function

  const logout = () => {

    localStorage.clear();

    window.location.href = '/login'; // Redirect to login page after logout

  };


 

  return (

    <div className="container mt-5">

      <div className="text-start mb-4">

        <Button type="primary" onClick={logout} block className="edit-profile-button col-3" style={{ width: '10%' }}>

          Logout

        </Button>

      </div>


 

      <Row justify="center">

        <Col span={8}>

          <div className="text-center mb-4">

            <Avatar size={120} src={proPic} className="profile-avatar" style={{ border: '5px solid #dcdcdc' }} />

            <h2 className="mt-3">{userName}</h2>

            <h3 className="text-muted">

              <Link to={`/followersfollowing/${userId}`} className="followers-following-link">

                <UserAddOutlined className="mr-2" />

                {countFollowers} Followers &nbsp;

                <UsergroupAddOutlined className="mr-2" />

                {countFollowing} Following

              </Link>

            </h3>

          </div>

        </Col>

      </Row>


 

      <Row justify="center">

        <Col span={8}>

          <Button type="primary" block className="edit-profile-button">

            Edit Profile

          </Button>

        </Col>

      </Row>


 

      {/* User's Boards Section */}

      <Row className="mt-4">

        <Col span={24}>

          <h4 className="mb-4">My Boards</h4>

          <div className="d-flex flex-wrap justify-content-start">

            {boards?.map((board, index) => {

              return (

                <Card

                  key={index}

                  hoverable

                  style={{ width: 240, margin: '10px' }}

                  cover={

                    <Link to={`/board-pins/${board.id}`}>

                      <img

                        alt="Board"

                        src={board.boardPoster}

                        style={{ height: '200px', maxWidth: '100%', minWidth: '100%', padding: '10px' }}

                      />

                    </Link>

                  }

                >

                  <Card.Meta title={board.name} description={board.description} />

                </Card>

              );

            })}

          </div>

        </Col>

      </Row>


 

      {/* Draft Pins Section */}

      <Row className="mt-4">

        <Col span={24}>

          <h4 className="mb-4">My Draft Pins</h4>

          <div className="d-flex flex-wrap justify-content-start">

            {draftPins.length === 0 ? (

              <p>No draft pins available</p>

            ) : (

              draftPins.map((pin, index) => (

                <Card

                  key={index}

                  hoverable

                  style={{ width: 240, margin: '10px' }}

                  cover={

                    <Link to={`/draft/${pin.draftId}`}>

                      <img

                        alt="Pin"

                        src={pin.imageUrl}

                        style={{ height: '200px', maxWidth: '100%' }}

                      />

                    </Link>

                  }

                >

                  <Card.Meta title={pin.title} description={pin.description} />

                </Card>

              ))

            )}

          </div>

        </Col>

      </Row>

    </div>

  );

};


 

export default UserProfile;