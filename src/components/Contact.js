// import React, { useState, useEffect } from "react";
// import logo from "./images/logo.png";
// import "./Contact.css";

// const API_URL = "http://localhost:5000/api";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     email: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [showPrompt, setShowPrompt] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setResponseMessage("");

//     try {
//       const response = await fetch(`${API_URL}/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResponseMessage(data.message);
//         setFormData({ name: "", contact: "", email: "", message: "" });
//       } else {
//         const errorResponse = await response.json();
//         setResponseMessage(errorResponse.error || "Mesaj göndərilməsində problem yarandı.");
//       }
//     } catch (error) {
//       console.error("Xəta baş verdi:", error);
//       setResponseMessage("Serverlə əlaqə qurularkən xəta baş verdi.");
//     } finally {
//       setIsSubmitting(false);
//       setShowPrompt(true);
//     }
//   };

//   useEffect(() => {
//     if (showPrompt) {
//       const timer = setTimeout(() => {
//         setShowPrompt(false);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showPrompt]);

//   return (
//     <div className="contact">
//       <div className="contact-header">
//         <a href="/">
//           <img src={logo} alt="DigiMenu.az Logo" className="logo" />
//         </a>
//         <h1>Bizimlə Əlaqə</h1>
//         <h2>Suallarınızı bizə göndərin</h2>
//         <p>Hər hansı sualınız və ya təklifiniz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.</p>
//       </div>
//       {showPrompt && (
//         <div className={`prompt-message ${responseMessage.includes("uğurla") ? "success" : "error"}`}>
//           {responseMessage}
//         </div>
//       )}
//       <div className="contact-form">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Adınız:</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Adınızı daxil edin"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Əlaqə nömrəsi:</label>
//             <input
//               type="tel"
//               name="contact"
//               placeholder="+994"
//               value={formData.contact}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email adresinizi daxil edin"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Mesajınız:</label>
//             <textarea
//               name="message"
//               placeholder="Mesajınızı yazın"
//               rows="5"
//               value={formData.message}
//               onChange={handleInputChange}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="submit-button" disabled={isSubmitting}>
//             {isSubmitting ? "Göndərilir..." : "Göndər"}
//           </button>
//         </form>
//       </div>
//       <div className="contact-footer">
//   <h2>Bizimlə Əlaqə</h2>
//   <p>
//     Əlaqə nömrəsi: <a href="tel:+994514195344">+994 10 419 53 44</a>
//   </p>
//   <p>
//     Email: <a href="mailto:info@digimenu.az">info@digimenu.az</a>
//   </p>
//   <p>© 2025 DigiMenu.az. Bütün hüquqlar qorunur.</p>
// </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import "./Contact.css";

const API_URL = "http://localhost:5000/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  // Form input dəyişikliyi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Məlumatı LocalStorage-a saxla
  const saveToLocalStorage = () => {
    const unsentMessages = JSON.parse(localStorage.getItem("unsentMessages")) || [];
    unsentMessages.push(formData);
    localStorage.setItem("unsentMessages", JSON.stringify(unsentMessages));
    setResponseMessage("Server bağlıdır. Məlumat göndərildi.");
    setShowPrompt(true);
    setFormData({ name: "", contact: "", email: "", message: "" });
  };

  // Serverə məlumat göndərilməsi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
        setFormData({ name: "", contact: "", email: "", message: "" });

        // Uğurlu göndərişdə LocalStorage təmizlənir
        localStorage.removeItem("unsentMessages");
      } else {
        throw new Error("Server cavab vermir.");
      }
    } catch (error) {
      console.error("Server xəta:", error);
      saveToLocalStorage(); // Server işləmirsə məlumatları saxla
    } finally {
      setIsSubmitting(false);
      setShowPrompt(true);
    }
  };

  // Göndərilməmiş mesajları serverə göndər
  const sendUnsentMessages = async () => {
    const unsentMessages = JSON.parse(localStorage.getItem("unsentMessages")) || [];
    if (unsentMessages.length === 0) return;

    for (const message of unsentMessages) {
      try {
        await fetch(`${API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.error("Göndərilməmiş məlumatların göndərilməsində xəta:", error);
      }
    }

    // Uğurla göndərildikdən sonra LocalStorage təmizlənir
    localStorage.removeItem("unsentMessages");
  };

  // Komponent yükləndikdə göndərilməmiş mesajları yoxla
  useEffect(() => {
    sendUnsentMessages();
  }, []);

  // Prompt mesajını 2 saniyəyə yox et
  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(false);
      }, 2000); // 2 saniyə
      return () => clearTimeout(timer);
    }
  }, [showPrompt]);

  return (
    <div className="contact">
      <div className="contact-header">
        <a href="/">
          <img src={logo} alt="DigiMenu.az Logo" className="logo" />
        </a>
        <h1>Bizimlə Əlaqə</h1>
        <h2>Suallarınızı bizə göndərin</h2>
        <p>Hər hansı sualınız və ya təklifiniz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.</p>
      </div>
      {showPrompt && (
        <div className={`prompt-message ${responseMessage.includes("uğurla") ? "success" : "error"}`}>
          {responseMessage}
        </div>
      )}
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adınız:</label>
            <input
              type="text"
              name="name"
              placeholder="Adınızı daxil edin"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Əlaqə Nömrəsi:</label>
            <input
              type="text"
              name="contact"
              placeholder="Telefon nömrənizi daxil edin"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email adresinizi daxil edin"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mesajınız:</label>
            <textarea
              name="message"
              placeholder="Mesajınızı yazın"
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Göndərilir..." : "Göndər"}
          </button>
        </form>
      </div>
      <div className="contact-footer">
        <h2>Bizimlə Əlaqə</h2>
        <p>
          Əlaqə nömrəsi: <a href="tel:+994514195344">+994 10 419 53 44</a>
        </p>
        <p>
          Email: <a href="mailto:info@digimenu.az">info@digimenu.az</a>
        </p>
        <p>© 2025 DigiMenu.az. Bütün hüquqlar qorunur.</p>
      </div>
    </div>
  );
};

export default Contact;
