import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routePaths } from '@/lib/routes';

const Home = lazy(() => import('@/features/homePage/Home'));
const GithubExplorer = lazy(() => import('@/features/githubExplorer/GithubExplorer'));
const AdaAudit = lazy(() => import('@/features/adaScanner/AdaAudit'));
const WritingPage = lazy(() => import('@/writing/page'));
const WritingPostPage = lazy(() => import('@/writing/[slug]/page'));

const RouteFallback = () => {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6" role="status">
      <p className="text-sm text-muted-foreground">Loading page…</p>
    </main>
  );
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.githubExplorer} element={<GithubExplorer />} />
        <Route path={routePaths.accessibilityAudit} element={<AdaAudit />} />
        <Route path={routePaths.writing} element={<WritingPage />} />
        <Route path={`${routePaths.writing}/:slug`} element={<WritingPostPage />} />
      </Routes>
    </Suspense>
  );
}
