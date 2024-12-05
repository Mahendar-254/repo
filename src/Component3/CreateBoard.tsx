import axios from 'axios';

import React, { useEffect, useState } from 'react';

import { FaPen, FaInfoCircle, FaLock, FaUnlock } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';



 

interface LoginDetails {

    email: string,

    password: string;

}


 

type NewBoard = {

    name: string,

    description: string,

    isPrivate: string,

    boardPoster: string,

    userDTO : {id:number}

}


 

const CreateBoard: React.FC = () => {

    var [board, setBoard] = useState<NewBoard>({

        name: '',

        description: '',

        isPrivate: 'public',

        boardPoster:'',

        userDTO: {id:0}

    });


 

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

       

        console.log(userId)

        board.userDTO.id = userId

        console.log(board.userDTO.id);

       

        postBoard();

    };


 

    const Navigate = useNavigate();


 

    var postBoard = async ()=>{

        await axios.post("http://localhost:2004/api/boards/", board)

        .then(response=>{

            console.log(response.data)

            Navigate("/home")

        })

        .catch(error=>{

            console.log(error)

        })

    }




 

    var loginCred: LoginDetails;



 

    useEffect(() => {


 

        let loginCredentials = localStorage.getItem("credentials");

        if (loginCredentials) {

          loginCred = JSON.parse(loginCredentials);

        }

        getUserByEmail();

   

      }, [board])

   

      var userId: number;

   

      const getUserByEmail = async () => {

        await axios.get("http://localhost:2005/api/users/email/" + loginCred.email)

          .then(response => {

            console.log(response.data)

            userId = response.data.id;

          }).catch(error => {

            console.log(error)

          })

   

        await axios.get("http://localhost:2005/api/boards/user/" + userId).then(response => {

          console.log(response.data)

          console.log(userId)

        }).catch(error => {

          console.log(error)

        })


 

       

   

      }

   


 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value } = e.target;


 

        setBoard({

            ...board,

            [name]: value

        });

    };


 

    return (

        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

            <div className="card border-primary shadow-lg" style={{ width: '30rem' }}>

                <div className="card-body">

                    <h2 className="card-title text-center text-primary" style={{ textDecorationLine: 'underline' }}>

                        Create Board

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group mb-3">

                            <label htmlFor="name" className="form-label"><FaPen className="mr-2"/> Name</label>

                            <input

                                type="text"

                                id="name"

                                className="form-control"

                                name="name"

                                value={board.name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group mb-3">

                            <label htmlFor="description" className="form-label"><FaInfoCircle className="mr-2"/> Description</label>

                            <textarea

                                id="description"

                                className="form-control"

                                name="description"

                                value={board.description}

                                onChange={handleChange}

                                required

                            ></textarea>

                        </div>


 

                        <div className="form-group mb-3">

                            <label htmlFor="boardPoster" className="form-label"><FaPen className="mr-2"/>boardPoster</label>

                            <input

                                type="url"

                                id="boardPoster"

                                className="form-control"

                                name="boardPoster"

                                value={board.boardPoster}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group mb-3">

                            <label htmlFor="isPrivate" className="form-label"><FaLock className="mr-2"/> isPrivate</label>

                            <select

                                id="isPrivate"

                                name="isPrivate"

                                className="form-control"

                                value={board.isPrivate}

                                onChange={handleChange}

                            >

                                <option value="public"><FaUnlock className="mr-2"/> Public</option>

                                <option value="private"><FaLock className="mr-2"/> Private</option>

                            </select>

                        </div>

                        <button type="submit" className="btn btn-primary w-100">

                            Create Board

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};


 

export default CreateBoard;