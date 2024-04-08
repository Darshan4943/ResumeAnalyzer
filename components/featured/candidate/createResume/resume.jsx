import Fonts from "../../../../public/fonts/fonts";
import MiniLoader from "../../../common/miniLoader";

const { Document, PDFViewer } = require("@react-pdf/renderer");
const { default: Template1 } = require("../../resumeTemplates/Template1");
<Fonts />;

export const MyComponent = ({ data, selectedColor, selectedFont }) => {
  return (
    <Document height="1124px" dpi={72}>
      <Template1
        data={data}
        selectedColor={selectedColor}
        selectedFont={selectedFont}
      />
    </Document>
  );
};

const Preview = ({ data, selectedColor, selectedFont, loading }) => {
  return (
    <div
      className=" w-full flex items-center justify-center mt-3 bg-[#525659] py-[24px] rounded-[8px] min-h-[700px]"
      style={{
        transformOrigin: "top left",
      }}
    >
      {loading ? (
        <div>
          <MiniLoader />
        </div>
      ) : (
        <PDFViewer width="80%" height="900px" showToolbar={false}>
          <MyComponent
            data={data}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
          />
        </PDFViewer>
      )}
    </div>
  );
};
export default Preview;
