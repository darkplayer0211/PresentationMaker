import { useEffect, useState } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { slidesStore, songsStore, SongType, SongSlideType, ImageSlideType } from "../store";
import { ImageType } from "../store/imagesStore";
import { v4 as uuidv4 } from 'uuid';
import { TrashCan } from "../icons/trashCan";
import { ConfirmModal } from "../components/ConfirmModal";

const ChoosingSongs: React.FC<Record<string, never>> = observer(() => {
  const { songs, searchSong } = songsStore;
  const { data: slidesData, addItem, removeItem } = slidesStore;
  const [resultsongs, setResultsongs] = useState<SongType[]>(songs);
  const [chosenSlide, setChosenSlide] = useState<string>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [chosenSong, setChosenSong] = useState<SongType>();

  const handleBack = () => {
    window.history.back();
  };

  const handleAddBlankSlide = (position: number) => {
    setShowConfirmModal(true);
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
        const newSong = { ...song, songId: song.id, id: uuidv4() } as SongSlideType;
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
  const handleCancleChosen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const chosenSlideData = slidesData.find(slide => slide.id === chosenSlide) as SongSlideType;
    removeItem(chosenSlide || "");
    resultsongs.forEach((song: SongType) => {
      if (song.id === chosenSlideData?.songId) {
        song.setIsChosen(false);
        song.setShowCancelBtn(false);
      } else {
        song.setShowCancelBtn(false);
      }
    });
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
  
  const handleSongClick = (song: SongType) => {
    setChosenSong(song);
    setShowConfirmModal(true);
  }

  const handleChosenSlide = (slideId: string) => {
    const chosenSlideData = slidesData.find(slide => slide.id === slideId) as SongSlideType;
    setChosenSlide(slideId);
    resultsongs.forEach((song: SongType) => {
      if (song.id === chosenSlideData?.songId) {
        song.setIsChosen(true);
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
      setChosenSlide(undefined);
    }
  }

  const applyImageToAll = (index: number) => {
    console.log(index);
  }

  const handleDeleteSlide = (slideId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeItem(slideId);
  }

  const onConfirm = () => {
    if (chosenSong) {
      handleChonsenSong(chosenSong);
    }
    setShowConfirmModal(false);
  }

  const onCancel = () => {
    setShowConfirmModal(false);
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
                  onClick={() => handleSongClick(song)}>
                  <li
                    key={song.id}
                    id={`song-${song.id.toString()}`}
                  >
                    Tên: {song.fileName}
                  </li>
                  {song.showCancelBtn && (
                    <div className="choosingSongs_songList_item_chosen">
                      <button
                        onClick={(e) => handleCancleChosen(e)}>
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
                              <div className="choosingSongs_edit_preview_slideList_item_delete">
                                <button onClick={(e) => handleDeleteSlide(item.id, e)}><TrashCan width={16} height={16}/></button>
                              </div>
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
                              <div className="choosingSongs_edit_preview_slideList_item_delete">
                                <button onClick={(e) => handleDeleteSlide(item.id, e)}><TrashCan width={16} height={16}/></button>
                              </div>
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
      {showConfirmModal && <ConfirmModal onConfirm={onConfirm} onCancel={onCancel} />}
    </DefaultLayout>
  );
});

export default ChoosingSongs;
