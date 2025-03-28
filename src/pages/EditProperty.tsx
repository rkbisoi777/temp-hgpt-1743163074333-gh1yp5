import { useParams } from 'react-router-dom';
import { PropertyForm } from '../components/property/PropertyForm';

export function EditProperty() {

    const { propertyId } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PropertyForm propertyId={propertyId} />
    </div>
  );
}