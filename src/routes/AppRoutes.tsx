import { Route, Routes } from 'react-router-dom';

import AdaAudit from '@/pages/AdaAudit';
import Counter from '@/pages/Counter';
import GithubExplorer from '@/pages/GithubExplorer';
import Home from '@/pages/Home';
import Todo from '@/pages/Todo';
import { routePaths } from '@/lib/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routePaths.home}               element={<Home />} />
      <Route path={routePaths.counterApp}          element={<Counter />} />
      <Route path={routePaths.todoApp}             element={<Todo />} />
      <Route path={routePaths.githubExplorer}      element={<GithubExplorer />} />
      <Route path={routePaths.accessibilityAudit}  element={<AdaAudit />} />
    </Routes>
  );
}
