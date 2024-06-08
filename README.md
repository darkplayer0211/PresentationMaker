## Web application for creating and exporting PPT file

**Objective:**

* Create a comprehensive web app for PPT file generation using only front-end technologies.

**Tech Stack:**

* Frontend: HTML, CSS, JavaScript, Vue.js, Bootstrap
* Libraries: jsPDF, FileSaver.js, HTML2Canvas

**Features (to be implemented):**

* Create new PPT slides
* Add content (text, images, tables, charts)
* Format content (fonts, colors, sizes, positions)
* Navigate between slides
* Export complete PPT file

**Project Structure:**
```
src/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── fonts/
│   │   └── [Font name].ttf
│   ├── images/
│   │   └── [Image name].png
│   └── js/
│       ├── components/
│       │   ├── Slide.vue
│       │   └── ...
│       ├── main.js
│       └── utils/
│           ├── fileSaver.js
│           ├── html2canvas.js
│           └── jsPDF.js
├── App.vue
├── index.html
└── router.js
```

**Usage:**

1. Clone the project to your machine.

3. Install required libraries:
```
Bash

npm install
```

3. Run the project:

```
Bash

npm run dev
```

4. Access http://localhost:8080 in your web browser.

5. Use the web app to create new PPT files.
   
