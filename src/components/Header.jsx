function Header() {
    return (
      <header className="w-full flex justify-between items-center py-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-indigo-400">PersonaClone AI</h2>
        <nav className="flex gap-6 text-gray-400 text-sm">
          <a href="#">About</a>
          <a href="#">Profiles</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    );
  }
  
  export default Header;
  