import React, { useState, useRef, useEffect } from 'react';

import { FaSearch, FaFilter } from 'react-icons/fa';

import Home from '../Component1/Footer';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'antd';


 

type Pins = {

    pinId: string,

    title: string,

    description: string,

    isPrivate: string,

    imageUrl: string,

    createdAt: string, // Assuming you have a createdAt field in your Pins object for sorting by date

    relevanceScore: number // Assuming you have a relevanceScore field in your Pins object for sorting by relevance

}


 

const SearchBar: React.FC = () => {

    const [query, setQuery] = useState('');

    const [images, setImages] = useState<Pins[]>([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();


 

    const handleSearch = (e: React.FormEvent) => {

        e.preventDefault();

        console.log('Search query:', query);

        getSearchImages();

    };


 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setQuery(e.target.value);

        console.log('Input changed:', e.target.value);

    };


 

    const handleFilter = (filter: string) => {

        console.log('Filter selected:', filter);

        if (filter === 'date') {

            const sortedImages = [...images].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setImages(sortedImages);

        } else if (filter === 'relevance') {

            const sortedImages = [...images].sort((a, b) => b.relevanceScore - a.relevanceScore);

            setImages(sortedImages);

        }

        setIsDropdownOpen(false);

    };


 

    const toggleDropdown = () => {

        setIsDropdownOpen(!isDropdownOpen);

    };


 

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

                setIsDropdownOpen(false);

            }

        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {

            document.removeEventListener('mousedown', handleClickOutside);

        };

    }, []);


 

    useEffect(() => {

        getSearchImages();

    }, [query]);


 

    const getSearchImages = () => {

        console.log(`http://localhost:8701/api/pins/search?keyword=${query}`);

        axios.get(`http://localhost:8701/api/pins/search?keyword=${query}`)

            .then(response => {

                setImages(response.data);

            }).catch(error => {

                console.log(error);

            });

    }


 

    const goBack = (event: any): void => {

        navigate("/home");

    }


 

    return (

        <>

            <div className="d-flex justify-content-start align-items-center mt-4" style={{ gap: '10px', width: '100%' }}>

                <Button type="primary" onClick={goBack} className="edit-profile-button col-3" style={{ width: '10%' }}>Back</Button>

                <form onSubmit={handleSearch} className="d-flex justify-content-center align-items-center position-relative" style={{ flex: 1 }}>

                    <div className="input-group" style={{ borderRadius: '25px', overflow: 'hidden', maxWidth: '600px', width: '100%' }}>

                        <span className="input-group-text" style={{

                            position: 'absolute',

                            left: '15px',

                            top: '50%',

                            transform: 'translateY(-50%)',

                            backgroundColor: 'transparent',

                            border: 'none',

                            padding: '0',

                            zIndex: 1

                        }}>

                            <FaSearch style={{ fontSize: '1.5rem', color: '#6c757d' }} />

                        </span>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search for Pins or boards..."

                            value={query}

                            onChange={handleChange}

                            style={{ borderRadius: '25px 0 0 25px', paddingLeft: '40px' }} // Space for the icon inside the input

                        />

                        <button type="submit" className="btn" style={{ backgroundColor: 'red', color: 'white', borderRadius: '0 25px 25px 0' }}>Search</button>

                    </div>

                    <div className="btn-group" ref={dropdownRef} style={{ marginLeft: '5px' }}>

                        <button type="button" className="btn" style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '10px 15px', height: '40px' }} onClick={toggleDropdown}>

                            <FaFilter style={{ fontSize: '1.5rem' }} />

                        </button>

                        {isDropdownOpen && (

                            <ul className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '100%', marginTop: '0' }}>

                                <li className="dropdown-item" onClick={() => handleFilter('relevance')}>Relevance</li>

                                <li className="dropdown-item" onClick={() => handleFilter('date')}>Date</li>

                                <li className="dropdown-item" onClick={() => handleFilter('popularity')}>Popularity</li>

                            </ul>

                        )}

                    </div>

                </form>

            </div>


 

            <div className="container mt-3">

                <div className="row">

                    {images?.map((image, index) => (

                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>

                            <div className="card">

                                <Link to={`/image/${image.pinId}`}><img src={image.imageUrl} className="card-img-top fixed-size" alt={image.title} /></Link>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


 

            <Home />

        </>

    );

};


 

export default SearchBar;