class GlobalCache {
    constructor() { this.cache = new Map() };
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return undefined;
        if (entry.expiry && entry.expiry < Date.now()) {
            this.cache.delete(key);
            return undefined;
        }
        return entry.value;
    };
    set(key, value, ttl) {
        const expiry = ttl ? Date.now() + ttl : undefined;
        this.cache.set(key, { value, expiry });
    };
    memoize(fn, key = null, ttl = 0) {
        if (typeof fn !== "function") {
            throw new TypeError("memoize expects a function as the first argument");
        };
        return async (...args) => {
            const cacheKey = key || JSON.stringify([fn.name || "anonymous", args]);
            const cached = this.get(cacheKey);
            if (cached !== undefined) return cached;
            const result = await Promise.resolve(fn(...args));
            this.set(cacheKey, result, ttl);
            return result;
        };
    };
    clear(key) {
        if (key) {
            this.cache.delete(key)
        } else {
            this.cache.clear();
        }
    }
};
const GlobalMemo = new GlobalCache();
export default GlobalMemo;
