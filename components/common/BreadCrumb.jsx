import ALink from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');

  const breadcrumbItems = [

    ...pathSegments.slice(1).map((segment, index) => ({
      label: segment === 'dashboard' ? 'Home' : segment === 'JobPosting' ? 'Job Posting' : segment === "JobPosting?content=CreateNewJob" ? "Create New Job" : segment === "Requisition?content=CreateNewRequisition" ? "Create New Requisition" : segment === "Hiring?content=JobPost" ? "Job Post" : segment === "Hiring?content=ApplicantDetails" ? "Applicant Details" : segment === "BulkUploads?content=ApplicantDetails" ? "Applicant Details" : segment === "BulkUploads" ? "Bulk Uploads" : segment,
      path: `/${pathSegments.slice(0, index + 2).join('/')}`,
    })),
  ];
  {console.log(breadcrumbItems)}
  return (
    <nav className=" pt-6">
      <ol className="flex gap-2 items-center">
        <li className="breadcrumb-item text-[#333333]">
          Skilotech
        </li>
        {breadcrumbItems.map((item, index) => (
          
          <li key={index} className={`breadcrumb-item  text-[#333333] ${
            index === breadcrumbItems?.length - 1 ? "font-semibold" : "font-medium"
          }`}>
            <ALink href={item.path}>
              {/* <span>{item.label}</span> */}
              <span class="breadcrumb-separator leading-4">
               
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g mask="url(#mask0_6706_81040)">
                    <path d="M10.4646 7.78125L6.46458 11.7812L5.53125 10.8479L8.59792 7.78125L5.53125 4.71458L6.46458 3.78125L10.4646 7.78125Z" fill="#495057" />
                  </g>
                </svg>
                {item.label}
              </span>

            </ALink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
