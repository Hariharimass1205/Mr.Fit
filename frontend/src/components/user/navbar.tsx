import Link from 'next/link'; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
    </nav>
  );
};

export default Navbar;
