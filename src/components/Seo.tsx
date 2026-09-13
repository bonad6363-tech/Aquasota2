import { useEffect } from 'react';
import { companyInfo } from '../data/company';
import { images } from '../data/images';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export function Seo({ title, description, path, image = images.ogCover, jsonLd, noindex }: SeoProps) {
  const url = `${companyInfo.siteUrl}${path}`;
  const fullTitle = title.includes('АКВАСОТА') ? title : `${title} — АКВАСОТА`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${companyInfo.siteUrl}${image}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setLink('canonical', url);

    const scriptId = 'jsonld';
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, url, image, jsonLd, noindex]);

  return null;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.brand,
    legalName: companyInfo.legalName,
    url: companyInfo.siteUrl,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Дурылина, 39А',
      addressLocality: 'Королёв',
      postalCode: '141060',
      addressCountry: 'RU',
    },
  };
}
