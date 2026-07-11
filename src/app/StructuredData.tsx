// Server component — emits Organization / AccountingService structured data
// (JSON-LD) so search engines understand who Commonwealth Accounting Partners
// is, the markets served, and the services offered. Rendered once in the root
// layout so it appears on every page.
//
// TODO for the owner: add `telephone` and a `PostalAddress` once you have a
// public business address/phone — Google's local features reward them.

const BASE_URL = "https://comaccpar.com";

const schema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Commonwealth Accounting Partners",
  url: BASE_URL,
  logo: `${BASE_URL}/commonwealth-logo.svg`,
  image: `${BASE_URL}/icon.png`,
  description:
    "Bookkeeping, accounting, compliance and advisory for founders, studios and creators across the UK and Australia. Accurate records. Stronger business. Global partners.",
  slogan: "Accurate records. Stronger business. Global partners.",
  email: "hello@comaccpar.com",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
  ],
  knowsAbout: [
    "Bookkeeping",
    "Taxation",
    "VAT",
    "Corporation Tax",
    "Self Assessment",
    "Online Accounting",
    "Compliance",
    "Advisory",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Services",
          url: `${BASE_URL}/services/business`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Taxation Services",
          url: `${BASE_URL}/services/taxation`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Other Services",
          url: `${BASE_URL}/services/other`,
        },
      },
    ],
  },
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user input); this is the
      // standard Next.js pattern for JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
