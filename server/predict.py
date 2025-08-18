import torch
from transformers import BertTokenizer, BertForSequenceClassification
import json
import os

class GrievanceClassifier:
    def __init__(self, model_path):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model = BertForSequenceClassification.from_pretrained(model_path)
        self.model.to(self.device)
        self.model.eval()

        with open(os.path.join(model_path, 'label_maps.json'), 'r') as f:
            label_maps = json.load(f)
        self.id2label = {int(k): v for k, v in label_maps['id2label'].items()}
        print(f"Grievance Classifier loaded from {model_path} on device {self.device}")

    def predict(self, text, confidence_threshold=0.70):
        encoding = self.tokenizer.encode_plus(text, add_special_tokens=True, max_length=128, padding='max_length', return_attention_mask=True, return_tensors='pt', truncation=True)
        input_ids = encoding['input_ids'].to(self.device)
        attention_mask = encoding['attention_mask'].to(self.device)

        with torch.no_grad():
            outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)

        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)[0]
        confidence, prediction_idx = torch.max(probabilities, dim=-1)

        department = self.id2label[prediction_idx.item()]
        score = confidence.item()

        human_review_flag = score < confidence_threshold

        return {
            'department': department,
            'confidence': score,
            'needs_human_review': human_review_flag
        }

# --- How to use the new class ---
if __name__ == '__main__':
    # Point to your absolute best, final model
    classifier = GrievanceClassifier(model_path='triage_engine') 

    complaint = "Hamare ghar mein bijli nahi hai aur humne baar baar complaint ki hai lekin koi sunwai nahi ho rahi hai."  

    result = classifier.predict(complaint)
    print(f"\nComplaint: '{complaint}'")
    print(f"--> Prediction: {result}")