const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Adi Juliyanto Afrizal – MERN
        </p>

        <p className="text-sm text-gray-400">Built with 💻 Afrizal</p>
      </div>
    </footer>
  );
};

export default Footer;
