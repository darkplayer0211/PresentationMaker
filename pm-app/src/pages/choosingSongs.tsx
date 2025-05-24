import { useEffect, useState } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { slidesStore, songsStore, SongType } from "../store";
import listSong from "../database/listSong.json"
import { Slide } from "../store/slidesStore/slide";
interface ChoosingSongsProps { } // Define your props interface if needed

const ChoosingSongs: React.FC<ChoosingSongsProps> = observer(() => {
  const initSongs: Array<SongType> = JSON.parse(JSON.stringify(listSong));
  const initSlide: Slide = {
    slideNum: 0,
    title: {
      text: "",
      fontName: "",
      fontSize: 0
    },
    content: {
      text: "",
      fontName: "",
      fontSize: 0
    }
  };
  const [resultsongs, setResultsongs] = useState<SongType[]>([]);

  const handleBack = () => {
    window.history.back();
  };

  const { songs, searchSong } = songsStore;
  const { slides } = slidesStore;

  useEffect(() => {
    const init = async () => {
      songsStore.setSongs(initSongs);
      slidesStore.setSlides([]);
      setResultsongs(songs);
    }
    init();
  }, []);

  /**
   * Handle chosen song, mark the song as selected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleChonsen = (song: SongType) => {
    song.setIsChosen(true);
    song.getSlides().forEach((slide: Slide, index) => {
      slidesStore.addSlide(slide, index);
    });
  };

  /**
   * Handle canceling the chosen song, marking the song as unselected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleCancleChosen = (song: SongType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    song.setIsChosen(false);
    slidesStore.getSlide().forEach((slide: Slide) => { slidesStore.deleteSlide(slide.slideNum) });
  };

  /**
   * Handle searching for songs based on the input value.
   * @param value - The value to search for
   * @returns - The result of the search
   */
  const handleSearchSongs = (value: string) => {
    const result = searchSong(value);
    setResultsongs(result);
  }

  return (
    <DefaultLayout>
      <div className="choosingSongs">
        <div className="choosingSongs_content">
          <div className="choosingSongs_songList">
            <input
              onChange={(e) => handleSearchSongs(e.target.value)}
              className="choosingSongs_songList_search"
              type="text"
              placeholder="Tìm bài hát"
            />
            <ul className="custom-scroll">
              {resultsongs.map((song: SongType, index: number) => (
                <div className={`choosingSongs_songList_item ${song.isChosen ? "activeSongType" : ""}`} key={index}
                  onClick={() => handleChonsen(song)}>
                  <li
                    key={index}
                    id={index.toString()}
                  >
                    Tên: {song.fileName}
                  </li>
                  {song.isChosen && (
                    <div className="choosingSongs_songList_item_chosen">
                      <button
                        onClick={(e) => handleCancleChosen(song, e)}>
                        Bỏ chọn
                      </button>
                    </div>)
                  }
                </div>
              ))}
            </ul>
          </div>
          <div className="choosingSongs_edit">
            <div className="choosingSongs_edit_preview">
              <div className="choosingSongs_edit_preview_slide"></div>
              <div className="choosingSongs_edit_preview_slideList">
                <ul className="custom-scroll">
                  {slides.map((slide: Slide, index: number) => (
                    <li className="choosingSongs_edit_preview_slideList_item" key={index}>
                      {slide.content.text}
                    </li>
                  ))}
                </ul>
              </div>
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
