import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Component2 from "./Component2";

const ResizeImage = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  // The selectImage function is defined to update the src state with the URL of the selected image file using the URL.createObjectURL method.
  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  // The cropImageNow function is defined to perform the image cropping operation. It creates a canvas element and sets its width and height based on the crop state. it then gets the canvas context and draws the cropped portion of the image onto the canvas using the drawImage method
  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    //it converts the canvas image to a base64-encoded JPEG format using the toDataURL method and sets the result in the result state.
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  };

  return (
    <div className="App">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            selectImage(e.target.files[0]);
          }} //The file input element allows the user to select an image file, and the onChange event handler calls the selectImage function to update the src state with the URL of the selected image.
        />
        <div>
          {src && (
            <div>
              <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                <img src={src} onImageLoaded={setImage} alt="img" />
              </ReactCrop>
              {/* The image crop selection tool is created using the ReactCrop component from the react-image-crop library.*/}
              <button onClick={cropImageNow}>Crop</button>
            </div>
          )}

          <div>x-coordinate: {crop.x}</div>
          <div>y-coordinate: {crop.y}</div>
          <hr />

          <div>Height: {crop.height}</div>
          <div>Width: {crop.width}</div>
        </div>
        <div>  
        {/* The preview of the cropped image is displayed if the result state is not null. */}
          {result && (
            <div>
              <img src={result} alt="Cropped" />
            </div>
          )}
        </div>
      </div>
      <hr />
      <hr />
      <Component2 crop={crop} />
    </div>
  );
};

export default ResizeImage;
