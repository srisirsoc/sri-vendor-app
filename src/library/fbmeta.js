export const FB_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID || 579537154955475;

export const pageview = () => {
    window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
    window.fbq("track", name, options);
};