// sw.js

// Install event - Runs when the service worker is installed
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    // Precache resources during the install phase (optional)
    event.waitUntil(
        caches.open('my-cache-v1').then((cache) => {
            console.log('Service Worker: Caching files');
            // Cache any important files you want to serve offline
            return cache.addAll([
                '/',
                '/index.html',
                '/about.html',
                '/styles.css', // Add your CSS files
                '/scripts.js', // Add your JavaScript files
                // Add other files you want to cache
            ]);
        })
    );
});

// Activate event - Runs when the service worker is activated
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Clear old caches (important to avoid cache bloat)
    const cacheWhitelist = ['my-cache-v1']; // Specify the new cache version
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        // Delete old caches that aren't in the whitelist
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - Handles network requests, uses cached files if available
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request);

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached response if available
                console.log('Service Worker: Returning cached response');
                return cachedResponse;
            }

            // If no cache, fetch from the network
            return fetch(event.request)
                .then((networkResponse) => {
                    // Cache the new response for future use
                    return caches.open('my-cache-v1').then((cache) => {
                        console.log('Service Worker: Caching new resource', event.request.url);
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch((error) => {
                    console.error('Service Worker: Fetch failed', error);
                    throw error;
                });
        })
    );
});

// Push notification event (optional, for future use)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push event received', event);
    const title = 'New Push Notification';
    const options = {
        body: event.data ? event.data.text() : 'New content is available!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
