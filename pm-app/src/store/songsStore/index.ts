import { makeAutoObservable } from "mobx";
import { SongType } from "./song";

export class Songs {
  songs: SongType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSongs = (songs: SongType[]) => {
    this.songs = songs;
  };

  searchSong = (query: string) => {
    const result: SongType[] = [];
    this.songs.filter((song: SongType) => {
      if (song.name.toLowerCase().includes(query.toLowerCase()))
        result.push(song);
      song.slides.forEach((slide) => {
        if (
          (slide.title.toLowerCase().includes(query.toLowerCase()) ||
          slide.content.toLowerCase().includes(query.toLowerCase()))
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
