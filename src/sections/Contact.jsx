import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { submitContactMessage } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Save to Database
      console.log("Saving message to database...");
      await submitContactMessage(formData);
      console.log("Message saved to database.");

      // 2. Send Email via EmailJS
      console.log("Sending email via EmailJS...");
      try {
        const result = await emailjs.send(
          "service_79b0nyj",
          "template_zx6fhsl",
          {
            from_name: formData.name,
            to_name: "Jayed",
            from_email: formData.email,
            to_email: "noyonahmed45678@gmail.com",
            message: formData.message,
          },
          "TXS8Nq2xIo17-siDN"
        );
        console.log("Email sent successfully:", result);
        showAlertMessage("success", "Your message has been sent and saved!");
      } catch (emailError) {
        console.error("FAILED to send email:", emailError);
        showAlertMessage("warning", "Message saved, but failed to send email. Check console.");
      }

      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setIsLoading(false);
      console.error("Database Save Error:", error);
      let errorMessage = "Something went wrong!";
      if (error.response) {
        errorMessage = error.response.data?.error || `Server Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Network Error: Unable to reach server.";
      } else {
        errorMessage = error.message;
      }
      showAlertMessage("danger", errorMessage);
    }
  };
  return (
    <section className="relative flex items-center c-space section-spacing" id="contact">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
