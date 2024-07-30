import fitz
from sentence_transformers import SentenceTransformer



#model initialization
model = SentenceTransformer('all-MiniLM-L6-v2')


# text extraction using fitz library
def textExtractor(filePath):
    text = ""
    doc = fitz.open(filePath)
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()
    return text

# embedding 
def extract_features(text):
    features = {}
    features['embedding'] = model.encode(text)
    return features


