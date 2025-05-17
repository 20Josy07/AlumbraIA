
'use server';

import { analyzeConversation, type AnalyzeConversationInput, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import type { QuestionnaireData, UserDetailsData } from '@/lib/schemas'; 
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore'; 

interface AnalysisActionResult {
  data?: AnalyzeConversationOutput;
  error?: string;
}

export async function handleConversationAnalysis(conversationText: string): Promise<AnalysisActionResult> {
  if (!conversationText || conversationText.trim() === "") {
    return { error: "Conversation text cannot be empty." };
  }

  try {
    const input: AnalyzeConversationInput = { conversationText };
    const result = await analyzeConversation(input);
    return { data: result };
  } catch (e) {
    console.error("Error analyzing conversation:", e);
    if (e instanceof Error) {
        if (e.message.includes('DEADLINE_EXCEEDED') || e.message.includes('unavailable')) {
             return { error: "The analysis service is currently unavailable or timed out. Please try again later." };
        }
        return { error: "An error occurred during analysis. Please check the input or try again." };
    }
    return { error: "An unexpected error occurred during analysis." };
  }
}

interface QuestionnaireActionResult {
  success?: boolean;
  error?: string;
  data?: QuestionnaireData;
}

export async function handleQuestionnaireSubmission(data: QuestionnaireData): Promise<QuestionnaireActionResult> {
  try {
    console.log('Questionnaire data received:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, data };
  } catch (e) {
    console.error("Error submitting questionnaire:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `Failed to submit questionnaire: ${errorMessage}` };
  }
}


interface UserDetailsActionResult {
  success?: boolean;
  error?: string;
  data?: UserDetailsData;
}

export async function handleUserDetailsSubmission(data: UserDetailsData): Promise<UserDetailsActionResult> {
  try {
    console.log('User details received:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, data };
  } catch (e) {
    console.error("Error submitting user details:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `Failed to submit user details: ${errorMessage}` };
  }
}

interface FeedbackSubmissionData {
  feedbackText: string;
  userId: string;
  userName: string | null;
  userPhotoURL: string | null;
}

interface FeedbackActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function handleFeedbackSubmission(data: FeedbackSubmissionData): Promise<FeedbackActionResult> {
  console.log("SERVER_ACTION_LOG: handleFeedbackSubmission invoked with data:", JSON.stringify(data, null, 2));

  if (!data.feedbackText || data.feedbackText.trim() === "") {
    console.error("SERVER_ACTION_ERROR: Feedback text is empty.");
    return { success: false, error: "El comentario no puede estar vacío." };
  }
  if (!data.userId) {
    console.error("SERVER_ACTION_ERROR: User ID is missing.");
    return { success: false, error: "Se requiere información de usuario para enviar comentarios."}
  }

  try {
    const reviewData = {
      userId: data.userId,
      userName: data.userName || "Anónimo", 
      userPhotoURL: data.userPhotoURL,
      text: data.feedbackText,
      createdAt: serverTimestamp(),
    };

    console.log("SERVER_ACTION_LOG: Firestore db instance:", db ? "Exists" : "DOES NOT EXIST - CRITICAL");
    if (db && db.app && db.app.options) {
      console.log("SERVER_ACTION_LOG: Firestore db associated projectId:", db.app.options.projectId);
    } else {
      console.log("SERVER_ACTION_LOG: Cannot log projectId, db or db.app.options is not fully available.");
    }
    console.log("SERVER_ACTION_LOG: Attempting to add document to 'reviews' collection with data:", JSON.stringify(reviewData, null, 2));

    const docRef = await addDoc(collection(db, "reviews"), reviewData);

    console.log("SERVER_ACTION_LOG: Document written with ID: ", docRef.id);
    return { success: true, message: 'Comentario guardado con éxito.' };

  } catch (e: any) {
    console.error("SERVER_ACTION_ERROR: Error saving feedback to Firestore:", e);
    let errorMessage = 'Ocurrió un error inesperado al guardar tu comentario.';
    
    if (e && typeof e.message === 'string') {
      errorMessage = e.message;
    } else if (typeof e === 'string') {
      errorMessage = e;
    }
    
    // Log the full error structure for more details if available
    if (typeof e === 'object' && e !== null) {
        console.error("SERVER_ACTION_ERROR_DETAILS:", JSON.stringify(e, Object.getOwnPropertyNames(e)));
    }

    // Ensure the error message doesn't become too long or complex for the response
    if (errorMessage.length > 200) {
        errorMessage = errorMessage.substring(0, 200) + "... (truncated)";
    }
    return { success: false, error: `Error al guardar el comentario: ${errorMessage}` };
  }
}

export interface Review {
  id: string;
  userId: string;
  userName: string | null;
  userPhotoURL: string | null;
  text: string;
  createdAt: number; 
}

interface GetReviewsResult {
  reviews?: Review[];
  error?: string;
}

export async function getReviews(): Promise<GetReviewsResult> {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("createdAt", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
        text: data.text,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(), 
      });
    });
    return { reviews };
  } catch (e) {
    console.error("Error fetching reviews:", e);
    const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado al obtener los comentarios.';
    return { error: errorMessage };
  }
}
