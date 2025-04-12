import { makeAutoObservable } from "mobx";

interface SlideType {
  slideNum: number;
  title: string;
  content: string;
  titleFont: string | null;
  titleFontSize: number;
  contentFont: string | null;
  contentFontSize: number;
}

export class SongType {
  id = "";
  name = "";
  chosen = false;
  slides: SlideType[] = [{
    slideNum: 0,
    title: "",
    content: "",
    titleFont: null,
    titleFontSize: 0,
    contentFont: null,
    contentFontSize: 0,
  }];

  constructor() {
    makeAutoObservable(this);
  }

  setSlides = (slidesData: SlideType[]) => {
    this.slides = slidesData;
  };

  setIsChosen = (data: boolean) => {
    this.chosen = data;
  }

  get isChosen() {
    return this.chosen;
  }
}

const song = new SongType();
export default song;
