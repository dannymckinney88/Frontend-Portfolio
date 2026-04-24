import { projectData } from '@/features/homePage/Components/projects/projectData';

import { AboutSection } from './Components/about/AboutSection';
import { ContactSection } from './Components/contact/ContactSection';
import { HomeHero } from './Components/hero/HomeHero';
import { FeaturedProjectSection } from './Components/projects/FeaturedProjectSection';
import { FlagshipProjectSection } from './Components/projects/FlagshipProjectSection';
import { SupportingProjectsSection } from './Components/projects/SupportingProjectsSections';

function Home() {
  const accessOpsProject = projectData.find((p) => p.title === 'AccessOps');
  const heelFlowProject = projectData.find((p) => p.title === 'HeelFlow');

  const supportingProjects = projectData.filter(
    (p) => p.title !== 'AccessOps' && p.title !== 'HeelFlow',
  );

  if (!accessOpsProject || !heelFlowProject) {
    return null;
  }

  return (
    <div className="flex flex-col min-w-0">
      <HomeHero />

      <FlagshipProjectSection accessOpsProject={accessOpsProject} />

      <FeaturedProjectSection heelFlowProject={heelFlowProject} />

      <SupportingProjectsSection supportingProjects={supportingProjects} />

      <AboutSection />

      <ContactSection />
    </div>
  );
}

export default Home;
