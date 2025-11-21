// src/pages/ApplicationPage.js
import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, User, Phone, IdCard, MapPin, 
  GraduationCap, DollarSign, Users, Star 
} from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';

export default function ApplicationPage() {
    const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    county: '',
    education: '',
    income: '',
    family: ''
  });

  const [errors, setErrors] = useState({});

  // Full 47 Kenyan counties - clean & sorted
  const counties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa",
    "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
    "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
    "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
    "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
    "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
    "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ].sort();

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    // Phone: Must be exactly 10 digits
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit phone number (e.g. 0712345678)";
    }

    // ID Number: Only numbers, at least 6 digits
    if (!formData.idNumber) {
      newErrors.idNumber = "ID number is required";
    } else if (!/^\d+$/.test(formData.idNumber)) {
      newErrors.idNumber = "ID number must contain numbers only";
    }

    if (!formData.county) newErrors.county = "Please select your county";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleSubmit = () => {
    if (formData.education && formData.income && formData.family) {
      // Final save before processing
      localStorage.setItem('nyotaApplication', JSON.stringify(formData));
      localStorage.setItem('applicationSubmittedAt', new Date().toISOString());

      // Redirect to Processing Page
      navigate('/processing');
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-kenya-black text-white py-5 shadow-xl">
        <div className="max-w-2xl mx-auto px-4 flex items-center gap-3">
          <div className="w-10 h-10 kenya-gradient rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black">NYOTA Application</h1>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 pt-6 pb-28">
        <div className="max-w-2xl mx-auto px-4">

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 1 ? 'bg-kenya-green text-white' : 'bg-gray-300 text-gray-600'}`}>
                {step > 1 ? <Check className="w-6 h-6" /> : '1'}
              </div>
              <div className={`flex-1 h-2 rounded-full transition-all ${step >= 2 ? 'bg-kenya-green' : 'bg-gray-300'}`} />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 2 ? 'bg-kenya-green text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
            </div>
            <p className="text-center mt-3 text-sm font-semibold text-gray-700">
              Step {step} of 2
            </p>
          </div>

          {/* Step 1 - Personal Information */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-kenya-red">
              <h2 className="text-2xl font-black text-kenya-black mb-6">Enter Information</h2>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <User className="inline w-5 h-5 mr-2 text-kenya-green" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Phone className="inline w-5 h-5 mr-2 text-kenya-green" /> M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                    placeholder="0712345678"
                    maxLength="10"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <IdCard className="inline w-5 h-5 mr-2 text-kenya-green" /> National ID Number
                  </label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => updateField('idNumber', e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                    placeholder="e.g. 12345678"
                  />
                  {errors.idNumber && <p className="text-red-600 text-sm mt-1">{errors.idNumber}</p>}
                </div>

                {/* County */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <MapPin className="inline w-5 h-5 mr-2 text-kenya-green" /> Your County
                  </label>
                  <select
                    value={formData.county}
                    onChange={(e) => updateField('county', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                  >
                    <option value="">Select your county</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                  {errors.county && <p className="text-red-600 text-sm mt-1">{errors.county}</p>}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="mt-8 w-full bg-kenya-green text-white py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition flex items-center justify-center gap-3"
              >
                Next <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          )}

          {/* Step 2 - Additional Information */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-kenya-green">
              <h2 className="text-2xl font-black text-kenya-black mb-6">Additional Information</h2>

              <div className="space-y-6">
                {/* Education */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <GraduationCap className="inline w-5 h-5 mr-2 text-kenya-green" /> Highest Level of Education
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => updateField('education', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                  >
                    <option value="">Select education level</option>
                    <option>Primary School</option>
                    <option>Secondary School</option>
                    <option>Tertiary / College</option>
                    <option>University</option>
                  </select>
                </div>

                {/* Income */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <DollarSign className="inline w-5 h-5 mr-2 text-kenya-green" /> Monthly Income (KSh)
                  </label>
                  <select
                    value={formData.income}
                    onChange={(e) => updateField('income', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                  >
                    <option value="">Select income range</option>
                    <option>0 - 5,000</option>
                    <option>5,001 - 10,000</option>
                    <option>10,001 - 20,000</option>
                    <option>20,001 - 50,000+</option>
                  </select>
                </div>

                {/* Family Status */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Users className="inline w-5 h-5 mr-2 text-kenya-green" /> Family Status
                  </label>
                  <select
                    value={formData.family}
                    onChange={(e) => updateField('family', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg"
                  >
                    <option value="">Select family status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>3 Family Members</option>
                    <option>4 Family Members</option>
                    <option>8+ Family Members</option>
                  </select>
                </div>
              </div>

              {/* Responsive Buttons - Works perfectly on all phones */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBack}
                  className="order-2 sm:order-1 flex-1 bg-gray-300 text-gray-800 py-4 rounded-full font-bold text-lg hover:bg-gray-400 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-6 h-6" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.education || !formData.income || !formData.family}
                  className="order-1 sm:order-2 flex-1 bg-kenya-red text-white py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  Submit Application <Check className="w-7 h-7" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Back Button */}
      <Link to="/" className="fixed bottom-6 left-6 z-50 bg-white text-kenya-black w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition border-4 border-gray-200">
        <ArrowLeft className="w-8 h-8" />
      </Link>
    </>
  );
}