import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import axios from 'axios';
import { songsData } from "../assets/assets";
import Albumitem from "./Albumitem";
import Songitem from "./Songitem";

const DisplayHome = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await axios.get('http://localhost:3000/playlists');
            setAlbums(response.data);
            // console.log(albums);
        };
        fetchAlbums();

    }, []);

    return (
        <>
            <NavBar />
            <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {albums.map((item, index) => (<Albumitem key={index} name={item.name} id={item.id} title={item.name} image={item.img} />))}
                    {/* {albumsData.map((item, index) => (<Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))} */}

                </div>
            </div>
            <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
                <div className="flex overflow-auto">
                    {songsData.map((item, index) => (<Songitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}

                </div>
            </div>
        </>
    )
}
export default DisplayHome