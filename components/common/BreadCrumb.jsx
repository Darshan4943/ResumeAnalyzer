import ALink from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('?')[0].split('/').filter((segment) => segment !== '');

  const queryParams = new URLSearchParams(router.asPath.split('?')[1] || '');


  const breadcrumbMapping = {
    dashboard: 'Home',
    JobPosting: 'Job Posting',
    'JobPosting?content=CreateNewJob': 'Create New Job',
    'ClientDetail': 'Candidate Details',
    "CreateNewClient":"Create New Candidate",
    "CandidateResumeDetails":"Create Resume",
    "BuildResume":"Create Resume",
    "createResume":"Create Resume",
    'Requisition?content=CreateNewRequisition': 'Create New Requisition',
    'Hiring?content=ApplicantDetails': 'Applicant Details',
    'BulkUploads?content=ApplicantDetails': 'Applicant Details',
    BulkUploads: 'Bulk Uploads',
  };

 
  const breadcrumbItems = (pathSegments.length > 1 
    ? pathSegments.slice(1) 
    : pathSegments
  ).map((segment, index) => {
    const fullPath = `/${pathSegments.slice(0, pathSegments.length > 1 ? index + 2 : index + 1).join('/')}`;
  
    if (segment === 'JobPost' && queryParams.get('id')) {
      return {
        label: 'Job Post',
        path: fullPath,
      };
    }
    if (segment === 'CreateNewClient' && queryParams.get('id')) {
      return {
        label: 'Update Candidate',
        path: fullPath,
      };
    }
  
    if (segment === 'ApplicantDetails' && queryParams.get('id')) {
      return {
        label: 'Applicant Details',
        path: fullPath,
      };
    }
  
    return {
      label: breadcrumbMapping[segment] || segment,
      path: fullPath,
    };
  });
  
  
  
  return (
    <nav className=" py-6">
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
