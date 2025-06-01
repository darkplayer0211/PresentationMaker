import { useEffect, useState } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { slidesStore, songsStore, SongType, SongSlideType, ImageSlideType } from "../store";
import { ImageType } from "../store/imagesStore";
import { v4 as uuidv4 } from 'uuid';
import song, { SongDataType } from "../store/songsStore/song";
interface ChoosingSongsProps { } // Define your props interface if needed

const ChoosingSongs: React.FC<ChoosingSongsProps> = observer(() => {
  const { songs, searchSong } = songsStore;
  const { data: slidesData, getSongSlides, addItem, removeItem } = slidesStore;
  const [resultsongs, setResultsongs] = useState<SongType[]>(songs);
  const [chosenSlide, setChosenSlide] = useState<string>();

  const handleBack = () => {
    window.history.back();
  };

  const handleAddBlankSlide = (position: number) => {
    const newSong = new SongType({
      id: uuidv4(),
      fileName: "",
      chosen: false,
      showCancelBtn: false,
      slides: [{
        id: "",
        slideNum: 0,
        title: {
          text: "",
          fontName: "",
          fontSize: 0,
        },
        content: {
          text: "",
          fontName: "",
          fontSize: 0,
        }
      }]
    });
    const songSlide = Object.assign(newSong, { songId: newSong.id });
    const newImage: ImageSlideType = {
      id: uuidv4(),
      type: "image",
      url: "",
      imageId: uuidv4(),
    };

    const prevSlide = position > 0 ? slidesData[position - 1] : null;
    if (prevSlide && 'slides' in prevSlide) {
      // If previous slide is SongType, add image first
      addItem(newImage, position);
      addItem(songSlide, position + 1);
    } else {
      // If previous slide is ImageType or no previous slide, add song first
      addItem(songSlide, position);
      addItem(newImage, position + 1);
    }
  }

  /**
   * Handle chosen song, mark the song as selected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleChonsenSong = (song: SongType) => {
    if (chosenSlide) {
      const position = slidesData.findIndex(slide => slide.id === chosenSlide);
      if (position !== -1) {
        removeItem(chosenSlide);
        const newSong = {...song, songId: song.id, id: uuidv4()} as SongSlideType;
        song.setIsChosen(true);
        addItem(newSong, position);
      }
    }
  };

  /**
   * Handle canceling the chosen song, marking the song as unselected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleCancleChosen = (song: SongType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeItem(song.id);
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

  const handleChosenSlide = (slideId: string) => {
    const chosenSlideData = slidesData.find(slide => slide.id === slideId);
    setChosenSlide(slideId);
    resultsongs.forEach((song: SongType) => {
      if (chosenSlideData && 'songId' in chosenSlideData && chosenSlideData.songId === song.id) {
        song.setShowCancelBtn(true);
      } else {
        song.setShowCancelBtn(false);
      }
    });
  }

  const chooseImage = (index: number) => {
    const input = document.getElementById(`image-${index}`) as HTMLInputElement;
    input.click();
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const slideId = slidesData[index].id;
        slidesStore.updateImageUrl(slideId, imageUrl);
      }
      reader.readAsDataURL(file);
    }
  }

  const applyImageToAll = (index: number) => {
    console.log(index);
  }

  useEffect(() => {
    setResultsongs(songs);
  }, [songs]);

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
                      return (
                        <>
                          {item.slides.map((slide, slideIndex) => (
                            <li 
                              className={`choosingSongs_edit_preview_slideList_item ${chosenSlide === item.id ? "activeSongType" : ""}`}
                              key={`${index}-${slideIndex}`}
                              onClick={() => handleChosenSlide(item.id)}
                            >
                              {slide.content.text}
                            </li>
                          ))}
                          <button onClick={() => handleAddBlankSlide(index + 1)}>+</button>
                        </>
                      );
                    } else {
                      // Handle ImageType
                      return (
                        <>
                          <li 
                            className={`choosingSongs_edit_preview_slideList_item ${chosenSlide === item.id ? "activeSongType" : ""}`}
                            key={index}
                            onClick={() => handleChosenSlide(item.id)}
                          >
                            {item.url && <img src={item.url} alt="ảnh" />}
                            {!item.url && <div className="choosingSongs_edit_preview_slideList_item_noImage">
                              <p>Không có ảnh</p>
                            </div>}
                            {chosenSlide === item.id && item.type === 'image' && <div className="choosingSongs_edit_preview_slideList_item_buttons">
                              <button onClick={() => chooseImage(index)}>Chọn ảnh</button>
                              <button onClick={() => applyImageToAll(index)}>Áp dụng tất cả</button>
                              <input id={`image-${index}`} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, index)}/>
                            </div>}
                          </li>
                          <button onClick={() => handleAddBlankSlide(index + 1)}>+</button>
                        </>
                      );
                    }
                  })}
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
