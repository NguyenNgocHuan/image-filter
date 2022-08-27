
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isUrlValid} from './util/util';
import fetch from 'cross-fetch';
(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/filteredimage', async (req: Request, res: Response) => {
    let {image_url}: {image_url: string}= req.query;
    if (!isUrlValid(image_url)) {
      return res.status(400).send(`image_url is invalid`);
    }
    fetch(image_url).then(data => {
      if (data.ok) {
        filterImageFromURL(image_url).then((data) => {
        if (data) {
          res.on('finish', () => deleteLocalFiles([data]));
          return res.status(200).sendFile(data);
        }
        return res.status(404).send(`image_url not found`);
        }, () => {
          return res.status(403).send(`can not read image`);
        });
      } else {
        return res.status(404).send(`image_url not found`);
      }
    })
  });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();