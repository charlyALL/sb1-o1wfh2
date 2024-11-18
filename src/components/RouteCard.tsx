import React from 'react';
import { Clock, MapPin } from 'lucide-react';

interface RouteProps {
  route: {
    name: string;
    duration: string;
    points: string[];
    image: string;
  };
}

const RouteCard: React.FC<RouteProps> = ({ route }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={route.image}
          alt={route.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
          150€
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{route.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="h-5 w-5 mr-2" />
          <span>{route.duration}</span>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Points techniques :</h4>
          <ul className="space-y-2">
            {route.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;