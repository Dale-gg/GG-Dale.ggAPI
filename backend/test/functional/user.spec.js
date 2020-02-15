const { test, trait } = use('Test/Suite')('User');

const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should be able to confirm the user', async ({ assert, client }) => {
    const email = 'lenonsec7@gmail.com';
    const type = 'confirmaccount';

    const user = await Factory.model('App/Models/User').create({ email });
    const userToken = await Factory.model('App/Models/Token').make({ type });
    
    await user.tokens().save(userToken);
  
    const response = await client
      .post('/confirm')
      .send({
        token: userToken.token
      })
      .end();
      
    response.assertStatus(204);
  
    await user.reload();
});

test('it should be able to soft delete an User', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create({
    name: 'João Lenon',
    email: 'lenonsec7@gmail.com',
    password: '123456',
  });

  const response = await client
    .delete(`/user/${user.id}`)
    .end();
  
  response.assertStatus(200);
});

test('it should be able to soft restore an User', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create({
    name: 'João Lenon',
    email: 'lenonsec7@gmail.com',
    password: '123456',
    deleted: true,
    status: false
  });

  const response = await client
    .put(`/user/${user.id}`)
    .end();
  
  response.assertStatus(200);
});

