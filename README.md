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
src/
├── assets/
│   ├── css/
│   │   └── style.css  (or your main stylesheet)
│   ├── fonts/
│   │   └── [Font name].ttf  (Optional: Custom fonts)
│   └── images/
│       └── [Image name].png  (or other image formats)
├── App.js  (Main application component)
├── components/
│   └── [Component name].js  (Reusable UI components)
├── hooks/  (Optional: Custom React hooks for state management)
├── index.js  (Entry point for the application)
├── layouts/  (Optional: Layouts for different page structures)
├── services/  (Optional: API interaction or data fetching logic)
├── utils/  (Utility functions used across the application)
└── router.js  (Configuration for routing between components)
package.json
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
   
