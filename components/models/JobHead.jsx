import Head from "next/head";

const JobHead = ({ jobData }) => {
    if (!jobData || !jobData[0]) return null;

    const job = jobData[0];
    const datePosted = new Date(job.createdAt || job.updatedAt).toISOString();
    const validThrough = new Date(job.deadLine || Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // fallback +7 days

    const locationParts = (job.location?.[0] || "").split(",");
    const addressLocality = locationParts[0]?.trim() || "India";
    const addressRegion = locationParts[1]?.trim() || "";
    const country = job.country?.[0] || "India";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.jobTitle || "",
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
                "addressLocality": addressLocality,
                "addressRegion": addressRegion,
                "addressCountry": {
                    "@type": "Country",
                    "name": country
                }
            }
        },
        "applicantLocationRequirements": {
            "@type": "Country",
            "name": jobData[0]?.country?.[0] || "India"
        }
        ,
        ...(jobData[0]?.minSalary && jobData[0]?.maxSalary
            ? {
                "baseSalary": {
                    "@type": "MonetaryAmount",
                    "currency": jobData[0]?.currency || "INR",
                    "value": {
                        "@type": "QuantitativeValue",
                        "minValue": jobData[0]?.minSalary * 1000000,
                        "maxValue": jobData[0]?.maxSalary * 1000000,
                        "unitText": jobData[0]?.salaryType === "Annual" ? "YEAR" : "MONTH"
                    }
                }
            }
            : {})
        ,
        "jobLocationType": job.jobMode?.toUpperCase().replace("-", "_") || "ON_SITE",
        "qualifications": job.requiredQualification || "",
        "experienceRequirements": `Minimum ${jobData[0]?.relExpMin || 2} years of experience`,
        "skills": [
            ...(job.mustSkills || []),
            ...(job.goodSkills || [])
        ],
        "industry": job.jobSector || ""
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
