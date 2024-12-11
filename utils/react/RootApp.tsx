import { NavLink } from 'react-router';

type RootAppProps = {
  routes: { path: string; exerciseName: string }[];
};

const RootApp = ({ routes }: RootAppProps) => {
  return (
    <nav>
      <ul>
        {routes.map(({ exerciseName }) => (
          <li key={exerciseName}>
            <NavLink to={`/${exerciseName}`}>{exerciseName}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RootApp;
