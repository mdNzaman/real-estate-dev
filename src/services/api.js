import { mockProperties, mockUsers, mockBookings } from "../mockData";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./config";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const login = async (email, password) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Property APIs
export const fetchProperties = async (filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await api.get(
      `${API_ENDPOINTS.PROPERTIES.SEARCH}?${queryString}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.PROPERTIES.BASE}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Admin Property APIs
export const adminAddProperty = async (propertyData) => {
  try {
    const response = await api.post(
      API_ENDPOINTS.PROPERTIES.BASE,
      propertyData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const adminUpdateProperty = async (propertyId, propertyData) => {
  try {
    const response = await api.put(
      `${API_ENDPOINTS.PROPERTIES.BASE}/${propertyId}`,
      propertyData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const adminDeleteProperty = async (propertyId) => {
  try {
    const response = await api.delete(
      `${API_ENDPOINTS.PROPERTIES.BASE}/${propertyId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mock APIs

// Admin Property Management

// export const fetchProperties = (filters) => {
//   // Simulate API call with filtering
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let filteredProperties = [...mockProperties];
//       if (filters.location) {
//         filteredProperties = filteredProperties.filter((p) =>
//           p.location.toLowerCase().includes(filters.location.toLowerCase()),
//         );
//       }
//       if (filters.minPrice) {
//         filteredProperties = filteredProperties.filter(
//           (p) => p.price >= filters.minPrice,
//         );
//       }
//       if (filters.maxPrice) {
//         filteredProperties = filteredProperties.filter(
//           (p) => p.price <= filters.maxPrice,
//         );
//       }
//       resolve(filteredProperties);
//     }, 500);
//   });
// };

// export const fetchPropertyById = (id) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const property = mockProperties.find((p) => p.id === parseInt(id));
//       if (property) {
//         resolve(property);
//       } else {
//         reject(new Error("Property not found"));
//       }
//     }, 500);
//   });
// };

export const createBooking = (propertyId, bookingData) => {
  // Simulate booking creation
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Booking created for property ${propertyId}:`, bookingData);
      resolve({ success: true });
    }, 500);
  });
};

// export const adminFetchProperties = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockProperties);
//     }, 500);
//   });
// };

// export const adminAddProperty = (propertyData) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newProperty = {
//         ...propertyData,
//         id: Date.now(),
//       };
//       mockProperties.push(newProperty);
//       resolve(newProperty);
//     }, 500);
//   });
// };

// export const adminUpdateProperty = (propertyId, propertyData) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const index = mockProperties.findIndex((p) => p.id === propertyId);
//       if (index !== -1) {
//         mockProperties[index] = { ...mockProperties[index], ...propertyData };
//         resolve(mockProperties[index]);
//       }
//     }, 500);
//   });
// };

// export const adminDeleteProperty = (propertyId) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const index = mockProperties.findIndex((p) => p.id === propertyId);
//       if (index !== -1) {
//         mockProperties.splice(index, 1);
//         resolve({ success: true });
//       }
//     }, 500);
//   });
// };

// Admin Booking Management
export const adminFetchBookings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBookings);
    }, 500);
  });
};

export const adminUpdateBookingStatus = (bookingId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const booking = mockBookings.find((b) => b.id === bookingId);
      if (booking) {
        booking.status = status;
        resolve(booking);
      }
    }, 500);
  });
};

// Admin User Management
export const adminFetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500);
  });
};

// Authentication
// export const login = (email, password) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = mockUsers.find(
//         (u) => u.email === email && u.password === password,
//       );
//       if (user) {
//         const { password, ...userWithoutPassword } = user;
//         resolve(userWithoutPassword);
//       } else {
//         reject(new Error("Invalid credentials"));
//       }
//     }, 500);
//   });
// };
