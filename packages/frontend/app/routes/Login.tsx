import type { Route } from './+types/Login';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Login' }, { name: 'description', content: 'Login page' }];
}

export default function LoginRoute() {
  return <></>;
}
