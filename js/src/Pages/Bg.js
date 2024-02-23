import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function RemoveBackground() {
  const [image, setImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);

  const handleRemoveBackground = async () => {
    const apiKey = 'NDUL54g4njchF9LujrfQGpTC';
    const apiUrl = 'https://api.remove.bg/v1.0/removebg';

    const formData = new FormData();
    formData.append('image_file', image, image.name);
    formData.append('size', 'auto');

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'X-api-key': apiKey
        },
        body: formData
      });

      const data = await res.blob();

      const reader = new FileReader();
      reader.onloadend = () => setBgRemove(reader.result);
      reader.readAsDataURL(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <div className="">
          {/* Input  */}
          <h2>Background Remove</h2>
          <div className="form-group">
            {/* Input Tag  */}
            <div className="form-control mb-5">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control-file"
              />
            </div>
          </div>

          {/* Output  */}
          <div className="d-flex gap-1 mb-5">
            {image && (
              <div className="border border-secondary rounded-start d-flex justify-content-center p-2 w-40 lg:w-80">
                <img className="w-90 h-90" src={image ? URL.createObjectURL(image) : ''} alt="img" />
              </div>
            )}

            {bgRemove && (
              <div className="border border-secondary rounded-end d-flex justify-content-center p-2 w-40 lg:w-80">
                <img className="w-90 h-90" src={bgRemove} alt="img" />
              </div>
            )}
          </div>

          {/* Remove Background Button  */}
          <div className="d-flex justify-content-center mb-5">
            <Button
              type="button"
              onClick={handleRemoveBackground}
              className="btn btn-primary"
            >
              Remove Background
            </Button>
          </div>

          {/* Download button  */}
          {bgRemove && (
            <div className="d-flex justify-content-center mb">
              <a className='w-full' href={bgRemove} download={'save.png'}>
                <Button className='btn btn-primary'>
                  Download
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}