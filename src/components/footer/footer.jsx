import React, { useState, useEffect } from "react";
import "./footer.css";

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="footer">
      <p>Created By :- Irosh Perera</p>
      <p>© 2024 Home-Scope. All rights reserved.</p>
      <p>{currentDateTime}</p>
    </div>
  );
}

export default Footer;
