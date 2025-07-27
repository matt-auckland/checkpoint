import type { Route } from './+types/StandUp';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Stand Up DATE - TEAAMNAME' },
    { name: 'description', content: 'DATE Stand up for TEAMNAME' },
  ];
}

export default function StandUpRoute() {
  return (
    <>
      <h1>Stand up</h1>
      <Welcome />
    </>
  );
}
