import axios from 'axios';

import React, { useState, useEffect } from 'react';

import { FaFileImage, FaVideo, FaPen, FaInfoCircle, FaLock, FaUnlock } from 'react-icons/fa';

import { Modal, Button } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';


 

interface LoginDetails {

    email: string,

    password: string;

}


 

type NewPin = {

    title: string,

    description: string,

    imageUrl: string,

    videoUrl: string,

    isPrivate: string

}


 

interface DraftPin {

    title : string;

    description : string;

    imageUrl : string;

    videoUrl : string;

    userDTO : { id : number};

    boardDTO : { id : number};

}


 

const CreatePin: React.FC = () => {


 

    const {draftId} = useParams<{draftId: string}>();


 

    var loginCred: LoginDetails;

    let loginCredentials = localStorage.getItem("credentials");

    if (loginCredentials) {

      loginCred = JSON.parse(loginCredentials);

    }


 

    const [pin, setPin] = useState<NewPin>({

        title: '',

        description: '',

        imageUrl: '',

        videoUrl: '',

        isPrivate: 'public'

    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();


 

    const [draftPin, setDraftPin] = useState<DraftPin>();


 

    useEffect(() => {

        const savedDraft = localStorage.getItem('draftPin');

        if (savedDraft) {

            setPin(JSON.parse(savedDraft));

        }

        if(draftId) {

            getDetails();

        }


 

    }, []);



 

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        axios.post("http://localhost:2004/api/pins/", pin)

            .then(response => {

                setPin(response.data);

                console.log("Pin successfully created");

                setIsModalOpen(true);

                localStorage.removeItem('draftPin');

            }).catch(error => {

                console.log("Can't create pin.");

            });


 

            if(draftId) {

                axios.delete("http://localhost:2004/api/drafts/" + draftId).then(response=>{

                    console.log("Draft deleted")

                }).catch(error=>{

                    console.log("Error occurred while deleting draft")

                })

              }

    };


 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value } = e.target;

        setPin({

            ...pin,

            [name]: value

        });

    };


 

    var userId: number;


 

    const handleSaveDraft = async () => {


 

        await axios.get("http://localhost:2004/api/users/email/" + loginCred.email)

          .then(response => {

            console.log(response.data)

            userId = response.data.id;

            console.log(userId)

          }).catch(error => {

            console.log(error)

          })


 

         


 

        getBoard();


 

        console.log("pin")

        console.log(pin)


 

        setDraftPin({

            ...draftPin,

            title : pin.title,

            description : pin.description,

            imageUrl : pin.imageUrl,

            videoUrl : pin.videoUrl,

            userDTO : { id : userId},

            boardDTO : { id : 1}

        })

        // console.log("DraftPin")

        // console.log(draftPin)

        // console.log("Pin")

        // console.log(pin)


 

        await axios.post("http://localhost:2004/api/drafts/", draftPin)

        .then(response => {

            console.log("Drafts")

            console.log(response.data);

        }).catch(error => {

            console.log(error);

        })

       

        alert('Pin saved as draft!');

    };


 

    const getBoard = async() => {

        await axios.get("http://localhost:2005/api/boards/user/" + userId).then(response => {

            console.log(response.data)

            console.log(userId)

          }).catch(error => {

              console.log(userId)

              console.log("Error message");

            console.log(error)

          })

    }


 

    const handleSave = () => {

        setIsModalOpen(false);

        navigate('/home');

    };


 

    const handleBack = () => {

        setIsModalOpen(false);

        navigate('/create');

    };


 

    const getDetails = () => {

        if(draftId){

            axios.get("http://localhost:2004/api/drafts/getdraft/" + draftId)

            .then(response=>{


 

                console.log(response.data)


 

                setPin({

                    title: response.data.title,

                    description: response.data.description,

                    imageUrl: response.data.imageUrl,

                    videoUrl: response.data.videoUrl,

                    isPrivate: response.data.isPrivate

                })

            })

        }

    }


 

    return (

        <>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

                <div className="card border-danger shadow-lg" style={{ width: '30rem' }}>

                    <div className="card-body">

                        <h2 className="card-title text-center text-danger" style={{ textDecoration: 'underline' }}>

                            Create Pin

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group mb-3">

                                <label htmlFor="title" className="form-label"><FaPen className="mr-2"/> Title</label>

                                <input

                                    type="text"

                                    id="title"

                                    className="form-control"

                                    name="title"

                                    value={pin.title}

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

                                    value={pin.description}

                                    onChange={handleChange}

                                    required

                                ></textarea>

                            </div>

                            <div className="form-group mb-3">

                                <label htmlFor="imageUrl" className="form-label"><FaFileImage className="mr-2"/> Image URL</label>

                                <input

                                    type="url"

                                    id="imageUrl"

                                    name="imageUrl"

                                    className="form-control"

                                    value={pin.imageUrl}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="form-group mb-3">

                                <label htmlFor="videoUrl" className="form-label"><FaVideo className="mr-2"/> Video URL</label>

                                <input

                                    type="url"

                                    id="videoUrl"

                                    name="videoUrl"

                                    className="form-control"

                                    value={pin.videoUrl}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="form-group mb-3">

                                <label htmlFor="isPrivate" className="form-label"><FaLock className="mr-2"/> Visibility</label>

                                <select

                                    id="isPrivate"

                                    name="isPrivate"

                                    className="form-control"

                                    value={pin.isPrivate}

                                    onChange={handleChange}

                                >

                                    <option value="public"><FaUnlock className="mr-2"/> Public</option>

                                    <option value="private"><FaLock className="mr-2"/> Private</option>

                                </select>

                            </div>

                            <button type="submit" className="btn btn-danger w-100 mb-2">

                                Create Pin

                            </button>

                            <div>

                                <button type="button" className="btn btn-outline-primary w-100 mb-2" onClick={handleSaveDraft}>

                                    Save as Draft

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>


 

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>

                <Modal.Header closeButton>

                    <Modal.Title>Pin Created Successfully</Modal.Title>

                </Modal.Header>

                <Modal.Body className="text-center">

                    <h4 className="mb-4" style={{ color: '#D9534F', fontWeight: 'bold' }}>{pin.title}</h4>

                    {pin.imageUrl && (

                        <div className="d-flex justify-content-center align-items-center p-3">

                            <img

                                src={pin.imageUrl}

                                alt={pin.title}

                                className="img-fluid"

                                style={{ transition: 'transform 0.5s', transform: 'scale(1)', cursor: 'pointer', maxWidth: '100%', maxHeight: '100%' }}

                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}

                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}

                            />

                        </div>

                    )}

                    <p className="mt-4" style={{ fontStyle: 'italic' }}>{pin.description}</p>

                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">

                    <Button variant="secondary" onClick={handleBack} className="me-2">

                        Back

                    </Button>

                    <Button variant="primary" onClick={handleSave}>

                        Save

                    </Button>

                </Modal.Footer>

            </Modal>

        </>

    );

};


 

export default CreatePin;