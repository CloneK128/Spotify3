import React, { useContext } from "react";
import SideBar from "./SideBar";
import Player from "./Player";
import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";

function Home(props) {
  const { audioRef, track } = useContext(PlayerContext)
  return (
    <div className="h-screen bg-black	" >
      <div className="h-[90%] flex">
        <SideBar />
        <Display />
      </div>
      <div>
        <Player />
        <audio ref={audioRef} src={track.file} preload="auto"></audio>
      </div>
    </div>
  );
}

export default Home;