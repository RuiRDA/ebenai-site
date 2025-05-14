const Button = ({ className, href, onClick, children, white }) => {
  // Changed the gradient from purple/pink to a blue spectrum
  const classes = `button text-center relative inline-flex items-center justify-center py-0.5 overflow-hidden rounded-lg group transition-colors px-0.5 ${
    white
      ? "text-n-8 bg-white"
      : "text-white bg-gradient-to-br from-sky-500 to-indigo-600"
  } hover:text-[#437dfc] ${className || ""}`; // Updated hover text color to #437dfc

  const renderedButton = (
    <button className={classes} onClick={onClick}>
      <span
        className={`relative z-10 px-5 py-2.5 ${
          white ? "" : "bg-gray-900"
        } rounded-md`}
      >
        {children}
      </span>
    </button>
  );

  const renderedLink = (
    <a href={href} className={classes}>
      <span
        className={`relative w-full px-5 py-2.5 ${
          white ? "" : "bg-gray-900"
        } rounded-md`}
      >
        {children}
      </span>
    </a>
  );

  return href ? renderedLink : renderedButton;
};

export default Button;
