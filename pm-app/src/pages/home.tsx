import React, { useEffect } from "react";
import LinkBtn from "../components/LinkBtn/LinkBtn";
import "../css/pages/home.css";

import PptxGenJS from "pptxgenjs";

const Home: React.FC<HomeProps> = () => {
    return (
        <div className="home">
            <div className="home_greeting">
                <h1>Chào mừng,</h1>
                <p>Bắt đầu tạo tệp trình chiếu</p>
                <LinkBtn to='/choosingSongs' text='Bắt đầu nào!'/>               
            </div>
            <div className="home_backgroundImg">
                <img src='/home_background_img.jpg' alt='background'/>
            </div>

            <div className="home_backgroundImg2">
                <img src='contents' alt='background'/>
            </div>
        </div>
    )
interface HomeProps {} // Define your props interface if needed

// TESTING ENVIRONMENT
const today = new Date().toISOString().split('T')[0];

const widthLayout = 20.997;
const heightLayout = 11.811;

// Define TypeScript interfaces for data structure
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
  slides: Slide[];
}

const data: Presentation[] = [
  {
    "id": "b9e6ae92-8a70-46c3-9520-5143e2f75448",
    "fileName": "Ve Noi Day",
    "slides": [
        {
            "id": "b235afe7-7ec5-42ee-af08-8e03bf911714",
            "title": {
                "text": "VỀ NƠI ĐÂY",
                "fontName": "Arial",
                "fontSize": 21
            },
            "content": {
                "text": "ĐK. Trong hân hoan chúng con về đây mang tin yêu mơ ước nồng say cùng hợp tiếng ca tạ ơn Chúa lời thiết tha",
                "fontName": "Arial",
                "fontSize": 80
            }
        },
        {
            "id": "ccc6c36f-35c2-4009-bedc-828c934effbc",
            "title": {
                "text": "VỀ NƠI ĐÂY",
                "fontName": "Arial",
                "fontSize": 21
            },
            "content": {
                "text": "1. Bao năm tháng con hằng ước mơ về bên Chúa hát khúc tạ ơn ôi giây phút chan hòa Thánh ân trong cõi lòng dâng trào ý thơ.",
                "fontName": "Arial",
                "fontSize": 72
            }
        },
        {
            "id": "b3dcc040-8020-4d0f-90b7-4a2a02f80f02",
            "title": {
                "text": "VỀ NƠI ĐÂY",
                "fontName": "Arial",
                "fontSize": 21
            },
            "content": {
                "text": "ĐK. Trong hân hoan chúng con về đây mang tin yêu mơ ước nồng say cùng hợp tiếng ca tạ ơn Chúa lời thiết tha",
                "fontName": "Arial",
                "fontSize": 80
            }
        },
        {
            "id": "d8b0867a-e6fa-4eeb-8993-8cad366f90a6",
            "title": {
                "text": "",
                "fontName": "Arial",
                "fontSize": 30
            },
            "content": {
                "text": "2. Như nai khát mong nguồn nước trong hồn con khát chính Chúa tình thương con vui sướng trở về Thánh cung, cho cõi lòng vuông tròn ước mong.",
                "fontName": "Arial",
                "fontSize": 70
            }
        },
        {
            "id": "bc43f3b7-ddfd-4845-aeca-ad650355ebd4",
            "title": {
                "text": "VỀ NƠI ĐÂY",
                "fontName": "Arial",
                "fontSize": 21
            },
            "content": {
                "text": "ĐK. Trong hân hoan chúng con về đây mang tin yêu mơ ước nồng say cùng hợp tiếng ca tạ ơn Chúa lời thiết tha",
                "fontName": "Arial",
                "fontSize": 80
            }
        }
    ]
  },
  {
    "id": "a5601d89-d127-425d-bbca-9bf9704910ba",
    "fileName": "Giuse Xom Nho",
    "slides": [
        {
            "id": "46672378-759b-4cce-b82d-681357957fa0",
            "title": {
                "text": "",
                "fontName": "Calibri Light",
                "fontSize": 30
            },
            "content": {
                "text": "ĐK: Giuse trong xóm nhỏ khó nghèo. Thuở xưa, miền Na-gia-rét Thánh gia Người vui sống. Nêu gương cho tất cả gia đình cần lao: Tình yêu tha thiết với cảnh đời đơn nghèo.",
                "fontName": "+mn-lt",
                "fontSize": 66
            }
        },
        {
            "id": "b06989b4-a690-4bad-9e22-e87b052a5b3f",
            "title": {
                "text": "",
                "fontName": "Calibri Light",
                "fontSize": 30
            },
            "content": {
                "text": "1. Cho người Cha hết sức yêu mến tận tình. Biết nêu gương sáng chốn gia đình. Dù bao phong trần lòng được luôn sướng vui: vững tay đưa thuyền qua sóng đời",
                "fontName": "Calibri",
                "fontSize": 66
            }
        }
    ]
  }
];

// Create a single PptxGenJS instance
const pptx = new PptxGenJS();

// Define custom layout
pptx.defineLayout({
  name: "LAYOUT_16x9",
  width: widthLayout,
  height: heightLayout,
});
pptx.layout = "LAYOUT_16x9";

data.forEach((presentation) => {
  console.log(`Processing presentation: ${presentation.fileName} (ID: ${presentation.id})`);

  presentation.slides.forEach((slideData) => {
    console.log(`  Adding slide: ${slideData.id}`);

    const slide = pptx.addSlide();

    // Add title text box if title text is not empty
    if (slideData.title.text) {
      slide.addText(slideData.title.text, {
        x: 0,
        y: 0.1,
        w: widthLayout,
        h: 0.5,
        align: "center",
        color: "000000",
        fill: { color: "FFFFFF", transparency: 1000 },
        fontSize: slideData.title.fontSize,
        fontFace: slideData.title.fontName,
        bold: true,
      });
    }

    // Add content text box
    slide.addText(slideData.content.text, {
      x: (() => {
        const x = widthLayout - (widthLayout - 0.5);
        return x;
      })(),
      y: 0.1,
      w: (() => {
        const x = widthLayout - (widthLayout - 0.5);
        return widthLayout - 2 * x;
      })(),
      h: heightLayout,
      align: "justify",
      color: "000000",
      fill: { color: "FFFFFF", transparency: 1000 },
      fontSize: slideData.content.fontSize,
      fontFace: slideData.content.fontName,
      bold: true,
      autoFit: true
    });
  });
});

const fileName = today;
try {
  pptx.writeFile({ fileName });
  console.log(`Saved combined presentation: ${fileName}.pptx`);
} catch (error) {
  console.error(`Error saving presentation ${fileName}:`, error);
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home_greeting">
        <h1>Chào mừng,</h1>
        <p>Bắt đầu tạo tệp trình chiếu</p>
        <LinkBtn to="/choosingSongs" text="Bắt đầu nào!" />
      </div>
      <div className="home_backgroundImg">
        <img src="/home_background_img.jpg" alt="background" />
      </div>
    </div>
  );
};

export default Home;
