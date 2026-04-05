import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

const firebaseApp = (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.messagingSenderId && firebaseConfig.appId) ? initializeApp(firebaseConfig) : null;

const getNotificationBaseUrl = () => import.meta.env.VITE_NOTIFICATION_BASE_URL || import.meta.env.VITE_BASE_URL || "";
const getVapidKey = () => import.meta.env.VITE_FIREBASE_VAPID_KEY || "";

const isCapacitorNative = typeof window !== "undefined" && typeof window.Capacitor !== "undefined" && typeof window.Capacitor.getPlatform === "function" && window.Capacitor.getPlatform() !== "web";
const isWebPushSupported = typeof window !== "undefined" && "serviceWorker" in navigator && "Notification" in window;

const buildWorkerUrl = () => {
  const params = new URLSearchParams({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId,
  });
  return `/scripts/firebase.config.js?${params.toString()}`;
};

const sendTokenToServer = async ({ token, userId, authToken, topic, platform }) => {
  if (!token) return null;
  const baseUrl = getNotificationBaseUrl();
  if (!baseUrl) return null;
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/notification/register-device`;
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ token, user_id: userId || null, platform: platform || "web", topic: topic || null }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("FCM: failed to save device token", endpoint, response.status, errorText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("FCM: sendTokenToServer failed", error);
    return null;
  }
};

const getWebFcmToken = async () => {
  if (!firebaseApp) throw new Error("Firebase is not configured");
  if (!isWebPushSupported) throw new Error("Web push is not supported in this browser");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission denied");
  }

  const registration = await navigator.serviceWorker.register(buildWorkerUrl(), { scope: "/scripts/" });
  const messaging = getMessaging(firebaseApp);
  const token = await getToken(messaging, {
    serviceWorkerRegistration: registration,
    vapidKey: getVapidKey(),
  });

  onMessage(messaging, (payload) => {
    const title = payload.notification?.title || "New notification";
    const body = payload.notification?.body || "You have a new message.";
    const icon = payload.notification?.image || payload.notification?.icon || "/icons/icon-192x192.png";
    if (Notification.permission === "granted") {
      registration.showNotification(title, { body, icon, data: payload.data });
    }
  });

  return token;
};

const getNativeFcmToken = async () => {
  try {
    const plugin = await import("@capacitor-community/fcm");
    const result = await plugin.FCM.getToken();
    return result?.token || null;
  } catch (error) {
    console.error("FCM: native plugin not available", error);
    return null;
  }
};

const initFirebaseMessaging = async (user, authToken) => {
  if (!user?.user_id) return null;

  const platform = isCapacitorNative ? "capacitor" : "web";
  let token = null;

  if (isCapacitorNative) {
    token = await getNativeFcmToken();
    if (token) {
      await sendTokenToServer({ token, userId: user.user_id, authToken, platform });
    }
  } else if (isWebPushSupported) {
    try {
      token = await getWebFcmToken();
      if (token) {
        await sendTokenToServer({ token, userId: user.user_id, authToken, platform });
      }
    } catch (error) {
      console.warn("FCM web registration skipped", error);
    }
  } else {
    console.warn("FCM is not supported in this environment");
  }

  return token;
};

const subscribeToNotificationTopic = async (topic, authToken) => {
  if (!topic) return null;
  const baseUrl = getNotificationBaseUrl();
  if (!baseUrl) return null;

  let token = null;
  if (isCapacitorNative) {
    token = await getNativeFcmToken();
  } else if (isWebPushSupported) {
    try {
      token = await getWebFcmToken();
    } catch (error) {
      console.warn("FCM web token retrieval failed for topic subscription", error);
      return null;
    }
  }

  if (!token) return null;

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/notification/send-to-subscribe`;
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ token, topic }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn("FCM: topic subscription failed", response.status, errorText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("FCM: subscribeToNotificationTopic failed", error);
    return null;
  }
};

export { initFirebaseMessaging, subscribeToNotificationTopic };

