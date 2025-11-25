import { GoogleGenAI } from "@google/genai";
import { RESEARCH_POSTS, PROJECTS, AUTHOR_PROFILE } from "../constants";

// Construct a system context based on the site's content
const SITE_CONTEXT = `
You are the AI Research Assistant for hackwith.me, the personal website of ${AUTHOR_PROFILE.role}, ${AUTHOR_PROFILE.socials.website}.
The user is ${AUTHOR_PROFILE.socials.website}.

BIO DATA:
${JSON.stringify(AUTHOR_PROFILE, null, 2)}

You have access to the author's research papers and project list.
Answer questions based on the following data:

Research Papers:
${RESEARCH_POSTS.map(p => `- Title: ${p.title} (${p.date})\n  Summary: ${p.summary}\n  Content snippet: ${p.content}`).join('\n')}

Projects:
${PROJECTS.map(p => `- Name: ${p.name} (${p.status})\n  Description: ${p.description}`).join('\n')}

Your tone should be:
1. Academic but accessible.
2. Minimalist and direct (concise).
3. Slightly technical.

If asked about something not in this data, state that you don't have that information in the current research context, but offer to answer general engineering questions using your general knowledge.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const streamResearchResponse = async (
  userMessage: string, 
  onChunk: (text: string) => void
) => {
  const client = getClient();

  try {
    const response = await client.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SITE_CONTEXT,
        thinkingConfig: { thinkingBudget: 0 } // Low latency for chat
      }
    });

    for await (const chunk of response) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n[System Error: Unable to access research mainframe.]");
  }
};