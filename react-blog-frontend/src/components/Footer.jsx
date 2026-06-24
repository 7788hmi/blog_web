import React from 'react';

const socialLinks = [
  { href: 'https://www.facebook.com', label: 'Facebook', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z"/>
    </svg>
  )},
  { href: 'https://www.youtube.com', label: 'YouTube', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.615 3.184c-1.403-.093-7.015-.093-7.015-.093s-5.612 0-7.015.093c-1.51.1-2.68 1.27-2.78 2.78-.093 1.403-.093 4.33-.093 4.33s0 2.927.093 4.33c.1 1.51 1.27 2.68 2.78 2.78 1.403.093 7.015.093 7.015.093s5.612 0 7.015-.093c1.51-.1 2.68-1.27 2.78-2.78.093-1.403.093-4.33.093-4.33s0-2.927-.093-4.33c-.1-1.51-1.27-2.68-2.78-2.78zM10.545 15.568v-7.136l6.182 3.568-6.182 3.568z"/>
    </svg>
  )},
  { href: 'https://www.instagram.com', label: 'Instagram', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/>
    </svg>
  )},
  { href: 'https://www.tiktok.com', label: 'TikTok', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 3h3.75a3.75 3.75 0 003.75 3.75v3.75a7.5 7.5 0 11-7.5-7.5z"/>
    </svg>
  )},
  { href: 'https://www.pinterest.com', label: 'Pinterest', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 00-3.16 19.39c-.04-.33-.07-.84.02-1.2.08-.33.53-2.1.53-2.1s-.13-.27-.13-.67c0-.63.37-1.1.83-1.1.39 0 .58.29.58.64 0 .39-.25.98-.38 1.52-.11.46.23.83.68.83.82 0 1.45-.86 1.45-2.1 0-1.1-.79-1.87-1.92-1.87-1.31 0-2.08.98-2.08 2 0 .39.15.82.34 1.05.04.05.05.1.04.15-.05.16-.17.52-.2.59-.03.09-.11.11-.2.07-.75-.35-1.22-1.44-1.22-2.33 0-1.9 1.38-3.65 3.98-3.65 2.09 0 3.71 1.5 3.71 3.5 0 2.09-1.31 3.77-3.14 3.77-.61 0-1.18-.32-1.38-.7l-.38 1.45c-.14.54-.53 1.22-.79 1.63a10 10 0 0014.5-9.3A10 10 0 0012 2z"/>
    </svg>
  )},
  { href: 'https://twitter.com', label: 'X', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.724 9.865 9.865 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.822 4.822 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.996 4.996 0 01-2.224.084 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.395 0-.779-.023-1.158-.067a13.945 13.945 0 007.557 2.209c9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633A9.936 9.936 0 0024 4.59z"/>
    </svg>
  )},
  { href: 'https://linkedin.com', label: 'LinkedIn', svg: (
    <svg aria-hidden="true" focusable="false" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.07 2.07 0 11.001-4.139 2.07 2.07 0 01-.001 4.139zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  )},
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-social-icons">
          {socialLinks.map(({ href, label, svg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon"
            >
              {svg}
            </a>
          ))}
        </div>
        <div className="footer-right-links">
          <a href="/terms-of-use" className="footer-link">Terms of Use</a>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <span className="footer-copyright">© 2006-2025 blog website</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
