import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function attachGenre(film_id: number, genre_id: number){
 const addGenres = await prisma.movie.update({
    where: {
      id: film_id,
    },
    data: {
      genres: {
	connect: {
		id: genre_id,
	},
      },
    },
  });
}

async function attachActor(film_id: number, actor_id: number){
 const addActor = await prisma.movie.update({
    where: {
      id: film_id,
    },
    data: {
      actors: {
	connect: {
		id: actor_id,
	},
      },
    },
  });
}

async function main() {

  const directors = await prisma.director.createMany({
    data: [
      { name: 'Christopher Nolan' },
      { name: 'Quentin Tarantino' },
      { name: 'Steven Spielberg' },
      { name: 'Martin Scorsese' },
      { name: 'James Cameron' },
    ],
  });

  const genres = await prisma.genre.createMany({
    data: [
      { name: 'Action' },
      { name: 'Drama' },
      { name: 'Science Fiction' },
      { name: 'Comedy' },
      { name: 'Adventure' },
    ],
  });

  const actors = await prisma.actor.createMany({
    data: [
      { name: 'Leonardo DiCaprio' },
      { name: 'Brad Pitt' },
      { name: 'Tom Hanks' },
      { name: 'Robert De Niro' },
      { name: 'Arnold Schwarzenegger' },
      { name: 'Samuel L. Jackson' },
      { name: 'Tim Roth' },
      { name: 'John Travolta' },
      { name: 'Uma Thurman' },
    ],
  });


  const movies = await prisma.movie.createMany({
    data: [
      {
        title: 'Inception',
        year: 2010,
        rating: 8.8,
        directorId: 1,
        runtime: 148,
        plot: 'A thief who enters the dreams of others to steal their secrets embarks on an ambitious heist.',
        posterUrl: 'https://example.com/poster1.jpg',
      },
      {
        title: 'Pulp Fiction',
        year: 1994,
        rating: 8.9,
        directorId: 2,
        runtime: 154,
        plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine.',
        posterUrl: 'https://example.com/poster2.jpg',
      },
      {
        title: 'Schindler\'s List',
        year: 1993,
        rating: 8.9,
        directorId: 3,
        runtime: 195,
        plot: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
        posterUrl: 'https://example.com/poster3.jpg',
      },
      {
        title: 'Goodfellas',
        year: 1990,
        rating: 8.7,
        directorId: 4,
        runtime: 146,
        plot: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
        posterUrl: 'https://example.com/poster4.jpg',
      },
      {
        title: 'Avatar',
        year: 2009,
        rating: 7.8,
        directorId: 5,
        runtime: 162,
        plot: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        posterUrl: 'https://example.com/poster5.jpg',
      },
    ],
  });

  await attachGenre(1,1);
  await attachGenre(2,2);
  await attachActor(1,1);
  await attachActor(2,6);
  await attachActor(2,7);
  await attachActor(2,8);
  await attachActor(2,9);
  /*
 const addGenres = await prisma.movie.update({
    where: {
      id: 1,
    },
    data: {
      genres: {
	connect: {
		id: 1,
	},
      },
    },
  });
*/
  /*
  const movies = await prisma.movie.create({
    data: 
      {
        title: 'Inception',
        year: 2010,
        rating: 8.8,
        directorId: 1,
        runtime: 148,
        plot: 'A thief who enters the dreams of others to steal their secrets embarks on an ambitious heist.',
        posterUrl: 'https://example.com/poster1.jpg',
        genres: { 
          connect: {
            id: 1,
          },
        },        
      },
  });
  */
  /*
  const movies_2 = await prisma.movie.create({
    data: 
      {
        title: 'Pulp Fiction',
        year: 1994,
        rating: 8.9,
        directorId: 2,
        runtime: 154,
        plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine.',
        posterUrl: 'https://example.com/poster2.jpg',
        genres: { 
          connect: [
            { id: 2 },
          ],
        },        
	actors: {
	  connect: [
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
	  ],
	},
      },
  });
  */
  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

