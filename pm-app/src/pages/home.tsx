import LinkBtn from '../components/LinkBtn/LinkBtn';
import '../css/pages/home.css';

interface HomeProps { } // Define your props interface if needed

// TESTING ENV
console.log("TESTING ENV - HOME.TSX");
if ('showOpenFilePicker' in window) {
  // The File System Access API is supported.
  console.log("File System Access API is supported.");
} else {
  // Fallback for browsers that do not support the API.
}

const slideObj = [{
    slide_num: 1,
    title: "Alleluia Hat Len Nguoi Oi",
    content: "Alleluia Hat Len Nguoi Oi",
    title_font: "Arial",
    title_font_size: 40,
    content_font: "Arial",
    content_font_size: 20
}, {
    slide_num: 2,
    title: "Alleluia Hat Len Nguoi Oi",
    content: "Alleluia Hat Len Nguoi Oi",
    title_font: "Arial",
    title_font_size: 40,
    content_font: "Arial",
    content_font_size: 20
}]

type slideTemplate = {
    slide_num: number;
    title: string;
    content: string;
    title_font: string;
    title_font_size: number;
    content_font: string;
    content_font_size: number;
}

const slidesTemplate: slideTemplate[] = [{
    slide_num: 1,
    title: "Alleluia Hat Len Nguoi Oi",
    content: "Alleluia Hat Len Nguoi Oi",
    title_font: "Arial",
    title_font_size: 40,
    content_font: "Arial",
    content_font_size: 20
}, {
    slide_num: 2,
    title: "Alleluia Hat Len Nguoi Oi",
    content: "Alleluia Hat Len Nguoi Oi",
    title_font: "Arial",
    title_font_size: 40,
    content_font: "Arial",
    content_font_size: 20
}]
slidesTemplate[0].slide_num = 1;
slideObj[0].slide_num = 1;

async function openFile() {
  try {
    // Open the file picker.
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Text Files',
          accept: {
            'image/plain': ['.png', '.jpg', '.jpeg'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });

    // Proceed to read the file.
    await readFile(fileHandle);
  } catch (err) {
    console.error('Error opening file:', err);
  }
}

async function readFile(fileHandle: FileSystemFileHandle) {
  try {
    console.log('File handle:', fileHandle);

    // Create a file reader to read the file contents.
    const file = await fileHandle.getFile();
    const contents = await file.text();
    console.log('File contents:', contents);

    const imageUrl = URL.createObjectURL(file);
    console.log('Image URL:', imageUrl);

    // Optionally, you can create an image element to display the file.
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Selected Image';
    document.body.appendChild(imgElement);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
//
const Home: React.FC<HomeProps> = () => {
    return (
        <div className="home">
            <div className="home_greeting">
                <h1>Chào mừng,</h1>
                <p>Bắt đầu tạo tệp trình chiếu</p>
                <LinkBtn to='/choosingSongs' text='Bắt đầu nào!'/>
                <button onClick={openFile}>Open File</button>
                
            </div>
            <div className="home_backgroundImg">
                <img src='/home_background_img.jpg' alt='background'/>
            </div>

            <div className="home_backgroundImg2">
                <img src='contents' alt='background'/>
            </div>
        </div>
    )
}

export default Home;