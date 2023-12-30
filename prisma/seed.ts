import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
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
    ],
  });

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
          connect: {
            id: 2,
          },
        },        
      },
  });

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

