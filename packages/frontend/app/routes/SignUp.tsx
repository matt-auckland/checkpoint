import type { Route } from './+types/SignUp';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'SignUp' }, { name: 'description', content: 'SignUp page' }];
}

export default function SignUpRoute() {
  return (
    <>
      <h1>SignUp</h1>
      <Welcome />
    </>
  );
}
