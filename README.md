# Marvin Kiel Dolor Mendiola — Personal Portfolio

A responsive personal portfolio for Marvin Kiel Dolor Mendiola, a 4th-year BSIT student at La Consolacion University of the Philippines. It presents education, technical skills, academic projects, achievements, and contact options.

## Technology

- HTML5, CSS, and vanilla JavaScript
- Tailwind CSS via CDN
- Google Fonts and Material Symbols via CDN

The portfolio owner’s listed skills include L, HTML, CSS, JavaScript, PHP, MySQL, Git, and Figma.

## Folder structure

```text
personal-portfolio/
├── index.html
├── script.js
├── README.md
└── images/
    ├── access-badge.png.png
    ├── kk.jpg
    ├── certificates/
    │   ├── foundational-c-sharp-with-microsoft.png
    │   └── testdome-html-css.png
    ├── practifolio/
        ├── practifolio-01-login.png
        ├── practifolio-02-overview.png
        └── ... (9 more screenshots)
    ├── jump-game/
    │   └── ... (4 screenshots)
    └── taskmate/
        └── ... (9 screenshots)
```

Practifolio includes 11 local screenshots, Jump Game has four in `images/jump-game/`, and TaskMate has nine in `images/taskmate/`. Open a project's **View Screenshots** button to browse its gallery with the on-screen arrows or keyboard arrow keys. The Microsoft Access, Foundational C# with Microsoft, and TestDome HTML/CSS certificates are displayed in the Achievements section.

The hero **Download CV** button expects the resume at `assets/Marvin-Kiel-Mendiola-CV.pdf`. Add the PDF at that path before publishing so visitors can download it.

## View the site

1. Open `index.html` directly in a modern browser, or serve this folder locally:

   ```sh
   python -m http.server 8000
   ```

2. Visit [http://localhost:8000](http://localhost:8000).

Tailwind CSS, Google Fonts, and Material Symbols are loaded from CDNs, so an internet connection is needed for those resources. Navigation, project details, screenshot galleries, and contact-form behavior are handled locally by `script.js`; the contact form prepares an email draft and does not use a server backend.

## Add project and certificate images

Add image files under `images/`, then replace each matching `Coming Soon` placeholder in `index.html` with an image element. To add a screenshot gallery, add its image paths and captions to `projectGalleries` in `script.js`, then set the matching project button's `data-project-gallery` value to that gallery key.
