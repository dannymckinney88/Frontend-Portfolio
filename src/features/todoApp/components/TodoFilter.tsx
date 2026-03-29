import { Button } from '@/components/ui/button';
import type { TodoFilterProps } from '@/features/todoApp/types';

import { ButtonGroup } from '../../../components/ui/button-group';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
] as const;

const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
  return (
    <ButtonGroup aria-label="Filter todos">
      {filters.map((item) => {
        const isActive = filter === item.value;

        return (
          <Button
            key={item.value}
            type="button"
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            aria-pressed={isActive}
            onClick={() => setFilter(item.value)}
            className="shadow-none focus-visible:z-10"
          >
            {item.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default TodoFilter;
