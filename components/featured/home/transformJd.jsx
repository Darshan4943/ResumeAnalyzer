import { Document, PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import Template1 from '../resumeTemplates/Template1'

function TransformJd({ selectedResumeIndex, data, selectResumeTemplate }) {

    return (
        <div>
            {selectedResumeIndex !== undefined && (

                <div className="w-full h-full flex items-center justify-center">
                    <PDFViewer width="90%" height="980px"  showToolbar={false}>
                        <Document width="80%" height="100%" >
                         
                            {selectResumeTemplate(selectedResumeIndex)}
                        </Document>
                    </PDFViewer>
                </div>
            )}
        </div>
    )
}

export default TransformJd
