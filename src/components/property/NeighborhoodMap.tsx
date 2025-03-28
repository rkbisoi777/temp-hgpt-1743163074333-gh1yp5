import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { School, Building2, Train, ShoppingBag, Utensils, ChevronDown, ChevronUp } from 'lucide-react';

// Add Google Maps type declarations
declare global {
    interface Window {
        google: typeof google;
    }
}

interface NeighborhoodMapProps {
    latitude: number;
    longitude: number;
    propertyTitle: string;
}

type PlaceType = 'school' | 'hospital' | 'transit_station' | 'restaurant' | 'shopping_mall';
type PlaceCategory = 'Education' | 'Healthcare' | 'Commute' | 'Food' | 'Shopping';

interface Place {
    name: string;
    rating?: number;
    distance: string;
    address: string;
    category: PlaceCategory;
}

const categoryConfig = {
    Education: {
        type: 'school' as PlaceType,
        icon: <School className="w-4 h-4" />,
        color: '#4CAF50'
    },
    Healthcare: {
        type: 'hospital' as PlaceType,
        icon: <Building2 className="w-4 h-4" />,
        color: '#F44336'
    },
    Commute: {
        type: 'transit_station' as PlaceType,
        icon: <Train className="w-4 h-4" />,
        color: '#2196F3'
    },
    Food: {
        type: 'restaurant' as PlaceType,
        icon: <Utensils className="w-4 h-4" />,
        color: '#FF9800'
    },
    Shopping: {
        type: 'shopping_mall' as PlaceType,
        icon: <ShoppingBag className="w-4 h-4" />,
        color: '#9C27B0'
    }
};

