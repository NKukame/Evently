import { useState } from "react";
import Header from "../../components/Header";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  /**
   * Handles the submission of the login/register form.
   * If the user is logging in, logs a message to the console and sets isLoading to false.
   * If the user is registering, checks if the passwords match and if they do,
   * sends a POST request to the register endpoint. If the response is ok,
   * sets the alert message to "User registered successfully!" and sets isLogin to true
   * after a 2 second delay. If the response is not ok, sets the alert message to
   * the error message from the response or "Registration failed". If there is a network
   * error, sets the alert message to "Network error". Finally, sets isLoading to false.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isLogin) {
      console.log("Login not implemented yet");
      setIsLoading(false);
    } else {
      if (password !== confirmPassword) {
        setAlertMessage("Passwords don't match");
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name: name
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setAlertMessage("User registered successfully!");
          setShowAlert(true);
          setTimeout(() => {
            setIsLogin(true);
            setShowAlert(false);
          }, 2000);
        } else {
          setAlertMessage(data.message || "Registration failed");
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage("Network error");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="bg-[#101a23] h-screen">
      <Header />
      
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div role="alert" className="alert alert-info bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{alertMessage}</span>
            <button onClick={() => setShowAlert(false)} className="ml-4 text-blue-700 hover:text-blue-900 text-xl">×</button>
          </div>
        </div>
      )}

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              {isLogin ? "Log In to Your Account" : "Create Your Account"}
            </h2>

            {/* Sign Up only - Full Name */}
            {!isLogin && (
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
                  />
                </label>
              </div>
            )}

            {/* Email */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Password */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Sign Up only - Confirm Password */}
            {!isLogin && (
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90adcb] p-4 text-base font-normal leading-normal"
                  />
                </label>
              </div>
            )}

            {/* Button */}
            {isLoading ? (
              <div className="flex flex-row gap-2 items-center justify-center px-4 py-3">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[450px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#3d99f5] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">
                    {isLogin ? "Log In" : "Sign Up"}
                  </span>
                </button>
              </div>
            )}
          </form>

          <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#90adcb] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;