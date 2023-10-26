// // import express from 'express';
// // const express = require('express')
// import path from 'path';
// import opentype from 'opentype.js';
// const fs = require('fs');
// // const api = require();
// const fontFile = require('../../public/Roboto-Medium.ttf');
// // import { Fonts } from '@next/font';

// const fonts = new Fonts();




// // const app = express();
// let fontCache = null;

// // app.get('/getParsedFont', (req, res) => {

// export default function loadFont(req, res) {
//     try {
//         if (fontCache === null) {
// const fontData = await fonts.parse('../../public/Roboto-Medium.ttf');
//          opentype.load(fontData, (err, font) => {
//         if (err) {
//             res.status(500).json({ error: 'Font could not be loaded.' });
//             return;
//         }
//         fontCache = font;
//         // You can send specific parts of the font object or the entire object
//         // Depending on your needs and the size of the object
//         res.json(font);
//     }) 
// } else {
//         res.json(fontCache);
//         }
//     } catch (error) {
//         console.error(error)
//     }


// }
// // });

// // app.listen(3001, () => {
// //     console.log('Server started on http://localhost:3001');
// // });


