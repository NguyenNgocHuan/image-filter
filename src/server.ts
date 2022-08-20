
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get('/filteredimage', async (req: Request, res: Response) => {
    let {image_url} = req.query;

    // const response = await fetch('https://google.com', {
    //     method: 'HEAD'
    // });
    
    // console.log(response.ok);
    // console.log(image_url);
    // if (!image_url) {
    //   return res.status(400).send(`image_url is required`);
    // }
    // try {
    //   const response = await fetch(image_url);
    //   if (!response.ok) {
    //     throw new Error(`Error! status: ${response.status}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // fetch(image_url).then((data) => {
    //   console.log(data);
    // });
    filterImageFromURL(image_url).then((data) => {
      if (data) {
        deleteLocalFiles(image_url);
        return res.status(200).send(data);
      }
      return res.status(404).send(`image_url not found`);
    });
    return res.status(404).send(`image_url not found`);
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