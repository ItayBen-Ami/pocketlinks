import { useEffect, useState } from 'react';

const Favicon = ({ domain, fallback }: { domain: string; fallback: string }) => {
  const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  const defaultGoogleFavicon = 'https://www.google.com/s2/favicons?domain=google.com';

  const [faviconSrc, setFaviconSrc] = useState(googleFaviconUrl);

  useEffect(() => {
    const compareFavicons = async () => {
      const loadImageAsDataUrl = (url: string) => {
        return new Promise(resolve => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = url;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL());
          };
          img.onerror = () => resolve(null);
        });
      };

      const domainFaviconDataUrl = await loadImageAsDataUrl(googleFaviconUrl);
      const defaultFaviconDataUrl = await loadImageAsDataUrl(defaultGoogleFavicon);

      if (domainFaviconDataUrl === defaultFaviconDataUrl || !domainFaviconDataUrl) {
        setFaviconSrc(fallback);
      }
    };

    compareFavicons();
  }, [domain, fallback, googleFaviconUrl]);

  return <img className="size-4" src={faviconSrc} alt={`${domain} favicon`} />;
};

export default Favicon;
