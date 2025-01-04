import React from 'react';

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>

        {/* Contact Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Contact Details</h2>
            <p className="text-gray-600">📞 Phone: +91 98612 79032</p>
            <p className="text-gray-600">✉️ Email: patrapritiranjan11@gmail.com</p>
            <p className="text-gray-600">📍 Address: Bhubaneswar, Odisha, India</p>
          </div>

          {/* Extra Details Section */}
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Office Hours</h2>
            <p className="text-gray-600">🕒 Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">🕒 Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">⛔ Sunday: Closed</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h2>
          <div className="overflow-hidden rounded-lg shadow">
            <iframe
              title="Bhubaneswar Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14974.33923618297!2d85.81056522314883!3d20.29605980599495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909a4b3f8d2c1%3A0x4712593e9e89a3f2!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1690972922807!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
