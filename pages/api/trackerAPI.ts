

// export default function handler() {

// }









// import type { NextApiRequest, NextApiResponse } from 'next'
 
// type ResponseData = {
//   message: string
// }
 
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }


// let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   console.log(`IP Address: ${ip}`);
//   console.log(req.body);

// try {
//     let response = await axios.get(
//       `http://api.ipstack.com/${ip}?access_key=${IPSTACK_KEY}`
//     );
//     let data = response.data;
//     console.log(
//       `Location: ${data.city}, ${data.region_name}, ${data.country_name}`
//     );
//     console.log(`Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
//   } catch (error) {
//     console.error(`Error fetching IP information`, error.message);
//   }*/



//   module.exports = (req, res) => {
//     const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
//     console.log(ip);
//     res.status(200).send(`Your IP is ${ip}`);
//   };
  