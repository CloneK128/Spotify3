import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [volume, setVolume] = useState(1);
    const [isShuffle, setIsShuffle] = useState(false);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [login,setlogin]=useState("Login");
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }
    const replay = () => {
        audioRef.current.currentTime = 0; // Đưa bài hát về đầu
        audioRef.current.play(); // Phát lại ngay lập tức
        setPlayStatus(true);
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async () => {
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * 8) + 1;
            await setTrack(songsData[randomIndex]);
        } else if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
        }
        await audioRef.current.play();
        setPlayStatus(true);
    };
    
    // Hàm bật/tắt shuffle
    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const adjustVolume = (e) => {
        const volumeBarWidth = e.currentTarget.offsetWidth;
        const offsetX = e.nativeEvent.offsetX;
        const newVolume = offsetX / volumeBarWidth; // Tính toán giá trị âm lượng
        setVolume(newVolume); // Cập nhật giá trị âm lượng
    
        // Cập nhật âm lượng của audioRef
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])


    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,replay,
        playWithId,
        previous, next,
        seekSong,
        login,setlogin,
        volume, setVolume, // Thêm volume và setVolume vào context
        adjustVolume,
        isShuffle, toggleShuffle
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;