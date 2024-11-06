import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';



const Albumitem = ({ image, name, title, id }) => {
    const navigate = useNavigate()
    const [albums, setAlbums] = useState([]);

    const handleAlbumClick = (id) => {
        // Điều hướng tới trang chi tiết album
        navigate(`/albums/${id}`);
    };

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
            setAlbums(response.data);
            // console.log(albums);
        };
        fetchAlbums();

    }, []);

    return (
        <div onClick={() => navigate(`/album/${id}`)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            {/* <img className="rounded" src={image} alt="" /> */}
            <p className="font-bold mt-2 mb-1">{id}</p>
            <p className="text-slate-200 text-sm">{title}</p>
        </div>
    )
}

export default Albumitem