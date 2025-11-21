// src/pages/ActivateAccount.js
import React, { useState, useEffect } from 'react';
import { Check, Lock, Phone, AlertCircle,Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ActivateAccount() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [fundingAmount, setFundingAmount] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('nyotaApplication');
    const savedAmount = localStorage.getItem('nyotaFundingAmount');

    if (data && savedAmount) {
      const parsed = JSON.parse(data);
      setApplicationData(parsed);
      setPhone(parsed.phone || '');
      setFundingAmount(parseInt(savedAmount));
    } else {
      navigate('/apply');
    }
  }, [navigate]);

  const formatAmount = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleActivate = () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('nyotaAccountActivated', 'true');
      localStorage.setItem('nyotaActivatedPhone', phone);
    }, 3000);
  };

  if (!applicationData) return null;

  return (
    <>
      <header className="bg-kenya-black text-white py-5 shadow-xl">
        <div className="max-w-2xl mx-auto px-4 flex items-center gap-3">
          <div className="w-10 h-10 kenya-gradient rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black">NYOTA Account Activation</h1>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-t-8 border-kenya-red">

          {!success ? (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-kenya-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-black text-kenya-black mb-3">
                  Final Step: Activate Your Account
                </h2>
                <p className="text-gray-600">
                  Hello <strong>{applicationData.fullName}</strong>,<br />
                  Your application for <strong>KSh {formatAmount(fundingAmount)}</strong> is approved!
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-kenya-black">Activation Fee Required</p>
                    <p className="text-sm text-gray-700">
                      A one-time activation fee of <strong>KSh 250 only</strong> is required to secure and activate your Nyota Youth Fund account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Phone className="inline w-5 h-5 mr-2 text-kenya-green" />
                    M-Pesa Phone Number (Editable)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none transition text-lg text-center font-mono"
                    placeholder="0712345678"
                    maxLength="10"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Your M-Pesa number will receive KSh {formatAmount(fundingAmount)} in 72 hours
                  </p>
                </div>

                <button
                  onClick={handleActivate}
                  disabled={loading || phone.length !== 10}
                  className="w-full bg-kenya-green hover:bg-green-700 text-white font-black text-xl py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>Processing... <div className="animate-spin"><Lock className="w-6 h-6" /></div></>
                  ) : (
                    <>
                      <Lock className="w-7 h-7" />
                      Activate Account
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You will receive an M-Pesa prompt shortly after clicking
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-24 h-24 bg-kenya-green rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Check className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-3xl font-black text-kenya-black mb-4">
                  Account Activated Successfully!
                </h2>
                <p className="text-xl font-bold text-kenya-green mb-6">
                  KSh {formatAmount(fundingAmount)} Coming in 72 Hours!
                </p>
                <p className="text-gray-700 mb-8">
                  Congratulations <strong>{applicationData.fullName}</strong>!<br />
                  Your Nyota Youth Fund account is now fully activated.
                </p>

                <Link to="/">
                  <button className="w-full bg-kenya-red text-white font-bold text-lg py-5 rounded-full shadow-xl hover:scale-105 transition flex items-center justify-center gap-3">
                    Back to Home
                  </button>
                </Link>

                <div className="mt-8 p-5 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Reference ID:</strong> NYOTA{Date.now().toString().slice(-6)}<br />
                    <strong>Activated On:</strong> {new Date().toLocaleString('en-KE')}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}