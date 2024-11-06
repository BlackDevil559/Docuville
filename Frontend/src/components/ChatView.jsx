import { useState } from 'react';
import { FaSdCard } from 'react-icons/fa';
import axios from 'axios';
import DownloadButton from './DownloadButton'; // Make sure to adjust the path if needed

const ChatView = () => {
  const [image, setImage] = useState(null); // Stores the image preview URL
  const [extractedData, setExtractedData] = useState(null); // Stores extracted data from the API
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      setExtractedData(null);

      try {
        const response = await axios.post(

          // Replace the NGROK Hosted url here.
          'https://ab38-34-80-4-166.ngrok-free.app/extract_passport_data',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        if (response.data) {
          const dataWithNA = Object.fromEntries(
            Object.entries(response.data).map(([key, value]) => [key, value || 'N/A'])
          );
          setExtractedData(dataWithNA);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: '200px', height: '50px', border: '1px solid #ddd', borderRadius: '5px', justifyContent: 'center' }}>
          <span style={{ marginLeft: '8px' }}>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {image && (
          <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
            <img src={image} alt="Uploaded Preview" style={{ width: '100%', borderRadius: '10px' }} />
          </div>
        )}
      </div>

      {loading && <p>Loading...</p>}

      {extractedData && (
        <div style={{ overflowX: 'auto', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', border: 'solid' }}>
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              {Object.entries(extractedData).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', textAlign: 'left' }}>{key.replace(/_/g, ' ').toUpperCase()}</td>
                  <td style={{ padding: '10px', textAlign: 'left' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Download button below the table */}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <DownloadButton
              data={JSON.stringify(extractedData, null, 2)}
              filename="extracted_data.json"
              mime="application/json"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatView;
