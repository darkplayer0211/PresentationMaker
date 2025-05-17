import { useEffect } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { songsStore, SongType } from "../store";
import listSong from "../database/listSong.json"
interface ChoosingSongsProps { } // Define your props interface if needed

const ChoosingSongs: React.FC<ChoosingSongsProps> = observer(() => {
  const initSongs: Array<SongType> = JSON.parse(JSON.stringify(listSong));
  const handleBack = () => {
    window.history.back();
  };

  const { songs, searchSong } = songsStore;

  useEffect(() => {
    const init = async () => {
      songsStore.setSongs(initSongs);
    }
    init();
  }, []);

  const handleChonsen = (song: SongType) => {
    song.setIsChosen(true);
  };

  const handleCancleChosen = (song: SongType) => {
    song.setIsChosen(false);
  };

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
                <div className={`choosingSongs_songList_item ${song.isChosen ? "activeSongType" : ""}`} key={index}>
                  <li
                    key={index}
                    onClick={() => handleChonsen(song)}
                    id={index.toString()}
                  >
                    Tên: {song.slides[0].title.text}
                  </li>
                  {song.isChosen && (
                    <button
                      onClick={() => handleCancleChosen(song)}>
                      Bỏ chọn
                    </button>)
                  }

                </div>
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
