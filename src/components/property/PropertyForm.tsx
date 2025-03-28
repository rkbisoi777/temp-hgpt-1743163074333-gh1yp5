import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import SupabaseImageUploader from './SupabaseImageUploader';


interface PropertyFormProps {
  propertyId?: string;
}

interface ImageData {
  hall?: string;
  kitchen?: string;
  bedroom1?: string;
  bedroom2?: string;
  bedroom3?: string;
  bedroom4?: string;
  bathroom1?: string;
  others?: string[]; 
}


export function PropertyForm({ propertyId = '' }: PropertyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore(); // Get the current user from auth store
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price_min: '',
    price_max: '',
    area: '',
    bedrooms_min: '',
    bedrooms_max: '',
    property_type: '',
    status: '',
    amenities: [] as string[],
    possession_date: '',
    furnishing_status: '',
    latitude: '',
    longitude: '',
    images: [] as ImageData,
    description: '',
    contact_details: {
      name: '',
      phone: '',
      email: ''
    },
    availability: '',
    sqft_min: '',
    sqft_max: '',
  });

  const propertyTypes = [
    'Apartment',
    'Villa',
    'Independent House',
    'Plot',
    'Penthouse',
    'Studio'
  ];

  const statusOptions = [
    'Under Construction',
    'Ready to Move',
    'Resale',
    'New Launch'
  ];

  const furnishingOptions = [
    'Unfurnished',
    'Semi-Furnished',
    'Fully Furnished'
  ];

  const amenityOptions = [
    'Swimming Pool',
    'Gym',
    'Club House',
    'Park',
    'Security',
    'Power Backup',
    'Parking',
    'Garden'
  ];

  useEffect(() => {
    if (propertyId) {
      const fetchProperty = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .single();

        if (error) {
          toast.error('Failed to fetch property details');
        } else {
          setFormData({
            ...data,
            amenities: JSON.parse(data.amenities || '[]'),
            contact_details: JSON.parse(data.contact_details || '{}'),
          });
        }
        setIsLoading(false);
      };

      fetchProperty();
    }
  }, [propertyId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenitiesChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('You must be logged in to proceed');
      return;
    }

    setIsLoading(true);

    try {
      let response;
      if (propertyId) {
        // Update existing property
        response = await supabase
          .from('properties')
          .update({
            ...formData,
            price_min: parseFloat(formData.price_min),
            price_max: parseFloat(formData.price_max),
            area: parseFloat(formData.area),
            bedrooms_min: parseInt(formData.bedrooms_min),
            bedrooms_max: parseInt(formData.bedrooms_max),
            sqft_min: parseInt(formData.sqft_min),
            sqft_max: parseInt(formData.sqft_max),
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            availability: parseInt(formData.availability),
            amenities: JSON.stringify(formData.amenities),
            contact_details: JSON.stringify(formData.contact_details),
          })
          .eq('id', propertyId);
      } else {
        // Insert new property
        response = await supabase
          .from('properties')
          .insert([{
            ...formData,
            developer_name: user.id,
            price_min: parseFloat(formData.price_min),
            price_max: parseFloat(formData.price_max),
            area: parseFloat(formData.area),
            bedrooms_min: parseInt(formData.bedrooms_min),
            bedrooms_max: parseInt(formData.bedrooms_max),
            sqft_min: parseInt(formData.sqft_min),
            sqft_max: parseInt(formData.sqft_max),
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            availability: parseInt(formData.availability),
            amenities: JSON.stringify(formData.amenities),
            contact_details: JSON.stringify(formData.contact_details)
          }]);
      }

      if (response.error) throw response.error;
      toast.success(propertyId !== '' ? 'Property updated successfully!' : 'Property added successfully!');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
  
      <div className="flex flex-row justify-between">
      <h2 className="text-2xl font-bold mb-6">{`${propertyId === '' ? 'Add' : 'Edit'} New Property`}</h2>
        {propertyId !== '' && <SupabaseImageUploader propertyId={propertyId} />}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title/Name *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Property Type *</label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>


          </div>
        </div>



        {/* Location Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                step="any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                step="any"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price Min (₹) *</label>
              <input
                type="number"
                name="price_min"
                value={formData.price_min}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price Max (₹) *</label>
              <input
                type="number"
                name="price_max"
                value={formData.price_max}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Area Min (sq.ft) *</label>
              <input
                type="number"
                name="sqft_min"
                value={formData.sqft_min}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Area Max (sq.ft) *</label>
              <input
                type="number"
                name="sqft_max"
                value={formData.sqft_max}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bedrooms Min *</label>
              <input
                type="number"
                name="bedrooms_min"
                value={formData.bedrooms_min}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bedrooms Max*</label>
              <input
                type="number"
                name="bedrooms_max"
                value={formData.bedrooms_max}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Possession Date</label>
              <input
                type="date"
                name="possession_date"
                value={formData.possession_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Furnishing Status</label>
              <select
                name="furnishing_status"
                value={formData.furnishing_status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Status</option>
                {furnishingOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenityOptions.map(amenity => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenitiesChange(amenity)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_details.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact_details: { ...prev.contact_details, name: e.target.value }
                }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact Phone</label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_details.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact_details: { ...prev.contact_details, phone: e.target.value }
                }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_details.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact_details: { ...prev.contact_details, email: e.target.value }
                }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter property description..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          {propertyId === '' ? (<button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Adding Property...' : 'Add Property'}
          </button>) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Updating Property...' : 'Update Property'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}