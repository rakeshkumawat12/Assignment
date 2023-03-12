import React from "react";
import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Component2 = (props) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({})
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  
  const selectImage = (file) => { 
    setSrc(URL.createObjectURL(file));
  };    

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = props.crop.width;
    canvas.height = props.crop.height;
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
    
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          selectImage(e.target.files[0]);
        }}
      />
      <div>
        {src && (
          <div>
            <ReactCrop crop={crop} onChange={setCrop}>
              <img src={src} onImageLoaded={setImage} alt="img" />
            </ReactCrop>
            <button onClick={cropImageNow}>Crop</button>
          </div>
        )}
        <div>Height: {props.crop.height}</div>
        <div>Width: {props.crop.width}</div>  
         {/* This will render the height and width values of the current crop selection in the parent component. */}
      </div>
    </div>
  );
};

export default Component2;
