 const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-state");

    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }

    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;

    setIsOpen(newState);
    localStorage.setItem("sidebar-state", JSON.stringify(newState));
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen"></div>
  )