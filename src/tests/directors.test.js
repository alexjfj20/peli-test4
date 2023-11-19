const request = require('supertest');
const app = require('../app');
const Directors = require('../models/Directors');
require('../models');

let id;

test('GET / directors debe mostrar todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);  
});

test('POT / directors debe crear un director', async () => {
  

      const directors = {
             
           firstName: "Ashley",
           lastName: "Judd",
           nationality: "EEUU",
           image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Ashley_Judd_-_2014.jpg/220px-Ashley_Judd_-_2014.jpg",
           birthday: "1968/04/19",
      }

    const res = await request(app).post('/directors').send(directors);

     id = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(directors.firstName);
    
});

test('PUT /directors/:id se debe actualizar un director ', async () => {

      const directors = {

        firstName: "Ashley  actualizado"  

      }


    const res = await  request(app).put(`/directors/${id}`).send(directors);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directors.firstName);
    
});

test('DELETE /directors/id debe borrar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
    
});




