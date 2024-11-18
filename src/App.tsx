import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Coffee, Clock, Star, CheckCircle, Users, BookOpen, Trophy, Menu, X } from 'lucide-react';
import BookingModal from './components/BookingModal';
import AnimatedSection from './components/AnimatedSection';

function App() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<'group' | 'individual'>('group');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBooking = (type: 'group' | 'individual') => {
    setBookingType(type);
    setShowBookingModal(true);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const stats = [
    { number: "98%", label: "Taux de réussite" },
    { number: "1500+", label: "Élèves formés" },
    { number: "20+", label: "Années d'expérience" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.1
        }}
      />

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Mon Permis Pratique</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => handleBooking('group')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Réserver maintenant
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-2 space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Contact
              </button>
              <button
                onClick={() => handleBooking('group')}
                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50"
              >
                Réserver maintenant
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Réussissez votre</span>
                <span className="block text-blue-600">Permis Pratique</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
                Formation théorique intensive avec un moniteur breveté ayant plus de 20 ans d'expérience.
                Maîtrisez tous les points critiques de l'examen pratique à Mons.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBooking('group')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700"
                >
                  Formation en groupe - 100€
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBooking('individual')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium border-2 border-blue-600 hover:bg-blue-50"
                >
                  Coaching privé - 150€
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedSection>
        <div className="bg-blue-600/90 backdrop-blur-md text-white py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Pourquoi nous choisir ?</h2>
              <p className="mt-4 text-gray-600">Notre expertise fait la différence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  title: "Support pédagogique détaillé",
                  description: "PowerPoints complets et mises en situation réelles"
                },
                {
                  icon: <Trophy className="h-8 w-8" />,
                  title: "Expertise reconnue",
                  description: "Plus de 20 ans d'expérience dans la formation"
                },
                {
                  icon: <Coffee className="h-8 w-8" />,
                  title: "Accueil personnalisé",
                  description: "Petit-déjeuner offert et ambiance conviviale"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="relative z-10 bg-white/80 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">À propos de nous</h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                Notre engagement est de vous offrir une formation de qualité supérieure pour réussir votre permis pratique du premier coup.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Notre Mission</h3>
                  <p className="text-gray-600">
                    Accompagner chaque élève vers la réussite en lui donnant tous les outils nécessaires pour devenir un conducteur confiant et responsable.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Notre Méthode</h3>
                  <p className="text-gray-600">
                    Formation intensive de 4 heures avec focus sur les points critiques de l'examen à Mons, enrichie par des supports pédagogiques détaillés.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Nos Points Forts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                    <span className="text-gray-600">Formation intensive de 4 heures ciblée</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                    <span className="text-gray-600">Petit-déjeuner offert pour un accueil chaleureux</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                    <span className="text-gray-600">Moniteur expert avec plus de 20 ans d'expérience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                    <span className="text-gray-600">Support pédagogique complet et détaillé</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="relative z-10 bg-white/80 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Contactez-nous</h2>
              <p className="mt-4 text-gray-600">
                Une question ? N'hésitez pas à nous contacter !
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Informations de contact</h3>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Adresse:</span>
                    Centre-ville de Mons, Belgique
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Email:</span>
                    contact@monpermispratique.be
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Téléphone:</span>
                    +32 XX XXX XX XX
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Horaires:</span>
                    Lun-Ven: 8h-18h
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Envoyez-nous un message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        formType={bookingType}
      />
    </div>
  );
}

export default App;