"use client";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectcache, setProjectcache] = useState({});
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);
  const signup = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setError(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Network error. Please try again.");
      setLoading(false);
      throw error;
    }
  };
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setError(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      setError("Network error. Please try again.");
      setLoading(false);
      throw error;
    }
  };
  const logout = () => {
    localStorage.clear();

    setToken(null);
    setUser(null);
    setAuthenticated(false);
    setProjectcache({});

    router.replace("/login");
  };
  const updateProfile = async (userId, updateData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        setError(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Network error. Please try again.");
      setLoading(false);
      throw error;
    }
  };

  const deleteprofile = async (userId) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        // Clear everything
        localStorage.clear();
        setUser(null);
        setToken(null);
        setAuthenticated(false);
        setProjectcache({});

        // Redirect to login page
        router.replace("/login");
      } else {
        setError(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("Network error. Please try again.");
      setLoading(false);
      throw error;
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      setResetPasswordError(null);
      setResetPasswordLoading(true);

      const response = await fetch(`${API_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        setResetPasswordError(data.message);
      }

      setResetPasswordLoading(false);
      return data;
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setResetPasswordError("Network error. Please try again.");
      setResetPasswordLoading(false);
      throw error;
    }
  };

  const verifyResetCode = async (email, code) => {
    try {
      setResetPasswordError(null);
      setResetPasswordLoading(true);

      const response = await fetch(`${API_URL}/api/verify-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        setResetPasswordError(data.message);
      }

      setResetPasswordLoading(false);
      return data;
    } catch (error) {
      console.error("Error verifying reset code:", error);
      setResetPasswordError("Network error. Please try again.");
      setResetPasswordLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      setResetPasswordError(null);
      setResetPasswordLoading(true);

      const response = await fetch(`${API_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        setResetPasswordError(data.message);
      }

      setResetPasswordLoading(false);
      return data;
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetPasswordError("Network error. Please try again.");
      setResetPasswordLoading(false);
      throw error;
    }
  };

  const sendAiChat = async (messages) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI chat failed");
      }

      return data.reply;
    } catch (error) {
      console.error("AI Chat Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createShareableLink = async (shareData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/share/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shareData),
      });

      const data = await response.json();

      if (data.status !== "success") {
        setError(data.message);
        throw new Error(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.error("Create shareable link error:", error);
      setError("Failed to create shareable link. Please try again.");
      setLoading(false);
      throw error;
    }
  };

  const getSharedContent = async (slug) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/share/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status !== "success") {
        setError(data.message);
        throw new Error(data.message);
      }

      setLoading(false);
      return data.data;
    } catch (error) {
      console.error("Get shared content error:", error);
      setError("Failed to load shared content.");
      setLoading(false);
      throw error;
    }
  };

  const getUserSharedContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/share/my-shares`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status !== "success") {
        setError(data.message);
        throw new Error(data.message);
      }

      setLoading(false);
      return data.data;
    } catch (error) {
      console.error("Get user shared content error:", error);
      setError("Failed to load your shared content.");
      setLoading(false);
      throw error;
    }
  };

  const deleteSharedContent = async (slug) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/share/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status !== "success") {
        setError(data.message);
        throw new Error(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.error("Delete shared content error:", error);
      setError("Failed to delete shared content.");
      setLoading(false);
      throw error;
    }
  };

  // const loginWithGoogle = () => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       setError(null);
  //       setLoading(true);

  //       const width = 500;
  //       const height = 600;
  //       const left = window.screen.width / 2 - width / 2;
  //       const top = window.screen.height / 2 - height / 2;

  //       const googleAuthUrl = `${API_URL}/api/auth/google`;

  //       const popup = window.open(
  //         googleAuthUrl,
  //         'Google Login',
  //         `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  //       );

  //       if (!popup) {
  //         setError("Popup blocked! Please allow popups.");
  //         setLoading(false);
  //         reject(new Error("Popup blocked"));
  //         return;
  //       }

  //       const handleMessage = (event) => {
  //         if (event.origin !== window.location.origin) {
  //           return;
  //         }

  //         const { type, token, user, error } = event.data;

  //         if (type === 'GOOGLE_AUTH_SUCCESS') {
  //           localStorage.setItem("token", token);
  //           localStorage.setItem("user", JSON.stringify(user));

  //           setToken(token);
  //           setUser(user);
  //           setAuthenticated(true);
  //           setLoading(false);

  //           if (popup && !popup.closed) {
  //             popup.close();
  //           }

  //           window.removeEventListener('message', handleMessage);
  //           resolve({ status: 'success', user, token });
  //         } else if (type === 'GOOGLE_AUTH_ERROR') {
  //           setError(error || "Google login failed");
  //           setLoading(false);

  //           if (popup && !popup.closed) {
  //             popup.close();
  //           }

  //           window.removeEventListener('message', handleMessage);
  //           reject(new Error(error || "Google login failed"));
  //         }
  //       };

  //       window.addEventListener('message', handleMessage);

  //       const checkPopupClosed = setInterval(() => {
  //         if (popup.closed) {
  //           clearInterval(checkPopupClosed);
  //           window.removeEventListener('message', handleMessage);
  //           setLoading(false);
            
  //           if (!authenticated) {
  //             setError("Login cancelled");
  //             reject(new Error("Login cancelled"));
  //           }
  //         }
  //       }, 500);

  //     } catch (error) {
  //       console.error("Google login error:", error);
  //       setError("Failed to initiate Google login");
  //       setLoading(false);
  //       reject(error);
  //     }
  //   });
  // };

  const loginWithGoogle = () => {
  setError(null);
  setLoading(true);

  window.location.href = `${API_URL}/api/auth/google`;
};


  const loginWithApple = () => {
    return new Promise((resolve, reject) => {
      setError("Apple login coming soon!");
      setLoading(false);
      reject(new Error("Apple login not configured"));
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        error,
        setError,
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
        projectcache,
        setProjectcache,
        // Authentication functions
        signup,
        login,
        logout,
        updateProfile,
        deleteprofile,
        // password reset karny k liya
        resetPasswordLoading,
        setResetPasswordLoading,
        resetPasswordError,
        setResetPasswordError,
        requestPasswordReset,
        verifyResetCode,
        resetPassword,
        //AI Api k liya
        sendAiChat,
        // Share functionality
        createShareableLink,
        getSharedContent,
        getUserSharedContent,
        deleteSharedContent,
        // Google/Apple login
        loginWithGoogle,
        loginWithApple,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
