import type { Route } from './+types/Team';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'TEAMNAME' },
    { name: 'description', content: 'Page for TEAMNAME' },
  ];
}

export default function TeamRoute() {
  return <></>;
}
