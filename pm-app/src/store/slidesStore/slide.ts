import { makeAutoObservable } from "mobx";
import song, { SongType } from "../songsStore/song";
import { ImageType } from "../imagesStore";
import songsStore from "../songsStore";

export interface Slide {
    slideNum: number;
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

export interface SongSlideType extends SongType {
    songId: string;
}

export interface ImageSlideType extends ImageType {
    imageId: string;
}

export class SlidesStoreType {
    data: (SongSlideType | ImageSlideType)[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addItem = (item: SongSlideType | ImageSlideType, position: number) => {
        this.data.splice(position, 0, item);
    };

    removeItem = (id: string) => {
        this.data = this.data.filter((i) => i.id !== id);
    };

    getSongSlides = (id: string) => {
        return songsStore.songs.find((song) => song.id === id)?.slides;
    };

}

const slidesStore = new SlidesStoreType();
export default slidesStore;