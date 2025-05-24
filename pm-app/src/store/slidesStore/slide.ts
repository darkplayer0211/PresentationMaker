import { makeAutoObservable } from "mobx";

export interface Slide {
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

export class SlideType {
    slides: Slide[] = [];

    constructor(slides?: Slide[]) {
        makeAutoObservable(this);
        if (slides) {
            this.slides = slides.map((slide) => ({
                slideNum: slide.slideNum,
                title: slide.title,
                content: slide.content,
            }));
        }
    }

    setSlides(slidesData: Slide[]) {
        this.slides = slidesData;
    }

    getSlide() {
        return this.slides;
    }

    addSlide(slide: Slide, position: number) {
        if (position < 0 || position > this.slides.length) {
            throw new Error("Invalid position");
        }
        this.slides.splice(position, 0, slide);
    }

    deleteSlide(slideNum: number) {
        const newArray = this.slides.filter(item => item.slideNum !== slideNum);
        this.slides = newArray;
    }
}

const slidesStore = new SlideType();
export default slidesStore;