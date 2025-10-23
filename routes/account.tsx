import { Handlers, PageProps } from '$fresh/server.ts';
import { getSession } from '../utils/session.ts';
import { getUserByEmail } from '../utils/db.ts';
import { Head } from '$fresh/runtime.ts';

interface AccountData {
  user: {
    id: string;
    email: string;
    name?: string;
    createdAt: Date;
  };
}

export const handler: Handlers<AccountData> = {
  async GET(req, ctx) {
    const session = await getSession(req.headers.get('cookie') || '');

    if (!session) {
      return new Response('Redirect to login', {
        status: 302,
        headers: { Location: '/login' },
      });
    }

    const user = await getUserByEmail(session.email);

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return ctx.render({ user });
  },
};

export default function Account({ data }: PageProps<AccountData>) {
  const { user } = data;

  return (
    <>
      <Head>
        <title>Minha Conta - LOFERSIL</title>
      </Head>
      <div class='min-h-screen bg-gray-50 py-8'>
        <div class='max-w-md mx-auto bg-white rounded-lg shadow-lg p-6'>
          <h1 class='text-2xl font-bold text-gray-800 mb-6 text-center'>
            Minha Conta
          </h1>

          <div class='space-y-4'>
            <div>
              <label class='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <p class='mt-1 text-gray-900'>{user.email}</p>
            </div>

            <div>
              <label class='block text-sm font-medium text-gray-700'>
                Nome
              </label>
              <p class='mt-1 text-gray-900'>{user.name || 'Não definido'}</p>
            </div>

            <div>
              <label class='block text-sm font-medium text-gray-700'>
                Membro desde
              </label>
              <p class='mt-1 text-gray-900'>
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          <div class='mt-6 space-y-3'>
            <button type='button' class='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors'>
              Editar Perfil
            </button>

            <a
              href='/'
              class='block text-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors'
            >
              Voltar à Loja
            </a>
          </div>
        </div>
      </div>
    </>
  );
}