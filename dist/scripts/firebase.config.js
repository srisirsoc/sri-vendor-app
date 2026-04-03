
importScripts("https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js");

function getFirebaseConfig() {
  const url = new URL(self.location.href);
  const params = url.searchParams;
  return {
    apiKey: params.get("apiKey") || "AIzaSyCBz0Cs1UDwECHCUlpPzD8rD1wvxci3Y9A",
    authDomain: params.get("authDomain") || "real-time-chat-7d7fe.firebaseapp.com",
    projectId: params.get("projectId") || "real-time-chat-7d7fe",
    storageBucket: params.get("storageBucket") || "real-time-chat-7d7fe.firebasestorage.app",
    messagingSenderId: params.get("messagingSenderId") || "289200854490",
    appId: params.get("appId") || "1:289200854490:web:cfba628dfb8ceeeb451ce3",
    measurementId: params.get("measurementId") || "G-JS7LHTB8V0",
  };
}

firebase.initializeApp(getFirebaseConfig());
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification || {};
  const title = notification.title || "New notification";
  const options = {
    body: notification.body || "You have a new message.",
    icon: notification.image || notification.icon || "/icons/icon-192x192.png",
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});
