export interface SuggestionModel {
  id?: string;
  
  title: string;
  slug: string;
  suggestiveId: string;
  
  description?: string;
  
  created_at?: string;
  updated_at?: string;
}