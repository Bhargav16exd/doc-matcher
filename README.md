# Invoice Document Similarity Application

This application utilizes a deep learning model to compare and find similar invoices. Users can upload invoice documents, which are stored in an in-memory database and compared against existing entries.

## Document Representation Method

The application employs Sentence Transformers, a library built upon pre-trained transformer models, to represent documents. Sentence transformers convert textual data into numerical vectors, known as embeddings. These embeddings capture the semantic meaning of the text, allowing for similarity comparisons between documents. In this application, the `all-MiniLM-L6-v2` model is specifically used for this purpose.



## Similarity Metric

Cosine similarity is utilized to measure the similarity between invoice embeddings. Cosine similarity calculates the angle between two vectors in a high-dimensional space. The closer the cosine similarity value is to 1, the more similar the documents are.

## Running the Application

### Prerequisites:

- Python 3.6 or later
- pip

### Installation:

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies using the following command:

    ```bash
    
    pip install fastapi sentence-transformers fitz[optional]
    ```

### Starting the Server:

Run the following command to start the FastAPI server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
###

This will start the server on port 8000. You can access the API endpoints at http://localhost:8000/docs.

## Using the API

The application provides two API endpoints:

#### /upload (POST):
 This endpoint accepts an invoice document as a file upload. The document is stored in the in-memory database after text extraction and feature generation.

#### /compare-invoice (POST):
 This endpoint accepts an invoice document for comparison. The document's features are extracted, and cosine similarity is calculated against all invoices in the database. The response includes the most similar invoice filename and the overall similarity score.

### Frontend Integration (Vite)


Create a New React Project Using Vite:
```bash
npm init vite@latest frontend
```
Navigate to the Project Directory:

```bash
cd frontend
```

Install Required Dependencies:
``` bash
npm install 
```


## API Documentation

The application provides two primary API endpoints for handling invoice documents: `/upload` and `/compare-invoice`.

### Endpoints

#### 1. Upload Invoice

**Endpoint:** `/upload`

**Method:** `POST`

**Description:** This endpoint accepts an invoice document as a file upload. The document is stored in the in-memory database after text extraction and feature generation.

**Request:**

- **Headers:**
  - `Content-Type: multipart/form-data`

- **Body:**
  - `file`: The invoice document file to be uploaded.

**Response:**

- **Status Code:** `200 OK`
- **Body:**
  - `message`: Confirmation message indicating successful upload.
  - `filename`: The name of the uploaded file.

**Example Request:**

```bash
curl -X POST "http://localhost:8000/upload" \
-H "accept: application/json" \
-H "Content-Type: multipart/form-data" \
-F "file=@path/to/invoice.pdf"
```

**Example Response:**

```bash
{
  "message": "File uploaded successfully.",
  "filename": "invoice.pdf"
}

```

#### 2. Compare Invoice

**Endpoint:** `/compare-invoice`

**Method:** `POST`

**Description:** This endpoint accepts an invoice document for comparison. The document's features are extracted, and cosine similarity is calculated against all invoices in the database. The response includes the most similar invoice filename and the overall similarity score.

**Request:**

- **Headers:**
  - `Content-Type: multipart/form-data`

- **Body:**
  - `file`: invoice document file to be compared.

**Response:**

- **Status Code:** `200 OK`
- **Body:**
  - `similarity_score`: The similarity score between the uploaded invoice and the most similar invoice.
  - `filename`: The name of the most similar invoice in the database.

**Example Request:**

```bash
curl -X POST "http://localhost:8000/compare-invoice" \
-H "accept: application/json" \
-H "Content-Type: multipart/form-data" \
-F "file=@path/to/invoice.pdf"
```

**Example Response:**

```bash
{
  "filename": "similar_invoice.pdf",
  "similarity_score": 0.95
}

```
###

## Error handling
Both endpoints provide appropriate error messages and status codes in case of failures. Below are some common errors:

**400 Bad Request: Missing or invalid file upload.**

**500 Internal Server Error: Server-side error during processing.**

###

#### Example Error Response
```bash
{
  "detail": "Invalid file format."
}
```

### Final Output 
Providing the documents it returns the similarity score of the most matched document and the document name which is similar

<img width="1512" alt="Screenshot 2024-07-31 at 11 22 38 AM" src="https://github.com/user-attachments/assets/bf8f874a-540d-43cf-bad6-6a06cab5e98e">




