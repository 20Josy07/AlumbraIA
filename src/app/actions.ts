
'use server';

// Remove fs and path as they are no longer needed for local file saving
// import fs from 'fs/promises';
// import path from 'path';
import { analyzeConversation, type AnalyzeConversationInput, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import type { QuestionnaireData, UserDetailsData } from '@/lib/schemas'; // FeedbackData removed from here
import { db } from '@/lib/firebase'; // Import Firestore instance
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Firestore functions
import type { User } from 'firebase/auth';

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

// Interface for the data passed to handleFeedbackSubmission
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

// Rewritten to save to Firestore
export async function handleFeedbackSubmission(data: FeedbackSubmissionData): Promise<FeedbackActionResult> {
  if (!data.feedbackText || data.feedbackText.trim() === "") {
    return { success: false, error: "El comentario no puede estar vacío." };
  }
  if (!data.userId) {
    return { success: false, error: "Se requiere información de usuario para enviar comentarios."}
  }

  try {
    const reviewData = {
      userId: data.userId,
      userName: data.userName || "Anónimo", // Default to Anónimo if name is null
      userPhotoURL: data.userPhotoURL,
      text: data.feedbackText,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "reviews"), reviewData);

    return { success: true, message: 'Comentario guardado con éxito.' };

  } catch (e) {
    console.error("Error saving feedback to Firestore (server action):", e);
    let errorMessage = 'Ocurrió un error inesperado al guardar tu comentario.';
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === 'string') {
      errorMessage = e;
    } else if (e && typeof (e as any).toString === 'function') {
      // Try to get a string representation if it's an unknown object
      errorMessage = (e as any).toString();
    }
    // Ensure the error message doesn't become too long or complex for the response
    if (errorMessage.length > 200) {
        errorMessage = errorMessage.substring(0, 200) + "... (truncated)";
    }
    return { success: false, error: `Error al guardar el comentario: ${errorMessage}` };
  }
}

// New interface for Review data structure
export interface Review {
  id: string;
  userId: string;
  userName: string | null;
  userPhotoURL: string | null;
  text: string;
  createdAt: number; // Store as number (timestamp) for easier client-side handling
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
        // Convert Firestore Timestamp to number (milliseconds since epoch)
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

