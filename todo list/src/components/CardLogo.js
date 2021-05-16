import React from "react";

function CardLogo(props) {
  const imgSrc =
    props.theme === "dark" ? "/images/icon-sun.svg" : "/images/icon-moon.svg";

  function handleThemeIconClick() {
    props.callbackToggleTheme();
  }

  return (
    <div className="card-logo">
      <span className="app-name">T O D O</span>
      <img
        src={imgSrc}
        className="icon-theme"
        alt="img-theme"
        onClick={handleThemeIconClick}
      />
    </div>
  );
}

export default CardLogo;
