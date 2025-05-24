import { makeAutoObservable } from "mobx";

interface SongDataType {
  id: string;
  fileName: string;
  chosen: boolean;
  slides: SlideType[];
}

interface SlideType {
  slideNum: number;
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
  slides: SlideType[] = [
    {
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
    },
  ];

  constructor(song?: SongDataType) {
    makeAutoObservable(this);
    if (song) {
      this.id = song.id;
      this.fileName = song.fileName;
      this.chosen = song.chosen;
      this.slides = song.slides.map((slide) => ({
        slideNum: slide.slideNum,
        title: slide.title,
        content: slide.content,
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

  get isChosen() {
    return this.chosen;
  }
}

const song = new SongType();
export default song;
