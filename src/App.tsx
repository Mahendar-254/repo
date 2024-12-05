import './App.css';

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

import Main from './Component1/Main';

import CreatePin from './Component3/CreatePin';

import CreatePop from './Component3/CreatePop';

import Register from './Component1/Register';

import Login from './Component1/Login';

import Home from './Component2/Home';

import SearchBar from './Component2/Searchbar';

import CreateBoard from './Component3/CreateBoard';

import UserProfile from './Component2/UserProfile';

import BoardPins from './Component2/BoardPins';

import FollowersFollowing from './Component2/FollowersFollowing';

import DisplayPin from './Component2/DisplayPin';

import FindFriends from './Component2/FindFriends';

import ProtectedRoute from './Component1/ProtectedRoute';

import ForgotPassword from './Component1/ForgetPassword';

import BusinessProfile from './BusinessProfile/BusinessProfile';

import BoardDetails from './BusinessProfile/BoardDetails';


 

function App() {

  return (

    <Router>

   

      <Routes>

     

        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Main/>}/>

        <Route path="/login" element={<Login />} />

        <Route path="/update-password" element={<ForgotPassword/>}/>

        <Route path="/home" element={<ProtectedRoute component={Home}/>} />

        <Route path="/search" element={ <ProtectedRoute component={ SearchBar}/>} />

        <Route path="/create-pin" element={<ProtectedRoute component={CreatePin}/>} />

        <Route path="/create" element={<ProtectedRoute component={CreatePop}/>} />

        <Route path="/friends" element={<ProtectedRoute component={FindFriends}/>} />

        <Route path="/profile" element={<ProtectedRoute component={UserProfile}/>} />

        <Route path="/create-board" element={<ProtectedRoute component={CreateBoard}/>} />

        <Route path={`/board-pins/:id`} element={<ProtectedRoute component={BoardPins}/>} />

        <Route path={`/followersfollowing/:userId`} element={<ProtectedRoute component={FollowersFollowing}/>} />

       {/* <Route path="/followers-list/:userId" element={<FollowersList/>}/> */}

       <Route path={`/image/:id`} element={<ProtectedRoute component={DisplayPin}/>} />

       <Route path="/sponsered" element={<ProtectedRoute component={BusinessProfile}/>}/>

       <Route path='/sponseredBoard/:id' element={<ProtectedRoute component={BoardDetails}/>}/>

       <Route path={`draft/:draftId`} element={<CreatePin/>} />

      </Routes>

    </Router>

  );

}

//

export default App;

//