import { Route, Routes } from 'react-router-dom';

import AdaAudit from '@/features/adaScanner/AdaAudit';
import GithubExplorer from '@/features/githubExplorer/GithubExplorer';
import Home from '@/features/homePage/Home';
import { routePaths } from '@/lib/routes';
import WritingPostPage from '@/writing/[slug]/page';
import WritingPage from '@/writing/page';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routePaths.home} element={<Home />} />
      <Route path={routePaths.githubExplorer} element={<GithubExplorer />} />
      <Route path={routePaths.accessibilityAudit} element={<AdaAudit />} />
      <Route path={routePaths.writing} element={<WritingPage />} />
      <Route path={`${routePaths.writing}/:slug`} element={<WritingPostPage />} />
    </Routes>
  );
}
