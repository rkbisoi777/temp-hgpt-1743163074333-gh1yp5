export function convertToCroreAndLakh(amount: number) {
    if (amount >= 10000000) {
      // Convert to crores
      return "₹" + (amount / 10000000).toFixed(2) + " Cr";
    } else if (amount >= 100000) {
      // Convert to lakhs
      return "₹" + (amount / 100000).toFixed(2) + " L";
    }else if (amount >= 1000) {
      // Convert to lakhs
      return "₹" + (amount / 1000).toFixed(2) + " K";
    }else {
      // Return as is if less than 1 lakh
      return "₹" + amount.toString();
    }
  }


export function extractIndianCity(address: string | string[]) {
    const indianCities = [
      'Mumbai', 'Thane', 'Navi Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Patna', 'Meerut', 'Rajkot', 'Vijayawada', 'Goa', 'Bhopal', 'Madurai', 'Coimbatore', 'Chandigarh', 'Visakhapatnam'
    ];
  
    for (let i = 0; i < indianCities.length; i++) {
      if (address.includes(indianCities[i])) {
        return indianCities[i];
      }
    }
  
    return null; 
  }