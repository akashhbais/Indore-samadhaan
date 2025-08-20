from transformers import BertTokenizer, BertForSequenceClassification
import torch

class TriageEngine:
    """
    A class to load a fine-tuned BERT model and predict complaint departments.
    """
    def __init__(self, model_path: str):
        """
        Loads the tokenizer and model from the specified path.
        """
        try:
            self.tokenizer = BertTokenizer.from_pretrained(model_path)
            self.model = BertForSequenceClassification.from_pretrained(model_path)
            # This map converts the model's integer output to a human-readable department name
            self.id2label = self.model.config.id2label
            self.model.eval()
            print(f"TriageEngine: Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Error loading model from {model_path}: {e}")
            self.tokenizer = None
            self.model = None
            self.id2label = {0: "Miscellaneous / Out-of-Scope"} # Fallback

    def predict(self, description: str) -> str:
        """
        Predicts the department NAME (string) using the loaded BERT model.
        """
        if not self.model or not self.tokenizer:
            print("TriageEngine: Model not loaded. Returning default department.")
            return "Miscellaneous / Out-of-Scope"

        inputs = self.tokenizer(description, return_tensors="pt", truncation=True, padding=True, max_length=512)
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        logits = outputs.logits
        predicted_class_id = torch.argmax(logits, dim=1).item()
        
        # Convert the predicted ID to its corresponding department name string
        predicted_class_name = self.id2label.get(predicted_class_id, "Miscellaneous / Out-of-Scope")
        
        return predicted_class_name
triage_engine = TriageEngine(model_path="./triage_engine/content/indore-grievance-classifier/triage_engine/")