## Web application for creating and exporting PPT file

**Objective:**

* Create a comprehensive web app for PPT file generation using only front-end technologies.

**Tech Stack:**

* Frontend: HTML, CSS, TypeScript, Reactjs

**Features (to be implemented):**

* Create new PPT slides
* Add content (text, images, tables, charts)
* Format content (fonts, colors, sizes, positions)
* Navigate between slides
* Export complete PPT file

**Project Structure:**
```
.
├── PresentationMaker/
│   └── src/
│       └──── public/
│             ├── stores some public media files
│             └── this also stores index.html
│       ├── App.js
│       ├── index.js --> Main application js file
│       ├── ...
│       ├── css/
│       │   └── Stores all css files of all components and pages
│       ├── pages/
│       │   └── Each js file contains a single page. Website might have multiple pages.
│       └── components/
│           └── Stores all small components that can be reused. If not reusable, pls don't add in here.
├── package.json
└── README.md
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

npm run build
or
npm start
```

4. Access http://localhost:3000 in your web browser.

5. Use the web app to create new PPT files.
   
