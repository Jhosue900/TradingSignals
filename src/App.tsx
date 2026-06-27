import { useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Reports from './components/Reports';
import HowItWorks from './components/HowItWorks';
import RegistrationForm from './components/RegistrationForm';
import ContactBar from './components/ContactBar';
import Footer from './components/Footer';

function App() {
  const [selectedPlan, setSelectedPlan] = useState<'Básico' | 'Premium'>('Premium');

  return (
    <div className="max-w-1100 mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <Ticker />
      <Hero />
      <Pricing onSelectPlan={setSelectedPlan} />
      <Reports />
      <HowItWorks />
      <RegistrationForm selectedPlan={selectedPlan} />
      <ContactBar />
      <Footer />
    </div>
  );
}

export default App;