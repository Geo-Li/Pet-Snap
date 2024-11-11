import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}

export function setupRecaptcha(elementId: string) {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
    size: "normal",
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    },
  });
  window.recaptchaVerifier.render();
}

export async function signInWithPhone(phoneNumber: string) {
  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier,
    );
    window.confirmationResult = confirmationResult;
    return true;
  } catch (error) {
    console.error("Placeholder");
  }
}

export async function verifyOTP(code: string) {
    try {
        const result = await window.confirmationResult.confirm(code);
        return result.user;
    } catch (error) {
        console.error("Placeholder");
    }
}