const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

require('../models')  // 

let id;

test('GET / movies debe mostrar todos los movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    
});

test('POT /movies debe crear un movie', async () => {

    const movies = {
         
            name: "Eliminators",
            image:"https://images-2.rakuten.tv/storage/global-movie/translation/artwork/dc2b6741-f065-4e11-be66-928b188b71c3-width317-quality60.jpeg",
            synopsis: "Thomas, un ex agente federal en protección de testigos, tiene que abandonar su escondite en Londres cuando tres hombres",
            releaseYear: "2014/05/10",
    }

    const res = await request(app).post('/movies').send(movies);
    
    // console.log(res.body);

     id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movies.name);
    
});

test('PUT / movies/:id se debe actualizar un movies', async () => {

       const movies = {
 
             name: "Eliminators actualizado"

       }
    
     res = await request(app).put(`/movies/${id}`).send(movies);
     expect(res.status).toBe(200);
     expect(res.body.name).toBe(movies.name);

});

test('POST /movies/:id/actors debe crear una relacion con actor', async () => {

    const  actor = await Actors.create({

        firstName: "Clint",
        lastName: "Eastwood",
        nationality: "EEUU",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Clint_Eastwood_at_2010_New_York_Film_Festival.jpg/200px-Clint_Eastwood_at_2010_New_York_Film_Festival.jpg",
        birthday: "1930/05/31",
    });

   
     const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
     await actor.destroy();
     expect(res.status).toBe(200);
     expect(res.body).toHaveLength(1);    //thl
    
    
});


test('POST /movies/:id/directors debe crear un ralacion de director', async () => {

      const director =  await Directors.create({
             
                firstName: "Ben",
                lastName: "Affleck",
                nationality:  "EEUU",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/220px-Ben_Affleck_by_Gage_Skidmore_3.jpg",
                birthday: "1972/10/15"
      })



    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy(); // aqui se borrar
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1); // este lo mismo que thl

    
});


test('POST /movies/:id/genres debe crear un relacion de genero', async () => {

     const genero = await Genres.create({
              name: "ficcion"
     })

    const res = await request(app).post(`/movies/${id}/genres`).send([genero.id]);
    await genero.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    
});



test('DELETE /movies/:id se debe borrar un  movie', async () => {

    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
    
});






