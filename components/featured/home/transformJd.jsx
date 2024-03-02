import { Document, PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import Template1 from '../resumeTemplates/Template1'

function TransformJd({selectedResumeIndex,data,selectResumeTemplate}) {
  
  return (
    <div>
      {selectedResumeIndex !== undefined && (
            <div
              className="   "
              style={{
                // width: "78.7rem",
                // scale: "0.65",
                transformOrigin: "top left",
              }}
            >
              <PDFViewer width="100%" height="1160px">
                <Document height="1124px">
                  {/* <Template1 data={data} selectedColor={data.selectedColor} selectedFont={data.selectedFont} /> */}
                  {selectResumeTemplate(selectedResumeIndex)}
                </Document>
              </PDFViewer>
            </div>
          )}
    </div>
  )
}

export default TransformJd
