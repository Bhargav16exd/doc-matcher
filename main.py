from fastapi import FastAPI , Path , UploadFile ,File
from fastapi.responses import JSONResponse
from sentence_transformers import    util
from fastapi.middleware.cors import CORSMiddleware
from utils import  extract_features, textExtractor
import os

app = FastAPI()
database = []

origins = [
    "http://localhost",
    "http://localhost:5173",  
    "http://localhost:8000",  

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


    
# Uploading API to get training document form the user and pushing into DB
@app.post('/upload')
async def upload(file : UploadFile = File(...)):
    
    
    data = await file.read()
    with open(f'inputs/{file.filename}','wb') as f:
        f.write(data)
    

    #text extraction 
    extractedText = textExtractor(f'inputs/{file.filename}')
    
    #converting into numric values
    features = extract_features(extractedText)

    
    features['text'] = extractedText
    features['filename'] = f'inputs/{file.filename}'

    database.append(features)
    
    #removing file from local storage
    os.remove(f'inputs/{file.filename}') 

    return {"message": "Invoice added to database"}



# Compare API recieves a document and compare it with the documents the DB
@app.post('/compare-invoice')
async def compare(file: UploadFile = File(...)):


    # Save the uploaded file
    data = await file.read()
    file_path = f'inputs/{file.filename}'
    with open(file_path, 'wb') as f:
        f.write(data)

     
    #text extraction of the document recieved for comparison
    extractedText = textExtractor(file_path)

    #converting into numeric values
    features = extract_features(extractedText)


    if not database:
        return JSONResponse(content={"message": "Database is empty. Add invoices before performing similarity search."})

    
    #iteration over each data in DB and its cosine similarity calulation 
    similarities = []
    for db_invoice in database:

        #cosine similarity 
        content_similarity = util.cos_sim(features['embedding'], db_invoice['embedding'])[0][0].item()
        similarities.append((content_similarity, db_invoice['filename']))



    if similarities:

        #reverse sorting the content similarity such that highest value is returned
        similarities.sort(reverse=True, key=lambda x: x[0])
        best_match_similarity, best_match_filename = similarities[0]
        response = {
            "most_similar_invoice_filename": best_match_filename,
            "overall_similarity_score": best_match_similarity,
        }

        os.remove(f'inputs/{file.filename}') 
        
    else:
        response = {"message": "No similar invoices found"}

    return JSONResponse(content=response)


    
