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
    isBlankPage: true,
    isChosen: false,
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
  const { getSlide, setSlides, addSlide, deleteSlide } = slidesStore;

  useEffect(() => {
    const init = async () => {
      songsStore.setSongs(initSongs);
      setSlides([initSlide]);
      setResultsongs(songs);
    }
    init();
  }, []);

  const handleAddBlankSlide = (position: number) => {
    const newSlide: Slide = {
      slideNum: 0,
      isBlankPage: true,
      isChosen: false,
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
    addSlide(newSlide, position);
  }

  /**
   * Handle chosen song, mark the song as selected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleChonsenSong = (song: SongType) => {
    const slideChosenList = getSlide().filter((slide: Slide) => slide.isChosen);
    if (!slideChosenList.length) {
      return;
    }
    song.setIsChosen(true);
    song.getSlides().forEach((slide: Slide, index) => {
      addSlide(slide, index);
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
    getSlide().forEach((slide: Slide) => { deleteSlide(slide.slideNum) });
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

  const handleChosenSlide = (slide: Slide) => {
    slidesStore.setChosen(slide);
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
                  onClick={() => handleChonsenSong(song)}>
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
                  <button onClick={() => handleAddBlankSlide(0)}>+</button>
                  {getSlide().map((slide: Slide, index: number) => (
                    <li className={`choosingSongs_edit_preview_slideList_item ${slide.isChosen ? "activeSongType" : ""}`}
                      key={index}
                      onClick={() => handleChosenSlide(slide)}>
                      {slide.content.text}
                    </li>
                  ))}
                  <button onClick={() => handleAddBlankSlide(getSlide().length)}>+</button>
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
