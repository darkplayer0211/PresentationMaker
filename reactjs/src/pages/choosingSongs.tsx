import { useEffect, useState } from 'react';
import '../css/pages/choosingSongs.css'
import DefaultLayout from '../layouts/DefaultLayout';
import  { SongType, songTypes, chooseSongType, chooseSong } from '../store/song/song';
import { useDispatch, useSelector } from 'react-redux';

interface ChoosingSongsProps {

} // Define your props interface if needed

const ChoosingSongs: React.FC<ChoosingSongsProps> = () => {

    const [chosenSongType, setChosenSongType] = useState(0);
    const songState = useSelector((state: {song: {chosenSongType: string, songs: SongType[]}}) => state.song);
    
    const [songs, setSongs] = useState<SongType[]>(songState.songs);
    const [songQuery, setSongQuery] = useState('');
    const dispatch = useDispatch();

    const handleSongTypeChoose = (songType: string) => {
        setChosenSongType(songTypes.indexOf(songType));
        dispatch(chooseSongType(songType));
    }

    const handleBack = () => {
        window.history.back();
    }

    const handleSongChoose = (songName: string) => {
        dispatch(chooseSong(songName));
    }

    const searchSong = (songs : SongType[], query: string) => {
        return songs.filter((song) => {
            return song.name.toLowerCase().includes(query.toLowerCase()) || song.lyrics.toLowerCase().includes(query.toLowerCase());
        });
    }

    const handleSearch = (query: string) => {
        setSongQuery(query);
        setSongs(searchSong(songState.songs, query));
    }

    useEffect(() => {
        setSongs(searchSong(songState.songs, songQuery));
        console.log("rerender")
    }, [songState])

    return (
        <DefaultLayout>
            <div className='choosingSongs'>
                <div className='choosingSongs_songType'>
                    <ul>
                        {songTypes.map((songType, index) => (
                            <li
                            key={index}
                            className={chosenSongType === index ? 'activeSongType' : ''}
                            onClick={() => handleSongTypeChoose(songType)}
                            id={index.toString()}>
                                {songType}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='choosingSongs_content'>
                    <div className='choosingSongs_songList'>
                        <input
                        onChange={(e) => handleSearch(e.target.value)}
                        className='choosingSongs_songList_search' type='text' placeholder='Tìm bài hát'/>
                        <ul>
                            {songs.map((song, index) => (
                                <li
                                onClick={() => handleSongChoose(song.name)}
                                key={index}>
                                <p className='choosingSongs_songList_songName'>{song.name}</p>
                                <p className='choosingSongs_songList_lyrics'>{song.lyrics}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className='choosingSongs_edit'>
                        <div className='choosingSongs_edit_preview'>
                            <div className='choosingSongs_edit_preview_slide'>

                            </div>
                            <div className='choosingSongs_edit_preview_slideList'>

                            </div>
                        </div>
                        <div className='choosingSongs_preview_buttons'>
                            <button className='choosingSongs_preview_buttons_export'>Xuất file</button>
                            <button onClick={() => handleBack()} className='choosingSongs_preview_buttons_back'>Trở về</button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default ChoosingSongs;