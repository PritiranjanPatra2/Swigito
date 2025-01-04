import React from 'react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-yellow-500 animate__animated animate__fadeIn animate__delay-1s">
        Privacy Policy <span role="img" aria-label="lock">🔒</span>
      </h1>
      <p className="text-lg max-w-3xl text-center leading-relaxed mb-4 animate__animated animate__fadeIn animate__delay-2s">
        At <span className="font-bold text-yellow-500">Swigito</span>, your privacy is our priority. 
        We collect and use your information only to provide you with the best possible experience. 
        Your data is stored securely, and we never share it with third parties without your consent. <span role="img" aria-label="shield">🛡️</span>
      </p>
      <p className="text-lg max-w-3xl text-center leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
        If you have any questions about how we handle your information, please feel free to reach out to us at <span className="font-bold text-yellow-500">support@swigito.com</span>. <span role="img" aria-label="email">📧</span>
      </p>
      <div className="mt-8">
        <Link to='/contact'><button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
          Contact Us <span role="img" aria-label="support">📞</span>
        </button></Link>
      </div>
    </div>
  );
}

export default Privacy;
