const Event = use('Event');
const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');

Event.on('new::user', async (user, token) => {
  const confirmAccountUrl = `${Env.get('APP_URL')}/confirm?token=${token}`;
  const subject = Antl.formatMessage('response.welcome');

  await Mail.send(
    'emails.confirm',
    { name: user.name, confirmAccountUrl },
    message => {
      message
        .to(user.email)
        .from('Dale.gg')
        .subject(subject);
    }
  );
});
