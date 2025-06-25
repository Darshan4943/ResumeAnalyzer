import { Briefcase, MapPin } from "lucide-react";
import React from "react";

export default function CandidateDetails({ jobDetails }) {
    if (!jobDetails) return null;
    // Helper to format camelCase/snake_case into "Title Case"
    function formatJobText(text) {
        if (!text) return "";
        // Insert a space before capitals and lowercase the whole string first
        const spaced = text.replace(/([a-z])([A-Z])/g, "$1 $2");
        // Split on underscores or spaces
        const words = spaced.split(/[_\s]+/);
        return words
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
    }

    function getMonthName(month) {
        if (!month) return ""; // Handle undefined/null/empty
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
        ];
        const index = parseInt(month, 10) - 1;
        return months[index] || ""; // Return empty if index is out of range
    }


    return (
        <div className=" space-y-8">

            {/* ✅ Work Experience */}
            <Section title="Key Skills">
                {jobDetails?.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2 text-[14px] text-gray-700">
                        {jobDetails.skills.map((s) => (
                            <span key={s?._id?.$oid || s?.label} className="bg-[#F4F5F7] text-[12px] px-2 py-1 rounded-[4px] leading-tight">
                                {s?.label || ""}
                            </span>
                        ))}
                    </div>
                ) : <Empty />}
            </Section>
            <section className=" w-full max-w-4xl mx-auto">
                <h2 className="text-[16px] font-bold mb-4">Work Experience</h2>

                <div className="flex flex-col gap-4">
                    {jobDetails?.workExperiance?.length > 0 && (
                        jobDetails.workExperiance.map((work, index) => (
                            <Card key={index} className="p-4  flex items-start gap-4 shadow-md border border-gray-100 rounded-xl">

                                <div className="flex flex-col flex-1">
                                    <div className="flex gap-2 pb-2 items-center">

                                        <div className="w-9 h-9 bg-[#FEECC9] p-2 rounded-[4px]" >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#999999"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z" /></svg>
                                        </div>
                                        <div className="flex flex-col ">
                                            <span className="text-[14px] font-medium ">
                                                {work?.jobTitle} at {work?.companyName}
                                            </span>
                                            <p className="text-xs text-gray-400">

                                                {getMonthName(work?.jobDuration?.startDate?.month)}{" "}
                                                {work?.jobDuration?.startDate?.year || ""}


                                                {(work?.isCurrent || work?.jobDuration?.endDate.year) && " - "}


                                                {work?.isCurrent
                                                    ? "Present"
                                                    : work?.jobDuration?.endDate
                                                        ? <>
                                                            {getMonthName(work?.jobDuration?.endDate?.month)}{" "}
                                                            {work?.jobDuration?.endDate?.year || ""}
                                                        </>
                                                        : null}
                                            </p>
                                        </div>

                                    </div>




                                    <div className="text-xs text-gray-600 flex items-center gap-2 pb-2">
                                        {/* Job Type and Mode */}
                                        {(work?.jobType || work?.jobMode) && (
                                            <span>
                                                {work?.jobType && formatJobText(work.jobType)}
                                                {work?.jobType && work?.jobMode ? " (" : ""}
                                                {work?.jobMode && formatJobText(work.jobMode)}
                                                {work?.jobType && work?.jobMode ? ")" : ""}
                                            </span>
                                        )}

                                        {/* Job Location */}
                                        {work?.jobLocation && work.jobLocation !== "Unknown" && (
                                            <>
                                                <MapPin className="w-4 h-4 ml-2" />
                                                <span>{work.jobLocation}</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Job Description */}
                                    {work?.workDescription && (
                                        <div className="text-[12px]">
                                            {work.workDescription}
                                        </div>
                                    )}

                                </div>
                            </Card>

                        ))

                    )}
                </div>
            </section>

            {/* ✅ Skills */}


            {/* ✅ Job Preferences */}
            <Section title="Job Preferences">
                <Grid>
                    {jobDetails?.jobPrefrences?.industry && (
                        <Item label="Industry" value={jobDetails.jobPrefrences.industry} />
                    )}

                    {jobDetails?.jobPrefrences?.department && (
                        <Item label="Department" value={jobDetails.jobPrefrences.department} />
                    )}

                    {jobDetails?.jobPrefrences?.jobRole && (
                        <Item label="Role" value={jobDetails.jobPrefrences.jobRole} />
                    )}

                    {jobDetails?.jobPrefrences?.expectedSalary && (
                        <Item label="Salary" value={jobDetails.jobPrefrences.expectedSalary} />
                    )}

                    {Array.isArray(jobDetails?.jobPrefrences?.preferedLocation) &&
                        jobDetails.jobPrefrences.preferedLocation.length > 0 && (
                            <Item
                                label="Preferred Locations"
                                value={jobDetails.jobPrefrences.preferedLocation
                                    .map((l) => l?.location)
                                    .filter((loc) => loc && loc !== "Unknown")
                                    .join(", ")}
                            />
                        )}
                </Grid>
            </Section>


            {/* ✅ Education */}
            <div className="flex flex-col gap-4">
                {Array.isArray(jobDetails?.education) &&
                    jobDetails.education.length > 0 &&
                    jobDetails.education.map((edu, index) => (
                        <div key={index} className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="w-9 h-9 bg-[#FEECC9] p-2 rounded-[4px] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    fill="#999999"
                                >
                                    <path d="M12 2L1 7l11 5 11-5-11-5zm0 7.2L5.2 7 12 3.8 18.8 7 12 9.2zM1 9v8l11 5 11-5V9l-11 5-11-5z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1">
                                <div className="flex flex-col gap-1 pb-2">
                                    {edu?.education && (
                                        <span className="text-[14px] font-medium">{edu.education}</span>
                                    )}

                                    {(
                                        (edu?.institute && edu.institute !== "Unknown") ||
                                        (edu?.university && edu.university !== "Unknown")
                                    ) && (
                                            <span className="text-xs text-gray-500">
                                                {edu?.institute && edu.institute !== "Unknown" ? edu.institute : ""}
                                                {edu?.institute && edu.institute !== "Unknown" && edu?.university && edu.university !== "Unknown" ? ", " : ""}
                                                {edu?.university && edu.university !== "Unknown" ? edu.university : ""}
                                            </span>
                                        )}

                                    {/* Duration */}
                                    {(edu?.duration?.startDate || edu?.duration?.endDate || edu?.isCurrent) && (
                                        <p className="text-xs text-gray-400">
                                            {edu?.duration?.startDate?.month &&
                                                getMonthName(edu.duration.startDate.month)}{" "}
                                            {edu?.duration?.startDate?.year || ""}
                                            {(edu?.isCurrent || edu?.duration?.endDate) && " - "}
                                            {edu?.isCurrent
                                                ? "Present"
                                                : edu?.duration?.endDate
                                                    ? <>
                                                        {getMonthName(edu.duration.endDate.month)}{" "}
                                                        {edu.duration.endDate.year || ""}
                                                    </>
                                                    : null}
                                        </p>
                                    )}
                                </div>

                                {/* Score & Location */}
                                {(edu?.gradingSystem?.score ||
                                    edu?.gradingSystem?.type ||
                                    (edu?.location && edu.location !== "Unknown")) && (
                                        <div className="text-xs text-gray-600 flex items-center gap-2 pb-2">
                                            {edu?.gradingSystem?.score && edu?.gradingSystem?.type && (
                                                <span>
                                                    {edu.gradingSystem.score} ({edu.gradingSystem.type})
                                                </span>
                                            )}

                                            {edu?.location && edu.location !== "Unknown" && (
                                                <>
                                                    <MapPin className="w-4 h-4 ml-2" />
                                                    <span>{edu.location}</span>
                                                </>
                                            )}
                                        </div>
                                    )}

                                {/* Description */}
                                {edu?.description && (
                                    <div className="text-[12px] text-gray-600">{edu.description}</div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>



            {/* ✅ Personal Details */}
            <Section title="Personal Details">
                <Grid>
                    {/* Full Name */}
                    {(jobDetails?.basics?.firstName || jobDetails?.basics?.lastName) &&
                        `${jobDetails.basics.firstName || ""} ${jobDetails.basics.lastName || ""}`.trim() !== "" && (
                            <Item
                                label="Full Name"
                                value={`${jobDetails.basics.firstName || ""} ${jobDetails.basics.lastName || ""}`.trim()}
                            />
                        )}

                    {/* Email */}
                    {jobDetails?.basics?.email && jobDetails.basics.email !== "Unknown" && (
                        <Item label="Email" value={jobDetails.basics.email} />
                    )}

                    {/* Mobile */}
                    {jobDetails?.basics?.mobileNo && jobDetails.basics.mobileNo !== "Unknown" && (
                        <Item label="Mobile" value={jobDetails.basics.mobileNo} />
                    )}

                    {/* DOB */}
                    {jobDetails?.basics?.dob && jobDetails.basics.dob !== "Unknown" && (
                        <Item label="DOB" value={jobDetails.basics.dob} />
                    )}

                    {/* Gender */}
                    {jobDetails?.basics?.gender && jobDetails.basics.gender !== "Unknown" && (
                        <Item label="Gender" value={jobDetails.basics.gender} />
                    )}

                    {/* Address */}
                    {jobDetails?.basics?.address && jobDetails.basics.address !== "Unknown" && (
                        <Item label="Address" value={jobDetails.basics.address} />
                    )}

                    {/* Marital Status */}
                    {jobDetails?.basics?.maritalStatus && jobDetails.basics.maritalStatus !== "Unknown" && (
                        <Item label="Marital Status" value={jobDetails.basics.maritalStatus} />
                    )}

                    {/* Work Status */}
                    {jobDetails?.basics?.workStatus && jobDetails.basics.workStatus !== "Unknown" && (
                        <Item label="Work Status" value={jobDetails.basics.workStatus} />
                    )}
                </Grid>
            </Section>


            {/* ✅ Achievements */}
            {Array.isArray(jobDetails?.awards) && jobDetails.awards.length > 0 && (
                <Section title="Achievements">

                    {
                        jobDetails.awards
                            .filter(
                                (award) =>
                                    (award?.title && award.title !== "Unknown") ||
                                    (award?.issuedBy && award.issuedBy !== "Unknown") ||
                                    (award?.issuedDate?.years && award.issuedDate.years !== "Unknown") ||
                                    (award?.issuedDate?.months && award.issuedDate.months !== "Unknown") ||
                                    (award?.description && award.description !== "Unknown")
                            )
                            .map((award, index) => (
                                <Card key={index}>
                                    {award?.title && award.title !== "Unknown" && (
                                        <Item label="Title" value={award.title} />
                                    )}
                                    {award?.issuedBy && award.issuedBy !== "Unknown" && (
                                        <Item label="Issued By" value={award.issuedBy} />
                                    )}
                                    {(award?.issuedDate?.years || award?.issuedDate?.months) &&
                                        (award.issuedDate.years !== "Unknown" || award.issuedDate.months !== "Unknown") && (
                                            <Item
                                                label="Date"
                                                value={`${award.issuedDate.years || ""}${award.issuedDate.years && award.issuedDate.months ? "-" : ""
                                                    }${award.issuedDate.months || ""}`}
                                            />
                                        )}
                                    {award?.description && award.description !== "Unknown" && (
                                        <Item label="Description" value={award.description} />
                                    )}
                                </Card>
                            ))
                    }
                </Section>
            )}
            {/* ✅ Projects */}

            {Array.isArray(jobDetails?.projects) && jobDetails.projects.length > 0 && (
                <Section title="Projects">
                    {jobDetails.projects
                        .filter(
                            (p) =>
                                (p?.title && p.title !== "Unknown") ||
                                (p?.url && p.url !== "Unknown") ||
                                (p?.description && p.description !== "Unknown") ||
                                p?.duration?.startDate?.year ||
                                p?.duration?.startDate?.month ||
                                p?.duration?.endDate?.year ||
                                p?.duration?.endDate?.month
                        )
                        .map((p, index) => (
                            <Card key={index}>
                                {p?.title && p.title !== "Unknown" && (
                                    <Item label="Title" value={p.title} />
                                )}
                                {p?.url && p.url !== "Unknown" && (
                                    <Item label="URL" value={p.url} />
                                )}
                                {(p?.duration?.startDate?.year ||
                                    p?.duration?.startDate?.month ||
                                    p?.duration?.endDate?.year ||
                                    p?.duration?.endDate?.month) && (
                                        <Item
                                            label="Duration"
                                            value={`${p.duration?.startDate?.year || ""}${p.duration?.startDate?.month ? "-" + p.duration.startDate.month : ""
                                                } to ${p.duration?.endDate?.year || "Present"
                                                }${p.duration?.endDate?.month ? "-" + p.duration.endDate.month : ""}`}
                                        />
                                    )}
                                {p?.description && p.description !== "Unknown" && (
                                    <Item label="Description" value={p.description} />
                                )}
                            </Card>
                        ))
                    }
                </Section>
            )}



    {Array.isArray(jobDetails?.courses) && jobDetails.courses.length > 0 && (
            <Section title="Courses">
            
                    {jobDetails.courses
                        .filter(
                            (c) =>
                                (c?.name && c.name !== "Unknown") ||
                                (c?.organization && c.organization !== "Unknown") ||
                                c?.duration?.startDate?.year ||
                                c?.duration?.startDate?.month ||
                                c?.duration?.endDate?.year ||
                                c?.duration?.endDate?.month
                        )
                        .map((c, index) => (
                            <Card key={index}>
                                {c?.name && c.name !== "Unknown" && (
                                    <Item label="Name" value={c.name} />
                                )}
                                {c?.organization && c.organization !== "Unknown" && (
                                    <Item label="Organization" value={c.organization} />
                                )}
                                {(c?.duration?.startDate?.year ||
                                    c?.duration?.startDate?.month ||
                                    c?.duration?.endDate?.year ||
                                    c?.duration?.endDate?.month) && (
                                        <Item
                                            label="Duration"
                                            value={`${c.duration?.startDate?.year || ""}${c.duration?.startDate?.month ? "-" + c.duration.startDate.month : ""
                                                } to ${c.duration?.endDate?.year || "Present"}${c.duration?.endDate?.month ? "-" + c.duration.endDate.month : ""
                                                }`}
                                        />
                                    )}
                            </Card>
                        ))
                    }
                        
               
            </Section>
 )}
 {Array.isArray(jobDetails?.socialLinks) && jobDetails.socialLinks.length > 0 && (
            <Section title="Social Links">
                
                    {jobDetails.socialLinks
                        .filter(
                            (s) =>
                                (s?.profile && s.profile !== "Unknown") ||
                                (s?.url && s.url !== "Unknown") ||
                                (s?.discription && s.discription !== "Unknown")
                        )
                        .map((s, index) => (
                            <Card key={index}>
                                {s?.profile && s.profile !== "Unknown" && (
                                    <Item label="Profile" value={s.profile} />
                                )}
                                {s?.url && s.url !== "Unknown" && <Item label="URL" value={s.url} />}
                                {s?.discription && s.discription !== "Unknown" && (
                                    <Item label="Description" value={s.discription} />
                                )}
                            </Card>
                        ))
                        .length > 0 ? null : <Empty />
                    }
                 </Section>
                )}
           


        </div>
    );
}

// 🔹 Reusable Components
const Section = ({ title, children }) => (
    <section>
        <h2 className="text-[14px] font-semibold mb-4 ">{title}</h2>
        {children}
    </section>
);

const Card = ({ children }) => (
    <div className="bg-gray-50 rounded-md space-y-1 text-[14px] text-gray-700 mb-2">{children}</div>
);

const Item = ({ label, value }) => (
    <div><span className="font-medium">{label}:</span> {value || ""}</div>
);

const Grid = ({ children }) => (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-[14px] text-gray-700">{children}</div>
);

const Empty = () => (
    <div className="text-[14px] text-gray-500">No data found.</div>
);
