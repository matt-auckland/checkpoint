import type { Route } from './+types/UserProfile';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'USERNAME Profile' },
    { name: 'description', content: 'Profile for USERNAME' },
  ];
}

export default function UserProfileRoute() {
  return <></>;
}
