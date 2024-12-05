import { useEffect, useState } from "react";

import Footer from "../Component1/Footer";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../Component1/Header";

import { Link } from "react-router-dom";

import "./Home.css"; // Custom CSS for the page (optional)


 

type Pins = {

    pinId: string;

    title: string;

    description: string;

    isPrivate: string;

    imageUrl: string;

};


 

const Home: React.FC = () => {

    const [images, setImages] = useState<Pins[]>();


 

    useEffect(() => {

        homePageImages();

    }, []);


 

    const homePageImages = () => {

        axios

            .get("http://localhost:8701/api/pins/")

            .then((response) => {

                setImages(response.data);

            })

            .catch((error) => {

                console.log("Error occurred while fetching images...");

            });

    };


 

    return (

        <div>

            <Header />

            <div className="container mt-4">

                <div className="row">

                    {images?.map((image, index) => {

                        return (

                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>

                                <div className="card custom-card">

                                    <Link to={`/image/${image.pinId}`}>

                                        <img

                                            src={image.imageUrl}

                                            className="card-img-top custom-card-img"

                                            alt={image.title}

                                        />

                                    </Link>

                                   

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

            <Footer />

        </div>

    );

};


 

export default Home;


 