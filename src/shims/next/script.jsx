import { useEffect } from 'react';

const Script = ({ src, id, onLoad, dangerouslySetInnerHTML = null }) => {
  useEffect(() => {
    if (src) {
      const script = document.createElement('script');
      if (id) script.id = id;
      script.src = src;
      script.async = true;
      if (onLoad) script.onload = onLoad;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }

    if (dangerouslySetInnerHTML) {
      const script = document.createElement('script');
      if (id) script.id = id;
      script.innerHTML = dangerouslySetInnerHTML.__html || '';
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }

    return undefined;
  }, [src, id, onLoad, dangerouslySetInnerHTML]);

  return null;
};

export default Script;
