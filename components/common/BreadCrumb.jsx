import ALink from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');
 
  const breadcrumbItems = [
   
    ...pathSegments.slice(2).map((segment, index) => ({
      label: segment === 'EmployerHome' ? 'Home' : segment === 'JobPosting' ? 'Job Posting' : segment=== "JobPosting?content=CreateNewJob" ? "Create New Job" :segment === "Requisition?content=CreateNewRequisition" ?"Create New Requisition" :segment === "Hiring?content=JobPost" ?"Job Post" :segment === "Hiring?content=ApplicantDetails" ?"Applicant Details" :segment === "BulkUploads?content=ApplicantDetails" ?"Applicant Details" :segment  === "BulkUploads" ?"Bulk Uploads" :segment,
      path: `/${pathSegments.slice(0, index + 3).join('/')}`,
    })),
  ];
  
  return (
    <nav className=" pb-4 pt-6">
      <ol className="flex">
        <li className="breadcrumb-item text-[#333]">
            Skilotech
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="breadcrumb-item text-[#646464]">
            <ALink href={item.path}>
              <span>{item.label}</span>
            </ALink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
