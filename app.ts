import express, { Express, Request, Response } from "express";
import { PrismaClient }  from '@prisma/client';
import morgan, { StreamOptions } from "morgan";

const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT || 5000;

/*
if (process.env.NODE_ENV === 'development') {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env_NODE_ENV === 'production') {
	app.use(express.errorHandler());
}
*/

app.use(morgan('combined'));

app.get('/api/films', async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    include: {
      genres: true,
      actors: true,
      director: true,
    },
  })
  res.json(movies);
});

app.get('/api/actors', async (req: Request, res: Response) => {
  const actors = await prisma.actor.findMany({
    include: {
      movies: true,
    },
  })
  res.json(actors);
});     

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
