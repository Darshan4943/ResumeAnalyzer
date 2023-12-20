import ALink from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');
 
  const breadcrumbItems = [
   
    ...pathSegments.slice(2).map((segment, index) => ({
      label: segment === 'EmployerHome' ? 'Home' : segment === 'JobPosting' ? 'Job Posting' : segment=== "?content=CreateNewJob" ? "Create New Job" :segment === "?content=CreateNewRequisition" ?"Create New Requisition" :segment === "?content=JobPost" ?"Job Post" :segment === "?content=ApplicantDetails" ?"Applicant Details" :segment,
      path: `/${pathSegments.slice(0, index + 3).join('/')}`,
    })),
  ];
  
  return (
    <nav className="mb-6 mt-[-2rem]">
      <ol className="flex">
        <li className="breadcrumb-item text-[#333]">
            Skilotech
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            <ALink href={item.path}>
              <a>{item.label}</a>
            </ALink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
