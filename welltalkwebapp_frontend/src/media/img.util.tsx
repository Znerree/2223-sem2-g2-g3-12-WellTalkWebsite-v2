import React, { useEffect, useState } from "react";

const ImageComponent = () => {
  const [decodedImage, setDecodedImage] = useState("");

  useEffect(() => {
    // Assuming you have a base64 string
    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

    // Decode the base64 string
    const decodedImage = atob(base64Image.split(",")[1]);

    // Set the decoded image to state
    setDecodedImage(decodedImage);
  }, []);

  return (
    <div>
      {/* Display the decoded image */}
      <img src={`data:image/png;base64,${decodedImage}`} alt="Decoded Image" />
    </div>
  );
};

export default ImageComponent;
