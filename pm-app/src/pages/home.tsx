import React, { useState } from "react";
import LinkBtn from "../components/LinkBtn/LinkBtn";
import "../css/pages/home.css";
import jsonData from "../data/output/output.json"; // replace with the actual path to your JSON data
import PptxGenJS from "pptxgenjs";

const Home: React.FC<HomeProps> = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSinglePresentation = async () => {
    setIsGenerating(true);
    const today = new Date().toISOString().split("T")[0];
    const data: (Presentation | ImageType)[] = jsonData as (Presentation | ImageType)[];

    // Kích thước slide mặc định 16:9 (đơn vị inches)
    const DEFAULT_SLIDE_WIDTH = 10;
    const DEFAULT_SLIDE_HEIGHT = 5.625;

    // Hàm chuyển đổi EMU sang inches
    const emuToInches = (emu: number) => emu / 914400;

    const pptx = new PptxGenJS();
    
    // Đặt layout mặc định 16:9 cho tất cả slide
    pptx.defineLayout({
      name: "LAYOUT_16x9",
      width: DEFAULT_SLIDE_WIDTH,
      height: DEFAULT_SLIDE_HEIGHT,
    });
    pptx.layout = "LAYOUT_16x9";

    // Lấy kích thước từ bài đầu tiên (nếu có) để tính tỉ lệ scale
    const firstPresentation = data.find((item): item is Presentation => "fileName" in item);
    const scaleRatio = firstPresentation
      ? emuToInches(firstPresentation.slideSize.width) / DEFAULT_SLIDE_WIDTH * 1.2
      : 1;

    // Duyệt qua tất cả các mục trong JSON
    for (const item of data) {
      if ("type" in item && item.type === "image") {
        // Xử lý đối tượng ImageType
        const slide = pptx.addSlide();
        slide.background = {
          data: item.url, // Chuỗi base64 từ ImageType
        };
      } else if ("fileName" in item) {
        // Xử lý đối tượng Presentation
        console.log(`Processing presentation: ${item.fileName}`);
        item.slides.forEach((slideData) => {
          const slide = pptx.addSlide();
          slide.background = { color: "FFFFFF" };
          
          // Scale font size từ file JSON theo tỉ lệ
          const scaledTitleFontSize = Math.round(slideData.title.fontSize / scaleRatio);
          const scaledContentFontSize = Math.round(slideData.content.fontSize / scaleRatio);

          // Thêm tiêu đề (căn giữa trên cùng)
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
              autoFit: true
            });
          }

          // Thêm nội dung chính (chiếm phần lớn slide)
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
            margin: 0.1
          });
        });
      }
    }

    // Tải xuống file PPTX duy nhất
    pptx.writeFile({ fileName: `File trình chiếu_${today}.pptx` })
      .then(() => setIsGenerating(false));
  };

  return (
    <div className="home">
      <div className="home_greeting">
        <h1>Chào mừng,</h1>
        <p>Bắt đầu tạo tệp trình chiếu</p>
        <button 
          onClick={generateSinglePresentation} 
          disabled={isGenerating}
          className="download-all-btn"
        >
          {isGenerating ? 'Đang tạo file...' : 'Tạo file PPTX tổng hợp'}
        </button>
        <LinkBtn to="/choosingSongs" text="Bắt đầu nào!" />
      </div>
      <div className="home_backgroundImg">
        <img src="/home_background_img.jpg" alt="background" />
      </div>
    </div>
  );
};

interface HomeProps {}

interface Slide {
  id: string;
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

interface Presentation {
  id: string;
  fileName: string;
  slideSize: {
    width: number;
    height: number;
  };
  slides: Slide[];
}

interface ImageType {
  id: string;
  type: "image";
  url: string;
}

export default Home;