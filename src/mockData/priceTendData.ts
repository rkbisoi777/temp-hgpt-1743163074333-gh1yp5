interface PriceData {
    monthYear: string;
    propertyPrice: number;
    localityAvgPrice: number;
    cityAvgPrice: number;
  }
  
  const mockPriceTendData: PriceData[] = [
    { monthYear: 'Jan 2024', propertyPrice: 8050000, localityAvgPrice: 7820000, cityAvgPrice: 7500000 },
    { monthYear: 'Feb 2024', propertyPrice: 8270000, localityAvgPrice: 7940000, cityAvgPrice: 7620000 },
    { monthYear: 'Mar 2024', propertyPrice: 8500000, localityAvgPrice: 8100000, cityAvgPrice: 7750000 },
    { monthYear: 'Apr 2024', propertyPrice: 8850000, localityAvgPrice: 8320000, cityAvgPrice: 7900000 },
    { monthYear: 'May 2024', propertyPrice: 9100000, localityAvgPrice: 8500000, cityAvgPrice: 8050000 },
    { monthYear: 'Jun 2024', propertyPrice: 9420000, localityAvgPrice: 8650000, cityAvgPrice: 8200000 },
    { monthYear: 'Jul 2024', propertyPrice: 9750000, localityAvgPrice: 8800000, cityAvgPrice: 8350000 },
    { monthYear: 'Aug 2024', propertyPrice: 10100000, localityAvgPrice: 9000000, cityAvgPrice: 8500000 },
    { monthYear: 'Sep 2024', propertyPrice: 10400000, localityAvgPrice: 9150000, cityAvgPrice: 8650000 },
    { monthYear: 'Oct 2024', propertyPrice: 10700000, localityAvgPrice: 9300000, cityAvgPrice: 8800000 },
    { monthYear: 'Nov 2024', propertyPrice: 11000000, localityAvgPrice: 9500000, cityAvgPrice: 8950000 },
    { monthYear: 'Dec 2024', propertyPrice: 11400000, localityAvgPrice: 9700000, cityAvgPrice: 9100000 },
  ];
  
  export default mockPriceTendData;
  