import React from 'react'
import CoverLetter4 from './letters/CoverLetter4'
import CoverLetter6 from './letters/CoverLetter6'
import CoverLetter2 from './letters/CoverLetter2'

function CoverPreview({data}) {
  return (
    <div>
   
            <CoverLetter2
              data={data}
            
            />
   
    </div>
  )
}

export default CoverPreview
