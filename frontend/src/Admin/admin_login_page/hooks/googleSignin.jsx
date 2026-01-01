/**
 * googleSignin.jsx - custom hook to handle google sign-in for admin login page
 */
import { API_URL } from "../../../config/api";

export default function googleLogin(event) {
      const url = `${API_URL}/auth/login/google`;
      window.location.href = url;
}
