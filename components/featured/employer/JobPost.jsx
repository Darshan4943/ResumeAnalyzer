import { useRouter } from 'next/router';


function JobPost({toggleContentt}) {
   
  return (
    <div onClick={toggleContentt}>
      JobPost
    </div>
  )
}

export default JobPost
