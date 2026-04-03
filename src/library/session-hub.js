const getCookieValue = (name, defaultValue = null) => {
  if (typeof document === 'undefined') return defaultValue;
  const value = document.cookie.split('; ').find((entry) => entry.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.split('=')[1]) : defaultValue;
};

const GetSession = () => getCookieValue('token');
const GetLanguage = () => getCookieValue('language', 'ENGLISH');
const GetId = () => getCookieValue('user_id');
const GetHeaders = () => {
  if (typeof window === 'undefined') return {};
  const { href, hostname, pathname, port } = window.location;
  return {
    host: hostname || '',
    agent: navigator.userAgent || '',
    language: navigator.language || '',
    referer: document.referrer || '',
    connection: '',
    cookie: document.cookie || '',
    port: port || '',
    ip: '',
    href,
    pathname,
  };
};

export { GetHeaders, GetSession, GetLanguage, GetId };
