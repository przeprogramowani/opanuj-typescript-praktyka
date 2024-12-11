import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import RootApp from './RootApp';

// Dynamically import all App.tsx files within tasks/react-pro
const modules = import.meta.glob('../../tasks/react-pro/**/App.tsx');

function getExerciseRoutes() {
  return Object.keys(modules)
    .map((path) => {
      // Extract the exercise name from the path using regex
      const match = path.match(/tasks\/react-pro\/(\d+-[^/]+)\/App\.tsx$/);
      if (match) {
        const exerciseName = match[1];

        return { path, exerciseName };
      }

      return null;
    })
    .filter((route) => route !== null);
}

const exerciseRoutes = getExerciseRoutes();

const dynamicRoutes = exerciseRoutes.map(({ path, exerciseName }) => {
  const Component = React.lazy(
    modules[path] as () => Promise<{ default: React.ComponentType<any> }>,
  );
  return (
    <Route
      key={exerciseName}
      path={`/${exerciseName}`}
      element={
        <Suspense fallback={<div>Loading {exerciseName}...</div>}>
          <Component />
        </Suspense>
      }
    />
  );
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootApp routes={exerciseRoutes} />} />
      {dynamicRoutes}
    </Routes>
  </BrowserRouter>,
);
