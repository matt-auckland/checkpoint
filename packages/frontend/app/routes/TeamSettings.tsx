import type { Route } from './+types/TeamSettings';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Team Settings' },
    { name: 'description', content: 'Settings for TEAMNAME' },
  ];
}

export default function TeamSettingsRoute() {
  return <></>;
}
