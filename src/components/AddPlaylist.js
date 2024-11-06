import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import NavBar from './NavBar';
import axios from 'axios';

const AddPlaylist = () => {
    const [playlistImage, setPlaylistImage] = useState(assets.playlist_icon || "default_icon_url");
    const [playlistName, setPlaylistName] = useState("My Playlist");
    const [isEditing, setIsEditing] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // State để theo dõi trạng thái thanh tìm kiếm

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/songs`);
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    // Lọc bài hát theo searchTerm khi searchTerm thay đổi
    useEffect(() => {
        if (searchTerm) {
            const filtered = songs.filter(song =>
                song.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs([]);
        }
    }, [searchTerm, songs]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPlaylistImage(imageUrl);
        }
    };

    const handleNameChange = (event) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            setIsEditing(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="bg-[#121212] text-white min-h-screen p-8">
                <div className="flex items-center gap-6">
                    <div className="w-48 h-48 bg-[#242424] flex items-center justify-center rounded-md cursor-pointer relative overflow-hidden">
                        <img
                            src={playlistImage}
                            alt="Playlist"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageUpload}
                        />
                    </div>

                    <div>
                        <p className="text-sm uppercase text-gray-400">Playlist</p>
                        {isEditing ? (
                            <input
                                type="text"
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                                onKeyDown={handleNameChange}
                                onBlur={handleNameChange}
                                autoFocus
                                className="text-6xl font-bold bg-transparent outline-none border-none text-white"
                            />
                        ) : (
                            <h1
                                className="text-6xl font-bold cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                {playlistName}
                            </h1>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <img
                                src={assets.user_icon || "default_user_icon_url"}
                                alt="User"
                                className="w-6 h-6 rounded-full"
                            />
                            <p className="text-sm text-gray-400">CloneK •</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center border-b border-gray-700 pb-4">
                    <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                            <span className="text-xl text-gray-400">•••</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-sm text-gray-400">List</p>
                    </div>
                </div>

                {/* Phần tìm kiếm */}
                <div className="mt-6">
                    <p className="text-xl font-bold mb-2">Let's find something for your playlist</p>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for songs or episodes"
                            className="w-full p-4 pl-10 bg-gray-800 text-gray-300 rounded-full focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearching(true)} // Hiển thị kết quả khi nhấn vào thanh tìm kiếm
                            onBlur={() => setTimeout(() => setIsSearching(false), 200)} // Ẩn kết quả khi rời khỏi thanh tìm kiếm
                        />
                        <span
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => setSearchTerm('')}
                        >
                            <i className="material-icons">close</i>
                        </span>
                    </div>
                </div>

                {/* Hiển thị kết quả tìm kiếm chỉ khi isSearching là true */}
                {isSearching && filteredSongs.length > 0 && (
                    <div className="mt-4">
                        {filteredSongs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={song.img}
                                        alt={song.name}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="text-white font-semibold">{song.name}</p>
                                        <p className="text-gray-400 text-sm">{song.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-400 text-sm">{song.name}</p>
                                    <button
                                        className="bg-gray-700 text-white rounded-full px-4 py-1 text-sm"
                                        onClick={() => console.log(`Added song ${song.id} to playlist`)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AddPlaylist;
