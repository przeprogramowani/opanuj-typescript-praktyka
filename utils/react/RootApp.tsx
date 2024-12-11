import { NavLink } from 'react-router';

type RootAppProps = {
  routes: { path: string; exerciseName: string }[];
};

const RootApp = ({ routes }: RootAppProps) => {
  return (
    <nav>
      <ul className="flex flex-wrap gap-4 text-center">
        {routes.map(({ exerciseName, path }) => (
          <li key={exerciseName} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <NavLink
              to={`/${exerciseName}`}
              className="block p-6 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl card-hover"
            >
              <h2 className="text-xl font-semibold text-blue-300">{exerciseName}</h2>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RootApp;
