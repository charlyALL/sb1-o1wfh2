import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular: boolean;
  onBook: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, isPopular, onBook }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-xl shadow-lg overflow-hidden ${
        isPopular ? 'border-2 border-blue-500' : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
          Recommandé
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}€</span>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onBook}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isPopular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Réserver maintenant
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;