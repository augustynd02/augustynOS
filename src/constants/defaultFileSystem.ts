import { FileSystem } from "../types/FileSystem";
import createFolder from "../utils/createFolder";
import createTextFile from "../utils/createTextFile";
import createBrowser from "../utils/createBrowser";
import createImageFile from "../utils/createImageFile";

const reactIcon = createImageFile('react-icon', 'React', 'https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-2945110.png?f=webp&w=256');
const nodeIcon = createImageFile('node-icon', 'NodeJS', 'https://cdn.iconscout.com/icon/free/png-256/free-nodejs-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226035.png');
const expressIcon = createImageFile('express-icon', 'ExpressJS', 'https://img.icons8.com/color/512/express-js.png');
const nextIcon = createImageFile('next-icon', 'NextJS', 'https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png');
const sassIcon = createImageFile('sass-icon', 'Sass', 'https://sass-lang.com/assets/img/styleguide/seal-color.png');
const tsIcon = createImageFile('ts-icon', 'Typescript', 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png');
const pgIcon = createImageFile('pg-icon', 'PostgreSQL', 'https://cdn-icons-png.flaticon.com/256/5968/5968342.png');
const prismaIcon = createImageFile('prisma-icon', 'Prisma', 'https://icons.iconarchive.com/icons/simpleicons-team/simple/256/prisma-icon.png');
const awsIcon = createImageFile('aws-icon', 'AWS S3', 'https://pcr.cloud-mercato.com/static/img/logo/aws.png');
const cssModulesIcon = createImageFile('cssmodules-icon', 'CSS Modules', 'https://clinyong.gallerycdn.vsassets.io/extensions/clinyong/vscode-css-modules/0.5.3/1736577003817/Microsoft.VisualStudio.Services.Icons.Default');
const cloudinaryIcon = createImageFile('cloudinary-icon', 'Cloudinary', 'https://avatars.githubusercontent.com/u/1460763?s=280&v=4');
const reactRouterIcon = createImageFile('reactrouter-icon', 'React Router', 'https://www.svgrepo.com/show/354262/react-router.svg');
const htmlIcon = createImageFile('html-icon', 'HTML', 'https://cdn.iconscout.com/icon/free/png-256/free-html-5-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-language-pack-logos-icons-1175208.png?f=webp&w=256');
const cssIcon = createImageFile('css-icon', 'CSS', 'https://cdn.iconscout.com/icon/free/png-256/free-css3-logo-icon-download-in-svg-png-gif-file-formats--css-programming-langugae-language-pack-logos-icons-1175237.png?f=webp&w=256');
const jsIcon = createImageFile('js-icon', 'JavaScript', 'https://cdn-icons-png.freepik.com/512/5968/5968292.png');
const webpackIcon = createImageFile('webpack-icon', 'Webpack', 'https://cdn.iconscout.com/icon/free/png-256/free-webpack-logo-icon-download-in-svg-png-gif-file-formats--programming-language-logos-pack-icons-1174982.png');
const viteIcon = createImageFile('vite-icon', 'Vite', 'https://logospng.org/download/vite-js/vite-js-256-logo.png');
const ejsIcon = createImageFile('ejs-icon', 'EJS', 'https://www.svgrepo.com/show/373574/ejs.svg');
const jestIcon = createImageFile('jest-icon', 'Jest', 'https://cdn.iconscout.com/icon/free/png-256/free-jest-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-4-pack-logos-icons-2945020.png')

const defaultFileSystem: FileSystem = createFolder('root', "Root", [
    createFolder("desktop", "Desktop", [
        createFolder("projects", "Projects", [
            createFolder("syncspace-folder", "syncspace", [
                createBrowser("syncspace-browser", "syncspace", '', 'https://syncspace-cyan.vercel.app'),
                createTextFile("syncspace-readme", 'README.txt', `syncspace is a social media platform for synchroning with those who matter and connecting in a shared digital space, designed to make collaboration, interaction, and sharing a breeze.

This project utilizes Next.js on the client side and an Express server with a REST API on the backend, with a PostgreSQL database integrated with AWS S3 storage.

Main functionality includes JWT authentication, SSR pages, viewing user data based on login status and relationship between users:
- not logged in: can only see user info
- logged in but not friends: can also see user posts
- logged in and friends: can also see friend list

The application allows creating posts with images (that are stored in AWS S3 and retrieved with presigned URLs), creating comments and liking posts & comments.

There is a notification system for user actions, for example when someone sends you a friend request, likes your post/comment, or comments on your post.

Profiles are customizable with avatars, background images, bios etc.

I also implemented a real-time chat using WebSockets.

Create an account and check it out! It only takes a second. I hope you like it!`),
                createFolder("syncspace-stack", "Project stack", [
                    tsIcon,
                    reactIcon,
                    nodeIcon,
                    expressIcon,
                    nextIcon,
                    sassIcon,
                    pgIcon,
                    prismaIcon,
                    awsIcon
                ])
            ]),
            createFolder('aspdevs-folder', 'aspdevs', [
                createBrowser("aspdevs-browser", "aspdevs", '', 'https://aspdevs.vercel.app'),
                createTextFile("aspdevs-readme", 'README', `aspdevs is a full-stack blog application for aspiring web developers. It utilizes React on the frontend and Express on the backend with a PostgreSQl database.

The app allows the user to browse and filter the posts in a clean UI, and also view individual post pages quickly with React Router navigation. Users can also create an account or log in to add comments to posts.

There is also a custom CMS for admins, allowing for performing CRUD operations on the posts.`),
                createFolder("aspdevs-stack", "Project stack", [
                    reactIcon,
                    reactRouterIcon,
                    nodeIcon,
                    expressIcon,
                    cssModulesIcon,
                    pgIcon,
                    prismaIcon,
                    cloudinaryIcon,
                ]),

            ]),

            createFolder('older-folder', 'Older projects', [
                createTextFile('older-readme', 'README', `Here are some selected older projects from me. Not all, of course - you can check all my work on GitHub. I couldn't host some of these, so be sure to check out the code in the repository`),
                createFolder('battleship-folder', 'Battleship', [
                    createBrowser('battleship-browser', 'Battleship', '', ''),
                    createTextFile('battleship-readme', 'README', `This is a classic Battleship game, where you can play with a computer. It was created with just HTML, CSS and JS. It's also tested with Jest.`),
                    createFolder('battleship-stack', 'Project stack', [
                        htmlIcon,
                        cssIcon,
                        jsIcon,
                        webpackIcon,
                        jestIcon
                    ])
                ]),
                createFolder('todolater-folder', 'TODOlater', [
                    createBrowser('todolater-browser', 'TODOlater', '', 'https://augustynd02.github.io/top-todo/'),
                    createTextFile('todolater-readme', 'README', `TodoLater is a todo application using HTML, CSS and JS. Probably every developer has made a todo app at least once!`),
                    createFolder('todolater-stack', 'Project stack', [
                        htmlIcon,
                        cssIcon,
                        jsIcon,
                        webpackIcon
                    ])
                ]),
                createFolder('ultrashop', 'Ultrashop', [
                    createBrowser('ultrashop-browser', 'UltraShop', ''),
                    createTextFile('ultrashop-readme', 'README', `This project implements a React Router navigation to view product listing of a shop and allows adding items to cart, as well as checking out of the cart.`),
                    createFolder('ultrashop-stack', 'Project stack', [
                        reactIcon,
                        reactRouterIcon,
                        viteIcon,
                    ])
                ]),
                createFolder('theclub', 'the CLUB', [
                    createTextFile('theclub-readme', 'README', `the CLUB is a server-only application that renders pages with EJS and returns them to the client. It's a small app that handles authentication and role-based access and allows adding and viewing messages for logged users only, as well as performing CRUD operations on posts and users for admins. Unfortunately, no preview for this project for now...`),
                    createFolder('theclub-stack', 'Project stack', [
                        nodeIcon,
                        expressIcon,
                        pgIcon,
                        ejsIcon
                    ])
                ]),
                createFolder('inventory', 'Inventory app', [
                    createTextFile('inventory-readme', 'README', `This project is a server-only application that renders pages with EJS and returns them to the client. It allows for manipulating an inventory of items with categories, which could be utilized by a shop or even in household to store information about what you have or what you need. Unfortunately, no preview for this for now...`),
                    createFolder('inventory-stack', 'Project stack', [
                        nodeIcon,
                        expressIcon,
                        pgIcon,
                        ejsIcon
                    ])
                ])
            ]),
        ]),

        createFolder('landingpages-folder', 'Freelance landing pages', [
            createFolder('sk', 'Stylist & designer', [
                createBrowser('sk-browser', 'Stylist & designer landing page', '', 'https://sylviakozlowska.pl'),
                createTextFile('sk-readme', 'README', `This is a paid landing page project for a stylist. I provided progress updates and adapted the design to their
feedback, ensuring satisfaction. It showcases their portfolio, work and services.`),
                createFolder('sk-stack', 'Project stack', [
                    htmlIcon,
                    cssIcon,
                    jsIcon,
                    viteIcon,
                ])
            ]),
            createFolder('isabella', 'Nail salon', [
                createBrowser('isabella-browser', 'Nail salon landing page', ''),
                createTextFile('isabella-readme', 'README', `This is a landing page for a local nail salon, showcasing the offer, gallery, reservation form, etc. Styled based on the client's prefernces, fully responsive. Still waiting for the client to provide text, so placeholders for now.`),
                createFolder('isabella-stack', 'Project stack', [
                    htmlIcon,
                    cssIcon,
                    jsIcon,
                    viteIcon,
                ])
            ])
        ]),

        createImageFile('resume_en', 'Resume (EN)', 'resume-en.jpg'),
        createImageFile('resume_pl', 'Resume (PL)', 'resume-pl.jpg'),
        createTextFile('desktop_readme', 'README', `Hello, and welcome to my portfolio: augustynOS.
This application showcases my work inside an imitated system environment within the browser.

This is still work in progress - I'll be implementing new features, like more apps, settings, etc...

Current features:
- File storage with nested directories
- A browser for viewing webpages (with no X-Frame-Options: DENY header)
- Folders for file storage
- Editable text files
- Openable images
- Applications/files rendered within interactive windows that can be dragged, resized, minimized, maximized etc.
- Desktop with draggable icons
- Currently opened apps in the taskbar
- A clock for current time
- and more to come!`),
        createTextFile('about_me', 'About me', `My name is Dominik Augustyn and I'm a full-stack developer with a strong foundation in JavaScript/Typescript, React, and Node.js with Express, I enjoy building web applications that are both functional and visually appealing.

I've been self-learning web development for more than 2 years now - at first tinkering around by myself, but then coming upon an online curriculum called The Odin Project which gave me a learning path to follow. I made a lot of small projects along the way which you can check out on github - ranging from a simple calculator or an Etch-A-Sketch app, to functioning complex full-stack applications like syncspace, which you can check out (as well as other selected projects) in the directories on the desktop.

I enjoy programming because solving problems brings me satisfaction. Nothing beats the joy of finally completing a complex task. Besides that, I love learning new things and I grasp new stuff quickly. That's why for my career I wanted something that would allow me to constantly grow - and programming is exactly what I needed, as there is always something new to learn.

Some fun facts about me:
- I really like cold. Like, really,
- My favorite color is definitely purple.
- My favorite animal is a turtle.`),
    ]),
]);

export default defaultFileSystem;
