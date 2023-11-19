const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('Get / actors debe mostrar todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); //tbi
    
});

test('POT / actors debe crear un actor', async () => {

      const actors = {

              firstName: "Morgan",
              lastName: "jFreeman",
              nationality: "eeuu",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Academy_Award-winning_actor_Morgan_Freeman_narrates_for_the_opening_ceremony_%2826904746425%29_%28cropped%29.jpg/220px-Academy_Award-winning_actor_Morgan_Freeman_narrates_for_the_opening_ceremony_%2826904746425%29_%28cropped%29.jpg",
              birthday: "1937/06/01",
      }


    const res = await request(app).post('/actors').send(actors)

    id = res.body.id;
         
    expect(res.status).toBe(201); 
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actors.firstName);
    
});

test('PUT / actors/:id se debe actualizar un actor', async () => {

    const  actors = {
         
        firstName: " Morgan actualizar"
    
    }
    
    const res = await request(app).put(`/actors/${id}`).send(actors);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actors.firstName);
    
});

test('DELETE /actors/:id se debe borrar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
    
});