export function NeighborhoodMap({ latitude, longitude, propertyTitle }: NeighborhoodMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(null);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [expandedPlaces, setExpandedPlaces] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // Load Google Maps Types
        const loader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            version: 'weekly',
            libraries: ['places', 'geometry', 'marker']
        });

        loader.load().then((google) => {
            if (mapRef.current) {
                const propertyLocation = { lat: latitude, lng: longitude };
                const mapInstance = new google.maps.Map(mapRef.current, {
                    center: propertyLocation,
                    zoom: 15,
                    styles: [
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                });

                // Add property marker using standard marker with a simple icon
                const propertyMarker = new google.maps.Marker({
                    position: propertyLocation,
                    map: mapInstance,
                    icon: {
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    },
                    title: propertyTitle
                });

                const infoWindowInstance = new google.maps.InfoWindow();
                setInfoWindow(infoWindowInstance);
                setMap(mapInstance);

                // Add click listener to property marker
                propertyMarker.addListener('click', () => {
                    infoWindowInstance.setContent(`<div style="font-weight: 600;">${propertyTitle}</div>`);
                    infoWindowInstance.open(mapInstance, propertyMarker);
                });

                // Load all categories when component mounts
                searchAllCategories(mapInstance, propertyLocation, infoWindowInstance);
            }
        });

        // Clean up function
        return () => {
            // Clear markers when component unmounts
            markers.forEach(marker => marker.setMap(null));
        };
    }, [latitude, longitude, propertyTitle]);

    const searchAllCategories = async (
        mapInstance: google.maps.Map,
        propertyLocation: google.maps.LatLng | { lat: number; lng: number },
        infoWindowInstance: google.maps.InfoWindow
    ) => {
        if (!window.google) return;

        setIsLoading(true);
        const allPlaces: Place[] = [];
        const allMarkers: google.maps.Marker[] = [];
        const propertyLatLng = propertyLocation instanceof google.maps.LatLng
            ? propertyLocation
            : new google.maps.LatLng(propertyLocation.lat, propertyLocation.lng);

        const service = new window.google.maps.places.PlacesService(mapInstance);

        // Search for each category
        for (const [category, config] of Object.entries(categoryConfig)) {
            const request = {
                location: propertyLatLng,
                radius: 2000, // 2km radius
                type: config.type
            };

            try {
                const results = await new Promise<google.maps.places.PlaceResult[]>((resolve) => {
                    service.nearbySearch(request, (results, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                            resolve(results);
                        } else {
                            resolve([]);
                        }
                    });
                });

                results.slice(0, 5).forEach(place => {
                    if (place.geometry?.location) {
                        const iconUrl = getCategoryIconUrl(category as PlaceCategory);

                        const marker = new window.google.maps.Marker({
                            position: place.geometry.location,
                            map: null, // Don't show on map initially
                            icon: iconUrl,
                            title: place.name
                        });

                        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                            propertyLatLng,
                            place.geometry.location
                        );

                        allPlaces.push({
                            name: place.name || 'Unnamed Place',
                            rating: place.rating,
                            distance: `${(distance / 1000).toFixed(1)} km`,
                            address: place.vicinity || '',
                            category: category as PlaceCategory
                        });

                        marker.addListener('click', () => {
                            infoWindowInstance.setContent(`
                <div>
                  <div style="font-weight: 600;">${place.name}</div>
                  <div style="font-size: 0.875rem;">${place.vicinity || ''}</div>
                  ${place.rating ? `<div style="font-size: 0.875rem;">Rating: ${place.rating} ⭐</div>` : ''}
                  <div style="font-size: 0.875rem;">Category: ${category}</div>
                </div>
              `);
                            infoWindowInstance.open(mapInstance, marker);
                        });

                        allMarkers.push(marker);
                    }
                });
            } catch (error) {
                console.error(`Error fetching ${category} places:`, error);
            }
        }

        // Sort places by distance
        allPlaces.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        // Take top 5 overall
        const topPlaces = allPlaces.slice(0, 5);

        // Only show markers for top 5 places
        const topMarkers = allMarkers.filter(marker =>
            topPlaces.some(place => marker.getTitle() === place.name)
        );

        topMarkers.forEach(marker => marker.setMap(mapInstance));

        setMarkers(topMarkers);
        setPlaces(topPlaces);
        setIsLoading(false);
    };

    const searchNearbyPlaces = (category: PlaceCategory) => {
        if (!map || !window.google) return;

        setIsLoading(true);

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
        setPlaces([]);

        // If clicking on already selected category, deselect it and show all categories
        if (selectedCategory === category) {
            setSelectedCategory(null);
            const propertyLocation = new window.google.maps.LatLng(latitude, longitude);
            searchAllCategories(map, propertyLocation, infoWindow!);
            return;
        }

        setSelectedCategory(category);

        const service = new window.google.maps.places.PlacesService(map);
        const propertyLocation = new window.google.maps.LatLng(latitude, longitude);

        const request = {
            location: propertyLocation,
            radius: 2000, // 2km radius
            type: categoryConfig[category].type
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                const newMarkers: google.maps.Marker[] = [];
                const newPlaces: Place[] = [];

                results.slice(0, 5).forEach(place => {
                    if (place.geometry?.location) {
                        const iconUrl = getCategoryIconUrl(category);

                        const marker = new window.google.maps.Marker({
                            position: place.geometry.location,
                            map,
                            icon: iconUrl,
                            title: place.name
                        });

                        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                            propertyLocation,
                            place.geometry.location
                        );

                        newPlaces.push({
                            name: place.name || 'Unnamed Place',
                            rating: place.rating,
                            distance: `${(distance / 1000).toFixed(1)} km`,
                            address: place.vicinity || '',
                            category: category
                        });

                        marker.addListener('click', () => {
                            if (infoWindow) {
                                infoWindow.setContent(`
                  <div>
                    <div style="font-weight: 600;">${place.name}</div>
                    <div style="font-size: 0.875rem;">${place.vicinity || ''}</div>
                    ${place.rating ? `<div style="font-size: 0.875rem;">Rating: ${place.rating} ⭐</div>` : ''}
                  </div>
                `);
                                infoWindow.open(map, marker);
                            }
                        });

                        newMarkers.push(marker);
                    }
                });

                setMarkers(newMarkers);
                setPlaces(newPlaces);
                setIsLoading(false);
            }
        });
    };

    // Helper function to get icon URL based on category
    const getCategoryIconUrl = (category: PlaceCategory): string => {
        switch (category) {
            case 'Education':
                return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            case 'Healthcare':
                return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
            case 'Commute':
                return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            case 'Food':
                return 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png';
            case 'Shopping':
                return 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';
            default:
                return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        }
    };

    const togglePlaceExpansion = (placeName: string) => {
        setExpandedPlaces(prev => {
            const newSet = new Set(prev);
            if (newSet.has(placeName)) {
                newSet.delete(placeName);
            } else {
                newSet.add(placeName);
            }
            return newSet;
        });
    };

    // Get category icon component by category name
    const getCategoryIcon = (category: PlaceCategory) => {
        return categoryConfig[category].icon;
    };

    return (
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4">
            <h2 className="text-lg font-semibold mb-4">Neighbourhood - Map View</h2>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {Object.entries(categoryConfig).map(([category, config]) => (
                    <button
                        key={category}
                        onClick={() => searchNearbyPlaces(category as PlaceCategory)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-full transition-colors ${selectedCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {config.icon}
                        <span>{category}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div ref={mapRef} className="w-full h-96 rounded-lg overflow-hidden" />
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">
                        {selectedCategory
                            ? `Nearby ${selectedCategory}`
                            : 'Top Nearby Places'}
                    </h3>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {places.map((place, index) => (
                                <div
                                    key={index}
                                    className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <button
                                        onClick={() => togglePlaceExpansion(place.name)}
                                        className="w-full"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="mr-2 text-gray-600">
                                                    {getCategoryIcon(place.category)}
                                                </div>
                                                <div className="max-w-60 sm:max-w-60 overflow-hidden text-ellipsis whitespace-nowrap font-medium flex justify-start">
                                                    {place.name}
                                                </div>
                                            </div>
                                            <div>
                                                {expandedPlaces.has(place.name) ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </div>
                                        </div>
                                    </button>

                                    <div className="flex justify-between items-center mt-0.5 text-sm">
                                        <span>{place.distance}</span>
                                        {place.rating && (
                                            <span className="flex items-center">
                                                {place.rating} ⭐
                                            </span>
                                        )}
                                    </div>

                                    {expandedPlaces.has(place.name) && (
                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Address:</span> {place.address}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}