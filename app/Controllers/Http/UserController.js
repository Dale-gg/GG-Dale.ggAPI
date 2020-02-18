// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Database = use('Database');
const Mail = use('Mail');
const Env = use('Env');

const { randomBytes } = require('crypto');
const { promisify } = require('util');

class UserController {
    async index({ response }) {
        const users = await Database.select('*').from('users');

        return response.status(200).json({ type: 'success-all-users', msg: 'Listing all users', users});
    }

    async store({ request, response }) {
        const { name, email, password } = request.only(['name', 'email', 'password']);

        const avatar = 'initAvatar213029dsa30129dsa4012453953kvfkdjt.jpeg';

        const user = await User.create({
            name,
            avatar,
            email,
            password
        }); 

        const random = await promisify(randomBytes)(16);
        const token = random.toString('hex');

        await user.tokens().create({
            token,
            type: 'confirmaccount',
        });

        const confirmAccountUrl = `${Env.get('APP_URL')}/confirm?token=${token}`;
        
        await Mail.send('emails.confirm', { name: user.name, confirmAccountUrl }, (message) => {
            message
                .to(user.email)
                .from('Dale.gg')
                .subject('RS/XP - Welcome to Rocketseat');
        });

        return response.status(200).json({ type: 'success-register', msg: `The user ${name}, has been successfully registered.`, user });
    }

    async delete({ response, params }) {
        const id = params.id;

        const user = await User.findBy({
            id
        });

        await user.delete();
        user.deleted = true;
        user.status = false;

        await user.save();

        return response.status(200).json({ type: 'user-soft-deleted', msg: 'Usuário desativado com sucesso', user });
    }

    async restore({ response, params }) {
        const id = params.id;
        
        await Database
            .table('users')
            .where('id', id)
            .update({ deleted_at: null, deleted: false, status: true });

        const user = await Database.table('users').where('id', id);

        return response.status(200).json({ type: 'user-soft-restored', msg: 'Usuário restaurado com sucesso', user });
    }
}

module.exports = UserController
