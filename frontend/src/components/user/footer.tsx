import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Centered Mission Statement */}
        <div className="col-span-1 md:col-span-4 flex justify-center mb-4">
          <p className="italic text-2xl md:text-4xl text-center font-serif text-white-400 shadow-lg p-2">
            Join us on our mission to make 50 million people fit!
          </p>
        </div>

        {/* Brand and Contact Info */}
        <div className="col-span-2 flex flex-col pl-10 justify-start">
          <h2 className="text-3xl font-bold mb-4">Mr.Fit</h2>
          <p className="mb-2">mrfit@gmail.com</p>
          <p className="mb-2">080-68060300</p>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-75">
              <img src="/instagram-icon.svg" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:opacity-75">
              <img src="/x-icon.svg" alt="X" className="w-6 h-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-75">
              <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="col-span-2 md:col-span-2 flex justify-end mt-4">
          <div className="flex space-x-20">
            <div>
              <h3 className="font-bold mb-2">Location</h3>
              <ul>
                <li>Coimbatore</li>
                <li>Chennai</li>
                <li>Kerala</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Service</h3>
              <ul>
                <li>Online Service</li>
                <li>Fitness & Nutrition</li>
                <li>Diet Plans</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Legal</h3>
              <ul>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Return & Refund</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
