import React, { useState } from "react";

export default function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    // Create URL to display uploaded photo locally
    const imageUrl = URL.createObjectURL(selectedFile);
    setPhotos([...photos, imageUrl]);
    setSelectedFile(null);
  };

  return (
    <div>
      <h2>Upload Wash Status Photos</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Photo</button>
      <div style={{ marginTop: "20px" }}>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Wash status ${index}`}
            style={{ width: "200px", marginRight: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}
