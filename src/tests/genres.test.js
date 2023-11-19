const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /genres debe  mostrar todos los generos', async () => {

    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    
});

test('POST /genres  debe crear un genero', async () => {

    const genres = {
          
          name: "accion"

    }

    const res = await request(app).post('/genres').send(genres);

     id = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genres.name);
    
});

test('PUT /genres/:id debe actualizar un genero', async () => {

    const genres = {

          name: "accio actualizado"


    }

    const res = await request(app).put(`/genres/${id}`).send(genres)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genres.name);
    
});

test('DELETE /genres/:id debe borrar un genero', async () => {

    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
    
});



