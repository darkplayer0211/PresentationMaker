import { makeAutoObservable } from "mobx";
import song, { SongType } from "../songsStore/song";
import { ImageType } from "../imagesStore";
import songsStore from "../songsStore";

export interface Slide {
    songId: string;
    id: string;
    isBlankPage?: boolean;
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

export class SlideType {
    data: (SongType | ImageType)[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addItem = (item: SongType | ImageType) => {
        this.data.push(item);
    };

    removeItem = (id: string) => {
        this.data = this.data.filter((i) => i.id !== id);
    };

    getSongSlides = (id: string) => {
        return songsStore.songs.find((song) => song.id === id)?.slides;
    };

}

const slidesStore = new SlideType();
export default slidesStore;