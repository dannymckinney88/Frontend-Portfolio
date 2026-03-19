import AuditForm from '@/components/ada/AuditForm';
import AuditSummary from '@/components/ada/AuditSummary';
import ViolationList from '@/components/ada/ViolationList';

/**
 * ADA Audit Page
 */
const AdaAudit = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Accessibility Audit</h1>

      <AuditForm />
      <AuditSummary />
      <ViolationList />
    </div>
  );
};

export default AdaAudit;
