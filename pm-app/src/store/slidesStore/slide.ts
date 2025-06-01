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

export class SlidesStoreType {
    data: (SongType | ImageType)[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addItem = (item: SongType | ImageType, position: number) => {
        this.data.splice(position, 0, item);
    };

    removeItem = (id: string) => {
        this.data = this.data.filter((i) => i.id !== id);
    };

    getSongSlides = (id: string) => {
        return songsStore.songs.find((song) => song.id === id)?.slides;
    };

    getImageSlides = (id: string) => {
        return this.data.find((item) => item.id === id && item.type === "image") as ImageType | undefined;
    }

}

const slidesStore = new SlidesStoreType();
export default slidesStore;