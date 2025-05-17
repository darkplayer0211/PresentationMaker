import { makeAutoObservable } from "mobx";

interface SongDataType {
  id: string;
  name: string;
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
  name = "";
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
      this.name = song.name;
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

  setIsChosen(data: boolean) {
    this.chosen = data;
  }

  get isChosen() {
    return this.chosen;
  }
}

const song = new SongType();
export default song;
