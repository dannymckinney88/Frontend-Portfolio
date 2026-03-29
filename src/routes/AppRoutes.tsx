import { Route, Routes } from 'react-router-dom';

import AdaAudit from '@/features/adaScanner/AdaAudit';
import GithubExplorer from '@/features/githubExplorer/GithubExplorer';
import Home from '@/features/homePage/Home';
import Todo from '@/features/todoApp/Todo';
import { routePaths } from '@/lib/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routePaths.home} element={<Home />} />
      <Route path={routePaths.todoApp} element={<Todo />} />
      <Route path={routePaths.githubExplorer} element={<GithubExplorer />} />
      <Route path={routePaths.accessibilityAudit} element={<AdaAudit />} />
    </Routes>
  );
}
