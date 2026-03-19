import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StrengthCardProps = {
  title: string;
  description: string;
};

const StrengthCard = ({ title, description }: StrengthCardProps) => {
  return (
    <Card className="h-full border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-tight">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StrengthCard;
