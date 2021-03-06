import _axios from 'axios';
import { commerce, lorem, internet } from 'faker';

const axios = _axios.create({ baseURL: 'http://localhost:5000/api/v1/' });

/**
 * TODO:
 * GET / all resorces
 * GET /id single resource
 * POST / create a resource
 * PUT /id update resource
 * DELETE /id resource
 */

const generateUser = async () => {
  const {
    data: { token },
  } = await axios.post('users/register', {
    username: internet.userName(),
    password: 'password',
  });

  console.log(token);
  return token;
};

const newIdea = async token => {
  try {
    const { data } = await axios.post(
      'ideas',
      {
        idea: commerce.productAdjective(),
        description: commerce.productDescription(),
      },
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );

    console.log(data);
    return data;
  } catch (ex) {
    console.log(ex.response.data);
  }
};

const generateRandomNum = () => Math.floor(Math.random() * 10);

(async () => {
  try {
    // const { data: cats } = await axios.get('cats');
    // console.log(cats);
    // const { data: cat } = await axios.get('cats/s72979');
    // console.log(cat);
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
    // const { data } = await axios.get('users', {
    //   headers: {
    //     authorization:
    //       'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NWFlOTdkLWJjOWEtNDQzYS1iM2Y0LTk3YWZiYzdhMjIyNCIsInVzZXJuYW1lIjoiZmF0dHlsZWUiLCJpYXQiOjE2MDEyNDA0OTIsImV4cCI6MTYwMTg0NTI5Mn0.0F9wsda12Bc_C4URjTRY6btz8u_NAUj7QnAWWjnZO_E',
    //   },
    // });
    // const { data } = await axios.get('ideas');
    // const { data } = await axios.post('ideas', {
    //   idea: 'idea 2',
    //   description: 'ideas keep evolving, is something ...',
    // });
    // const { data } = await axios.put(
    //   'ideas/3d3611f-ed70-4012-bf61-c49ff6b007bf',
    //   {
    //     idea: 'idea 3',
    //   },
    // );
    // const { data } = await axios.get('ideas');
    // console.log(data);

    const randUsers = generateRandomNum();
    const randIdeas = generateRandomNum();

    // for (let i = 0; i < randUsers; i++) {
    //   const token = await generateUser();
    //   for (let j = 0; j < randIdeas; j++) {
    //     await newIdea(token);
    //   }
    // }
  } catch (ex) {
    console.log(ex.response.data);
    // console.log(ex.message);
  }
})();
