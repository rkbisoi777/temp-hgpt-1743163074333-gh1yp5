import { useEffect, useState } from 'react';

// Define the structure for locality stats
interface LocalityStatsData {
  crimeRate: string;
  demographics: string;
  transportAvailability: string;
  crimeRateStatus: 'good' | 'bad';
  demographicsStatus: 'good' | 'bad';
  transportStatus: 'good' | 'bad';
}

// Define the props type
interface LocalityStatsProps {
  propertyId: string;
}

export function LocalityStats({ propertyId }: LocalityStatsProps) {
  const [stats, setStats] = useState<LocalityStatsData | null>(null);

  useEffect(() => {
    // Mock API call (replace with an actual API integration later)
    setStats({
      crimeRate: 'Low',
      demographics: 'Diverse',
      transportAvailability: 'Limited',
      crimeRateStatus: 'good',
      demographicsStatus: 'good',
      transportStatus: 'bad',
    });
  }, [propertyId]);

  if (!stats) {
    return <p>Loading Locality Stats...</p>;
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4">
      <h2 className="text-lg font-semibold mb-1">Locality</h2>
      <div className="text-sm">
      
      <p className={stats.crimeRateStatus === 'good' ? 'text-green-500' : 'text-red-500'}>
        Crime Rate: {stats.crimeRate} ({stats.crimeRateStatus === 'good' ? 'Good' : 'Bad'})
      </p>
      <p className={stats.demographicsStatus === 'good' ? 'text-green-500' : 'text-red-500'}>
        Demographics: {stats.demographics} ({stats.demographicsStatus === 'good' ? 'Good' : 'Bad'})
      </p>
      <p className={stats.transportStatus === 'good' ? 'text-green-500' : 'text-red-500'}>
        Public Transport Availability: {stats.transportAvailability} ({stats.transportStatus === 'good' ? 'Good' : 'Bad'})
      </p>
        </div>
    </div>
  );
}
