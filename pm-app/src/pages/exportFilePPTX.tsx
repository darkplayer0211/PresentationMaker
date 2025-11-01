import PptxGenJS from "pptxgenjs";
import { SongType } from "../store";
import { ImageType } from "../store/imagesStore";
import { observer } from "mobx-react";
import { useState } from "react";

// +++ 1. Thêm import cho Tauri
import { invoke } from "@tauri-apps/api/core";
import { save } from "@tauri-apps/plugin-dialog";

interface ExportFilePPTXProps {
    resultDataList: (SongType | ImageType)[]; // nhận từ ngoài
}

const ExportFilePPTX: React.FC<ExportFilePPTXProps> = observer(({ resultDataList }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSinglePresentation = async () => { // Đảm bảo hàm là async
        setIsGenerating(true);
        const today = new Date().toISOString().split("T")[0];
        const data = resultDataList.filter((item) => {
            return (
                ("type" in item && item.type === "image" && item.url) ||
                ("fileName" in item && item.fileName)
            );
        });
        if (!data.length) {
            setIsGenerating(false);
            return;
        }
        const DEFAULT_SLIDE_WIDTH = 10;
        const DEFAULT_SLIDE_HEIGHT = 5.625;
        const emuToInches = (emu: number) => emu / 914400;

        // --- Toàn bộ logic tạo slide của bạn giữ nguyên ---
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
                    // ... (toàn bộ logic addSlide, addText của bạn ở đây) ...
                    // ... (giữ nguyên không thay đổi) ...
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
        // --- Kết thúc logic tạo slide ---


        // +++ 2. Bắt đầu logic lưu file "Tauri Way" +++
        try {
            // A. Tạo file trong bộ nhớ dưới dạng ArrayBuffer
            const fileDataBuffer = await pptx.write({ outputType: 'arraybuffer' });

            // B. Hỏi người dùng muốn lưu file ở đâu và tên gì
            const filePath = await save({
                title: "Lưu file trình chiếu",
                defaultPath: `${today}.pptx`, // Gợi ý tên file
                filters: [{
                    name: 'PowerPoint Presentation',
                    extensions: ['pptx']
                }]
            });

            // C. Nếu người dùng chọn một đường dẫn (không bấm "Cancel")
            if (filePath) {
                // D. Chuyển ArrayBuffer thành mảng byte (Uint8Array)
                //    Sau đó chuyển thành mảng số thông thường (Array)
                //    để gửi qua Tauri (Rust sẽ nhận là Vec<u8>)
                const data = Array.from(new Uint8Array(fileDataBuffer as ArrayBuffer));

                // E. Gọi command "save_presentation" bên Rust
                await invoke('save_presentation', {
                    filePath: filePath,
                    data: data
                });

                alert('Đã lưu file thành công!');
            }
        } catch (err) {
            console.error(err);
            alert(`Đã xảy ra lỗi khi lưu file: ${err}`);
        } finally {
            // F. Dừng trạng thái loading dù thành công hay thất bại
            setIsGenerating(false);
        }

        // --- 3. Xóa dòng code cũ bị lỗi ---
        // pptx.writeFile({ fileName: `${today}.pptx` })
        //     .then(() => setIsGenerating(false));
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