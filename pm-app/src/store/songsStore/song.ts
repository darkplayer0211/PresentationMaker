import { makeAutoObservable } from "mobx";

export interface SongDataType {
  id: string;
  fileName: string;
  chosen: boolean;
  showCancelBtn: boolean;
  slides: SlideType[];
}

interface SlideType {
  songId: string;
  id: string;
  isChosen?: boolean;
  title: {
    text: string;
    fontName: string;
    fontSize: number;
  };
  content: {
    text: string;
    fontName: string;
    fontSize: number;
  };
}

export class SongType {
  id = "";
  fileName = "";
  chosen = false;
  showCancelBtn = false;
  slides: SlideType[] = [
    {
      songId: "0",
      id: "0",
      isChosen: false,
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
    },
  ];

  constructor(song?: SongDataType) {
    makeAutoObservable(this);
    if (song) {
      this.id = song.id;
      this.fileName = song.fileName;
      this.chosen = song.chosen;
      this.showCancelBtn = song.showCancelBtn
      this.slides = song.slides.map((slide) => ({
        songId: slide.songId,
        id: slide.id,
        title: slide.title,
        content: slide.content,
        isChosen: slide.isChosen,
      }));
    }
  }

  setSlides(slidesData: SlideType[]) {
    this.slides = slidesData;
  }

  getSlides() {
    return this.slides;
  }

  setIsChosen(data: boolean) {
    this.chosen = data;
  }

  setShowCancelBtn(data: boolean) {
    this.showCancelBtn = data;
  }

  get isChosen() {
    return this.chosen;
  }
}

const song = new SongType();
export default song;
