## Web application for creating and exporting PPT file

**Objective:**

- Create a comprehensive web app for PPT file generation using only front-end technologies.

**Tech Stack:**

- Frontend: HTML, CSS, TypeScript, Reactjs

**Features (to be implemented):**

- Create new PPT slides
- Add content (text, images, tables, charts)
- Format content (fonts, colors, sizes, positions)
- Navigate between slides
- Export complete PPT file

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

2. Install required libraries:

```
Bash

# Rust: https://www.rust-lang.org/tools/install
WSL: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Node:
cd pm-app
npm install

```

3. Run the project:

```
Bash

cd src-tauri

npx tauri dev
or
npx tauri build
```

4. A desktop app will pop up || Access http://localhost:3000 in your web browser.

5. Use the web app to create new PPT files.
