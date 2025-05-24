import { useEffect, useState } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { slidesStore, songsStore, SongType } from "../store";
import listSong from "../database/listSong.json"
import { Slide } from "../store/slidesStore/slide";
import { ImageType } from "../store/imagesStore";
import { v4 as uuidv4 } from 'uuid';
import song, { SongDataType } from "../store/songsStore/song";
interface ChoosingSongsProps { } // Define your props interface if needed

const ChoosingSongs: React.FC<ChoosingSongsProps> = observer(() => {
  const initSongs: Array<SongType> = JSON.parse(JSON.stringify(listSong));
  const initSlide: Slide = {
    songId: "0",
    id: "0",
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
  const { data: slidesData, getSongSlides, addItem } = slidesStore;

  const handleAddBlankSlide = (position: number) => {
    const newImageSlide: ImageType = {
      id: uuidv4(),
      name: "",
      image: ""
    };
    addItem(newImageSlide);
  }

  /**
   * Handle chosen song, mark the song as selected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleChonsenSong = (song: SongType) => {
    song.setIsChosen(true);
    addItem(song);
  };

  /**
   * Handle canceling the chosen song, marking the song as unselected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleCancleChosen = (song: SongType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    song.setShowCancelBtn(false);
    song.setIsChosen(false);
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

  const handleChosenSlide = (item: SongType) => {
    resultsongs.forEach((song: SongType) => {
      if (item.id === song.id) {
        song.setShowCancelBtn(true);
      }
    });
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
              {resultsongs.map((song: SongType) => (
                <div className={`choosingSongs_songList_item ${song.isChosen ? "activeSongType" : ""}`} key={song.id}
                  onClick={() => handleChonsenSong(song)}>
                  <li
                    key={song.id}
                    id={`song-${song.id.toString()}`}
                  >
                    Tên: {song.fileName}
                  </li>
                  {song.showCancelBtn && (
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
                  {slidesData.map((item: SongType | ImageType, index: number) => {
                    if ('slides' in item) {
                      // Handle SongType
                      return item.slides.map((slide, slideIndex) => (
                        <li
                          className="choosingSongs_edit_preview_slideList_item"
                          key={`${index}-${slideIndex}`}
                          onClick={() => handleChosenSlide(item)}
                        >
                          {slide.content.text}
                        </li>
                      ));
                    } else {
                      // Handle ImageType
                      return (
                        <li
                          className="choosingSongs_edit_preview_slideList_item"
                          key={index}
                        >
                          {item.name || 'Image Slide'}
                        </li>
                      );
                    }
                  })}
                  <button onClick={() => handleAddBlankSlide(slidesData.length)}>+</button>
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
