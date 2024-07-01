//history page
import React from "react";
import historyImage from "../images/histroy.webp";

const Contacts = () => {
  const containerStyle = {
    backgroundColor: "#ffc0cb",
    padding: "20px",
  };

  const imageStyle = {
    maxWidth: "100%", // Ensure the image doesn't exceed the container width
    marginTop: "20px", // Adjust the margin as needed
  };

  return (
    <div
      className="container-fluid"
      style={{ ...containerStyle, minHeight: "100vh" }}
    >
      <header>
        <h1>
          Thank you for your interest in contacting us. We value your feedback,
          questions, and suggestions. Please find below the various ways you can
          reach out to us:
        </h1>
      </header>
      <article>
        <br />
        <h3>Email</h3>
        <p>
          For general inquiries, partnership opportunities, or any other
          questions, you can reach us via email at info@example.com. We aim to
          respond to all emails within 1-2 business days.
        </p>
        <br />
        <h3>Phone</h3>
        <p>
          If you prefer to speak with us directly, our customer service team can
          be reached at +1 234 567 890 during our business hours.
        </p>
        <br />
        <h3>Visit Us </h3>
        <p>
          You're welcome to visit our office located at: 123 Street,
          City, Country. Our office hours are Monday to Friday, 9:00 AM - 5:00
          PM.
        </p>
      </article>
      <img src={historyImage} alt="IRCTC Train History" style={imageStyle} />
    </div>
  );
};

export default Contacts;
