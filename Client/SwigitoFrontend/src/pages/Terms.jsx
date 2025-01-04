import React from 'react';

function Terms() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-yellow-500 animate__animated animate__fadeIn animate__delay-1s">
        Terms of Service <span role="img" aria-label="agreement">📜</span>
      </h1>
      <p className="text-lg max-w-3xl text-center leading-relaxed mb-4 animate__animated animate__fadeIn animate__delay-2s">
        By using <span className="font-bold text-yellow-500">Swigito</span>, you agree to our terms and conditions. 
        We are committed to providing the best possible service and reserve the right to update these terms as necessary. <span role="img" aria-label="thumbs-up">👍</span>
      </p>
      <p className="text-lg max-w-3xl text-center leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
        Any misuse of our platform, including fraudulent activities or violating our policies, may result in account suspension. 
        For a detailed explanation of our policies, please contact our support team. <span role="img" aria-label="support">🛠️</span>
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
          Contact Support <span role="img" aria-label="contact">📞</span>
        </button>
      </div>
    </div>
  );
}

export default Terms;
