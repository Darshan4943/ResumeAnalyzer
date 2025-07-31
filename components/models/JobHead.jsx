import Head from "next/head";

const JobHead = ({ jobData }) => {
  if (!jobData || !jobData[0]) return null;

  const job = jobData[0];
  const datePosted = new Date(job.createdAt || job.updatedAt).toISOString();
  const validThrough = new Date(job.deadLine || Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const locationParts = (job.location?.[0] || "Remote,").split(",");
  const addressLocality = locationParts[0]?.trim();
  const addressRegion = locationParts[1]?.trim() || "";
  const country = job.country?.[0] || "India";

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.jobTitle || "Job Opening",
    "description": job.description?.replace(/<[^>]+>/g, '') || "",
    "identifier": {
      "@type": "PropertyValue",
      "name": job.companyName || "Skilotech",
      "value": job.jobId || job._id
    },
    "datePosted": datePosted,
    "validThrough": validThrough,
    "employmentType": job.jobType?.toUpperCase().replace(/\s/g, "_") || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.companyName || "Skilotech",
      "sameAs": "https://www.skilotech.com",
      "logo": job.logo || "https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/logo+skilotech+2.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": job.address || "Not specified",
        "addressLocality": addressLocality,
        "addressRegion": addressRegion,
        "postalCode": job.postalCode || "000000",
        "addressCountry": country
      }
    },
    ...(job.minSalary && job.maxSalary
      ? {
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": job.currency || "INR",
            "value": {
              "@type": "QuantitativeValue",
              "value": job.minSalary * 1000000, 
              "unitText": job.salaryType === "Annual" ? "YEAR" : "MONTH"
            }
          }
        }
      : {})
  };

  return (
    <Head>
      <title>{job.jobTitle} | {job.companyName}</title>
      <meta name="description" content={job.gist || job.description?.replace(/<[^>]+>/g, '').slice(0, 150)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default JobHead;
