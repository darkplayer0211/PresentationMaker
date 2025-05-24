import { makeAutoObservable } from "mobx";
import { SongType } from "./song";

export class Songs {
  songs: SongType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSongs = (songs: SongType[]) => {
    this.songs = songs.map((item) => new SongType(item));
  };

  searchSong = (query: string): SongType[] => {
    const result: SongType[] = [];
    this.songs.filter((song: SongType) => {
      if (song.fileName.toLowerCase().includes(query.toLowerCase()))
        result.push(song);
      song.slides.forEach((slide) => {
        if (
          (slide.title.text.toLowerCase().includes(query.toLowerCase()) ||
            slide.content.text.toLowerCase().includes(query.toLowerCase()))
          && !result.includes(song)
        )
          result.push(song);
      });
    });
    return result;
  };
}

const songsStore = new Songs();
export default songsStore;
