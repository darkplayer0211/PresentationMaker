import { makeAutoObservable } from "mobx";

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

export class SlideType {
    slides: Slide[] = [];

    constructor(slides?: Slide[]) {
        makeAutoObservable(this);
        if (slides) {
            this.slides = slides.map((slide) => ({
                slideNum: slide.slideNum,
                isBlankPage: slide.isBlankPage || true,
                isChosen: slide.isChosen || false,
                title: slide.title,
                content: slide.content,
            }));
        }
    }

    setSlides = (slidesData: Slide[]) => {
        this.slides = slidesData;
    }

    setChosen = (slideChosen: Slide) => {
        this.slides.find((slide) => {
            if (slide.slideNum === slideChosen.slideNum) {
                slide.isChosen = true;
            } else {
                slide.isChosen = false;
            }
        });
    }

    setBlankPage = (slideBlank: Slide, position: number) => {
        if (position < 0 || position > this.slides.length) {
            throw new Error("Invalid position");
        }
        this.slides.splice(position, 0, slideBlank);
    }

    getSlide = () => {
        return this.slides || [];
    }

    addSlide = (slide: Slide, position: number) => {
        console.log('this.slides ', this.slides);

        if (position < 0 || position > this.slides.length) {
            throw new Error("Invalid position");
        }
        const isBlankPage = slide.isBlankPage || true;
        this.slides.splice(position, isBlankPage ? 1 : 0, slide);
    }

    deleteSlide = (slideNum: number) => {
        const newArray = this.slides.filter(item => item.slideNum !== slideNum);
        this.slides = newArray;
    }
}

const slidesStore = new SlideType();
export default slidesStore;