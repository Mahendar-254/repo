import pinIcon from '../Assests/pin.png';

import board from '../Assests/collage.png';

import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


 

const CreatePop: React.FC = () => {

  const navigate = useNavigate();


 

  const goBack = () => {

    navigate("/home");

  };


 

  return (

    <div className="d-flex flex-column justify-content-center align-items-center vh-100">

      <div className="mb-4">

        <button

          className="btn btn-secondary btn-lg"

          onClick={goBack}

          style={{ position: 'absolute', top: '20px', left: '20px' }}

        >

          <i className="fas fa-arrow-left"></i> Back

        </button>

      </div>

      <div className="p-4 border bg-light shadow-sm rounded">

        <div className="d-flex justify-content-around mb-2">

          <Link to="/create-pin" className="text-decoration-none text-center mr-4">

            <div className="p-3 border-0 shadow-sm rounded">

              <img

                src={pinIcon}

                alt="Pin Icon"

                className="img-fluid mb-2"

                style={{ maxWidth: '150px', height: 'auto' }}

              />

              <p className="m-0 text-dark font-weight-bold">Create New Pin</p>

            </div>

          </Link>

          <Link to="/create-board" className="text-decoration-none text-center mr-4">

            <div className="text-center p-3 border-0 shadow-sm rounded ml-4">

              <img

                src={board}

                alt="Board Icon"

                className="img-fluid mb-2"

                style={{ maxWidth: '150px', height: 'auto' }}

              />

              <p className="m-0 text-dark font-weight-bold">Create New Board</p>

            </div>

          </Link>

        </div>

      </div>

    </div>

  );

};


 

export default CreatePop;