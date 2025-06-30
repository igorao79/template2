'use client';

const FontPreload = () => {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        media="print"
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement;
          target.media = 'all';
        }}
      />
    </>
  );
};

export default FontPreload; 