import PptxGenJS from "pptxgenjs";
import { SongType } from "../store";
import { ImageType } from "../store/imagesStore";
import { observer } from "mobx-react";
import { useState } from "react";

interface ExportFilePPTXProps {
    resultDataList: (SongType | ImageType)[]; // nhận từ ngoài
}

const ExportFilePPTX: React.FC<ExportFilePPTXProps> = observer(({ resultDataList }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSinglePresentation = async () => {
        if (!resultDataList || resultDataList.length === 0) {
            alert("Không có dữ liệu để xuất file!");
            return;
        }

        setIsGenerating(true);
        const today = new Date().toISOString().split("T")[0];
        const data = resultDataList;

        const DEFAULT_SLIDE_WIDTH = 10;
        const DEFAULT_SLIDE_HEIGHT = 5.625;
        const emuToInches = (emu: number) => emu / 914400;

        const pptx = new PptxGenJS();

        pptx.defineLayout({
            name: "LAYOUT_16x9",
            width: DEFAULT_SLIDE_WIDTH,
            height: DEFAULT_SLIDE_HEIGHT,
        });
        pptx.layout = "LAYOUT_16x9";
        for (const item of data) {
            if ("type" in item && item.type === "image") {
                const slide = pptx.addSlide();
                slide.background = { data: item.url };
            } else if ("fileName" in item) {
                item.slides.forEach((slideData) => {
                    const slide = pptx.addSlide();
                    slide.background = { color: "FFFFFF" };
                    const scaleRatio = item
                        ? (emuToInches(item.slideSize.width) / DEFAULT_SLIDE_WIDTH) * 1.2
                        : 1;
                    const scaledTitleFontSize = Math.round(slideData.title.fontSize / scaleRatio);
                    const scaledContentFontSize = Math.round(slideData.content.fontSize / scaleRatio);
                    if (slideData.title.text) {
                        slide.addText(slideData.title.text, {
                            x: 0,
                            y: 0,
                            w: DEFAULT_SLIDE_WIDTH,
                            h: 0.25,
                            align: "center",
                            color: "000000",
                            fill: { color: "FFFFFF", transparency: 1000 },
                            fontSize: scaledTitleFontSize,
                            fontFace: slideData.title.fontName,
                            bold: true,
                            valign: "middle",
                            autoFit: true,
                        });
                    }

                    slide.addText(slideData.content.text, {
                        x: 0.4,
                        y: 0.1,
                        w: DEFAULT_SLIDE_WIDTH - 0.8,
                        h: DEFAULT_SLIDE_HEIGHT - 0.2,
                        align: "justify",
                        color: "000000",
                        fill: { color: "FFFFFF", transparency: 1000 },
                        fontSize: scaledContentFontSize,
                        fontFace: slideData.content.fontName,
                        bold: true,
                        autoFit: true,
                        shrinkText: true,
                        valign: "middle",
                        margin: 0.1,
                    });
                });
            }
        }

        pptx.writeFile({ fileName: `File trình chiếu_${today}.pptx` })
            .then(() => setIsGenerating(false));
    };

    return (
        <button
            className="choosingSongs_preview_buttons_export"
            onClick={generateSinglePresentation}
            disabled={isGenerating}
        >
            {isGenerating ? "Đang tạo file..." : "Xuất file"}
        </button>
    );
});

export default ExportFilePPTX;
