import {
  type RouteConfig,
  route,
  index,
  layout,
} from '@react-router/dev/routes';

export default [
  layout('routes/BaseLayout.tsx', [
    index('./routes/Home.tsx'),
    route('login', './routes/Login.tsx'),
    route('signup', './routes/SignUp.tsx'),
    route('user/:id', './routes/UserProfile.tsx'),
    // route('/team/:id?date&userId', 'routes/StandUp.tsx'),
    route('team/:id', 'routes/Team.tsx'),
    route('team/:id/settings', 'routes/TeamSettings.tsx'),
  ]),
] satisfies RouteConfig;
