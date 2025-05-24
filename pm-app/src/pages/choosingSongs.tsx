import { useEffect, useState } from "react";
import "../css/pages/choosingSongs.css";
import DefaultLayout from "../layouts/defaultLayout";
import { observer } from "mobx-react";
import { slidesStore, songsStore, SongType } from "../store";
import listSong from "../database/listSong.json"
import { Slide } from "../store/slidesStore/slide";
import { ImageType } from "../store/imagesStore";
import { v4 as uuidv4 } from 'uuid';

interface ChoosingSongsProps { } // Define your props interface if needed

if ('showOpenFilePicker' in window) {
  // The File System Access API is supported.
  console.log("File System Access API is supported.");
} else {
  // Fallback for browsers that do not support the API.
}

async function applyToAll() {
  
}

async function openFile() {
  try {
    // Open the file picker.
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Text Files',
          accept: {
            'image/plain': ['.png', '.jpg', '.jpeg'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });

    // Proceed to read the file.
    await readFile(fileHandle);
  } catch (err) {
    console.error('Error opening file:', err);
  }
}

async function readFile(fileHandle: FileSystemFileHandle) {
  try {
    console.log('File handle:', fileHandle);

    // Create a file reader to read the file contents.
    const file = await fileHandle.getFile();
    const contents = await file.text();
    console.log('File contents:', contents);
    
    const imageUrl = URL.createObjectURL(file);
    console.log('Image URL:', imageUrl);

    // Optionally, you can create an image element to display the file.
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;

    imgElement.style.maxWidth = '100%';
    imgElement.style.cursor = 'pointer';
    imgElement.title = 'Click to re-upload';

    // When image is clicked, re-trigger file input
    imgElement.onclick = () => openFile();
    imgElement.alt = 'Selected Image';
    imgElement.style.width = '100px'; // Set width for the image
    imgElement.style.height = '100px'; // Set height for the image
    imgElement.style.objectFit = 'cover'; // Maintain aspect ratio

    const button = document.getElementById('replace-button');
      if (button && button.parentNode) {
        button.parentNode.replaceChild(imgElement, button);
      } else {
        // Replace existing image
        const existingImg = document.querySelector('img');
        if (existingImg && existingImg.parentNode) {
          existingImg.parentNode.replaceChild(imgElement, existingImg);
        }
      }
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

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
      slides: [{
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
        },
      }]
    });
    const newImage: ImageType = {
      id: uuidv4(),
      type: "image",
      url: "",
    };
    addItem(newImage, position);
    addItem(newSong, position);
  }

  /**
   * Handle chosen song, mark the song as selected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleChonsenSong = (song: SongType) => {
    if (chosenSlide) {
      console.log(chosenSlide);
      removeItem(chosenSlide);
      addItem(song, slidesData.length);
    }
  };

  /**
   * Handle canceling the chosen song, marking the song as unselected.
   * @param song - The song to unselect
   * @param e - The HTMLButtonElement event
   */
  const handleCancelChosen = (song: SongType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeItem(song.id);
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
    console.log(slideId);
    setChosenSlide(slideId);
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
                        onClick={(e) => handleCancelChosen(song, e)}>
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
                          className={`choosingSongs_edit_preview_slideList_item ${chosenSlide === item.id ? "activeSongType" : ""}`}
                          key={`${index}-${slideIndex}`}
                          onClick={() => handleChosenSlide(item.id)}
                        >
                          {slide.content.text}
                        </li>
                      ));
                    } else {
                      // Handle ImageType
                      return (
                        <li 
                          className={`choosingSongs_edit_preview_slideList_item ${chosenSlide === item.id ? "activeSongType" : ""}`}
                          key={index}
                          onClick={() => handleChosenSlide(item.id)}
                        >
                          {'Image Slide'}
                        </li>
                      );
                    }
                  })}

                  <button id='replace-button' onClick={openFile}>Open File</button>
                  <button id='replace-all-button' onClick={applyToAll}>Apply to all</button>
                  
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
