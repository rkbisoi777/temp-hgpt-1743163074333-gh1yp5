import { CompareTableHeader } from './CompareTableHeader';
import { CompareTableBody } from './CompareTableBody';

interface CompareTableProps {
  propertyIds: string[];
  onRemove: (id: string) => void;
}

export function CompareTable({ propertyIds, onRemove }: CompareTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full">
        <CompareTableHeader propertyIds={propertyIds} onRemove={onRemove} />
        <CompareTableBody propertyIds={propertyIds} />
      </table>
    </div>
  );
}