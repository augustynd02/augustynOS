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

const defaultFileSystem: FileSystem = createFolder('root', "Root", [
    createFolder("desktop", "Desktop", [
        createFolder("projects", "Projects", [
            createFolder("syncspace-folder", "syncspace", [
                createBrowser("syncspace-browser", "syncspace", '', 'https://syncspace-cyan.vercel.app'),
                createTextFile("syncspace-readme", 'README.txt', 'asd'),
                createFolder("syncspace-stack", "Project stack", [
                    createTextFile('syncspace-stack-text', 'Stack', 'asd'),
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
                createTextFile("aspdevs-readme", 'README.txt', 'asd'),
                createFolder("aspdevs-stack", "Project stack", [
                    createTextFile('aspdevs-stack-text', 'Stack', 'asd'),
                    reactIcon,
                    reactRouterIcon,
                    nodeIcon,
                    expressIcon,
                    cssModulesIcon,
                    pgIcon,
                    prismaIcon,
                    cloudinaryIcon,
                ])
            ]),
        ]),

        createFolder('older-folder', 'Older projects', [
            createTextFile('older-readme', 'README.TXT', 'old projects'),
            createFolder('todolater-folder', 'TODOlater', [
                createBrowser('todolater-browser', 'TODOlater', '', 'https://augustynd02.github.io/top-todo/'),
                createFolder('todolater-stack', 'Project stack', [
                    createTextFile('aspdevs-stack-text', 'Stack', 'asd'),
                    htmlIcon,
                    cssIcon,
                    jsIcon,
                    webpackIcon
                ])
            ]),
            createFolder('ultrashop', 'Ultrashop', [
                createBrowser('ultrashop-browser', 'UltraShop', ''),
                createFolder('ultrashop-stack', 'Project stack', [
                    createTextFile('ultrashop-stack-text', 'Stack', 'asd'),
                    reactIcon,
                    reactRouterIcon,
                    viteIcon,
                ])
            ]),
            createFolder('theclub', 'the CLUB', [
                createBrowser('theclub-browser', 'the CLUB', ''),
                createFolder('theclub-stack', 'Project stack', [
                    createTextFile('theclub-stack-text', 'Stack', 'asd'),
                    nodeIcon,
                    expressIcon,
                    pgIcon,
                    ejsIcon
                ])
            ]),
            createFolder('inventory', 'Inventory app', [
                createBrowser('inventory-browser', 'Inventory app', ''),
                createFolder('inventory-stack', 'Project stack', [
                    createTextFile('inventory-stack-text', 'Stack', 'asd'),
                    nodeIcon,
                    expressIcon,
                    pgIcon,
                    ejsIcon
                ])
            ])
        ]),

        createFolder('landingpages-folder', 'Landing pages', [
            createFolder('sk', 'Stylist & designer', [
                createBrowser('sk-browser', 'Stylist & designer landing page', '', 'https://sylviakozlowska.pl'),
                createFolder('sk-stack', 'Project stack', [
                    createTextFile('sk-stack-text', 'Stack', 'asd'),
                    htmlIcon,
                    cssIcon,
                    jsIcon,
                ])
            ]),
            createFolder('isabella', 'Nail salon', [
                createBrowser('isabella-browser', 'Nail salon landing page', ''),
                createFolder('isabella-stack', 'Project stack', [
                    createTextFile('isabella-stack-text', 'Stack', 'asd'),
                    htmlIcon,
                    cssIcon,
                    jsIcon,
                ])
            ])
        ]),

        createFolder('aboutme', 'About me', [
            createTextFile('aboutme', 'About me', 'ttt')
        ])
    ]),
]);

export default defaultFileSystem;
