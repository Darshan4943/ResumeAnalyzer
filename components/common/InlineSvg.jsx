import { useEffect, useState } from "react";

const InlineSVG = ({ imageUrl }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    fetch(imageUrl)
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, [imageUrl]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      className="w-[180px] h-[100px]"
    />
  );
};

export default InlineSVG;
