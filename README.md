# Docuville - Internship Assignment

This project demonstrates a document capture prototype to extract essential information from a passport or driver's license. The extracted information includes the name, document number, and expiration date.

## Project Overview

This document capture solution processes and extracts crucial details from documents like passports and driver's licenses using publicly available images. **Core functionalities** include:
- **Document Data Extraction**: Extracts specified details from document images.
- **Basic Data Validation and Download**: Validates extracted data and provides options to download.

**Note**: This project does not use real documents and relies on sample images from publicly available sources.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Python with FastAPI
- **Additional Tools**:
  - OCR libraries (Tesseract) for text extraction from images
  - Google Colab for GPU support
  - PassportEye library for passport processing
  - Ngrok for generating a public URL for the API

## Installation

To set up the project locally, follow these steps:

### 1. Clone the Repository

Clone the project repository:

```bash
git clone https://github.com/BlackDevil559/Docuville.git
```

### 2. Navigate to the Project Directory

```bash
cd Docuville
```


### 3. Setting Up the Frontend

Navigate to the Frontend directory and install the necessary packages:

```bash
cd Frontend
npm install
```

### 4. Setting Up the Backend
Since the backend processing utilizes Google Colab, follow these steps:

(1) Upload Files: Upload Backend.ipynb and country_codes.json to Google Colab.

(2) Ngrok Setup: Replace the authentication token in the Colab notebook to enable the Ngrok tunnel.
```bash
ngrok.set_auth_token("Your_Authentication_Token")
```
This will make the backend accessible via a public URL.

### 5. Start the React App
(1) Update API URL: Replace the API URL in Frontend/src/components/ChatView.jsx with the Ngrok-hosted URL generated from Google Colab.

(2) Run the App: Start the React development server.

```bash
npm run dev
```
## Testing and Usage
After setup, you can test the application by uploading sample document images. The app will display extracted details, validate the data, and provide an option for downloading the results.

