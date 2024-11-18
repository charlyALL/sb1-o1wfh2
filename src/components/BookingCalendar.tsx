import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, User, Users } from 'lucide-react';

interface BookingCalendarProps {
  formType: 'group' | 'individual';
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ formType }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'form'>('date');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const groupTimeSlots = ['09:00', '14:00'];
  const individualTimeSlots = ['10:00', '11:00', '13:00', '15:00', '16:00'];
  const timeSlots = formType === 'group' ? groupTimeSlots : individualTimeSlots;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Réservation confirmée ! Vous recevrez un email de confirmation.');
  };

  const renderBookingForm = () => (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
        <input
          type="tel"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="pt-4">
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setBookingStep('time')}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirmer la réservation
          </button>
        </div>
      </div>
    </motion.form>
  );

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Adjust for Monday as first day of week
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isPast = date < today;
      const isAvailable = !isPast && (date.getDay() !== 0); // Not available on Sundays
      
      days.push(
        <button
          key={day}
          onClick={() => isAvailable && setSelectedDate(date)}
          disabled={!isAvailable}
          className={`
            relative w-full h-12 flex items-center justify-center rounded-lg text-sm
            transition-colors duration-200 ease-in-out
            ${isSelected 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : isAvailable
                ? 'hover:bg-blue-50 text-gray-900'
                : 'text-gray-300 cursor-not-allowed bg-gray-50'
            }
            ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}
          `}
        >
          <span className={isSelected ? 'font-semibold' : ''}>{day}</span>
          {isAvailable && !isSelected && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 rounded-full bg-blue-600"></div>
            </div>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="space-y-6">
      {bookingStep === 'date' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(currentMonth.getMonth() - 1);
                setCurrentMonth(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold">
              {currentMonth.toLocaleDateString('fr-BE', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(currentMonth.getMonth() + 1);
                setCurrentMonth(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="h-8 flex items-center justify-center">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>

          {selectedDate && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setBookingStep('time')}
            >
              Continuer
            </motion.button>
          )}
        </div>
      )}

      {bookingStep === 'time' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            {formType === 'group' ? (
              <Users className="h-5 w-5" />
            ) : (
              <User className="h-5 w-5" />
            )}
            <span>
              {formType === 'group' ? 'Formation en groupe' : 'Coaching personnalisé'} -
              {selectedDate?.toLocaleDateString('fr-BE')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`
                  flex items-center justify-center space-x-2 py-3 rounded-md
                  transition-colors duration-200 ease-in-out
                  ${selectedTime === time
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
              >
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </button>
            ))}
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setBookingStep('date')}
            >
              Retour
            </button>
            {selectedTime && (
              <button
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setBookingStep('form')}
              >
                Continuer
              </button>
            )}
          </div>
        </motion.div>
      )}

      {bookingStep === 'form' && renderBookingForm()}
    </div>
  );
};

export default BookingCalendar;