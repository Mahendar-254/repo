import { notification } from "antd";

import axios from "axios";

import { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router-dom";


 

type Pin = {

    title: string;

    description: string;

    imageUrl: string;

}



 

const DisplayPin: React.FC = () => {


 

    const Navigate = useNavigate();


 

    const { id } = useParams<{ id: string }>();


 

    const [pin, setPin] = useState<Pin>();


 

    useEffect(() => {

        axios.get("http://localhost:8701/api/pins/" + id)

            .then(reponse => {

                setPin(reponse.data)

            })

    }, [])


 

    const deletePin = () =>{

        axios.delete("http://localhost:8701/api/pins/" + id)

        .then(response=>{

            console.log("Deleted")

            setTimeout(()=> Navigate("/home"), 2000)

            notification.success({

                message: 'Pin Deleted',

                description: 'Pin has been successfully deleted.',

                duration:2  

            })

        }).catch(error=>{

            console.log("Error")

        })

    }


 

   


 

    return (

        <div className="main-block">

            <div className="card pin-card" style={{border:"10px solid rgb(226, 43, 55)"}}>

                <div className="card-img-top pin-img-container">

                    <img src={pin?.imageUrl} alt="img" className="pin-image" />

                </div>

                {/* <div className="card-header">


 

            </div> */}

                <div className="card-body">

                    <h3 className="card-title">{pin?.title}</h3>

                    {pin?.description}

                </div>

                <div className="card-footer d-flex space-between">

                    <button className="btn btn-danger" onClick={deletePin}>Delete</button>

                </div>

            </div>

        </div>

    )

}


 

export default DisplayPin;