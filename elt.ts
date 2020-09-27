import _axios from 'axios';
import { Put } from '@nestjs/common';

const axios = _axios.create({ baseURL: 'http://localhost:5000/api/v1/' });

/**
 * TODO:
 * GET / all resorces
 * GET /id single resource
 * POST / create a resource
 * PUT /id update resource
 * DELETE /id resource
 */
(async () => {
  try {
    // const { data: cats } = await axios.get('cats');
    // console.log(cats);
    const { data: cat } = await axios.get('cats/s72979');
    console.log(cat);
    // const { data } = await axios.post('cats', {
    //   name: true,
    //   breed: 23,
    //   age: 'skks',
    // });
    // const { data } = await axios.put('cats/janjqkq', {
    //   // name: 'cat',
    //   age: 23,
    //   papa: 'kss',
    //   breed: 'next life',
    // });
    // const { data } = await axios.delete('cats/123?search=k');
    // const { data } = await axios.get('cats/kid123');
    // const { data } = await axios.post('/users', {
    //   username: 'hjd',
    //   password: 'njncjncdwd',
    // });

    // console.log(data);
  } catch (ex) {
    console.log(ex.response.data);
    // console.log(ex.message);
  }
})();
