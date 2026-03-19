import AuditForm from '@/components/ada/AuditForm';
import AuditSummary from '@/components/ada/AuditSummary';
import ViolationList from '@/components/ada/ViolationList';
import PageHeader from '@/components/common/PageHeader';

const AdaAudit = () => {
  const handleSubmit = (url: string) => {
    console.log('Audit URL:', url);
  };

  return (
    <div className="section-stack">
      <PageHeader
        title="Accessibility Audit"
        description="Run a page audit and review accessibility issues in a clear, developer-friendly format."
      />

      <AuditForm onSubmit={handleSubmit} />
      <AuditSummary />
      <ViolationList />
    </div>
  );
};

export default AdaAudit;
