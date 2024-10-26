const Favicon = ({ domain }: { domain: string }) => {
  const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  const fallbackUrl = `https://favicone.com/${domain}`;

  return <img className="size-4" src={googleFaviconUrl} />;
};

export default Favicon;
