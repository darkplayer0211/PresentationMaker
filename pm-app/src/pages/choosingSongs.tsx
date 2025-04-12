import { useEffect, useState } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { songsStore, SongType } from "../store";
interface ChoosingSongsProps {} // Define your props interface if needed

const ChoosingSongs: React.FC<ChoosingSongsProps> = observer(() => {
  const handleBack = () => {
    window.history.back();
  };

  const { songs, searchSong } = songsStore;

  return (
    <DefaultLayout>
      <div className="choosingSongs">
        <div className="choosingSongs_content">
          <div className="choosingSongs_songList">
            <input
              onChange={(e) => searchSong(e.target.value)}
              className="choosingSongs_songList_search"
              type="text"
              placeholder="Tìm bài hát"
            />
            <ul>
              {songs.map((song: SongType, index: number) => (
                <li
                  key={index}
                  className={song.isChosen ? "activeSongType" : ""}
                  onClick={() => song.setIsChosen(!song.chosen)}
                  id={index.toString()}
                >
                  {song.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="choosingSongs_edit">
            <div className="choosingSongs_edit_preview">
              <div className="choosingSongs_edit_preview_slide"></div>
              <div className="choosingSongs_edit_preview_slideList"></div>
            </div>
            <div className="choosingSongs_preview_buttons">
              <button className="choosingSongs_preview_buttons_export">
                Xuất file
              </button>
              <button
                onClick={() => handleBack()}
                className="choosingSongs_preview_buttons_back"
              >
                Trở về
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
});

export default ChoosingSongs;
