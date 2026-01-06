
"use server";

// We are using raw fetch to avoid SDK version conflicts
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateTestCases(requirement: string) {
    try {
        // Using 'gemini-flash-latest' as it was explicitly found in the list_models output
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `
                        Act as a Senior QA Automation Engineer.
                        Generate a COMPREHENSIVE and DETAILED list of Test Cases (Minimum 20+) for: "${requirement}".
                        
                        Cover the following categories exhaustively:
                        1. Positive Flows (Happy Path)
                        2. Negative Flows (Error Handling)
                        3. Edge Cases (Boundary Values, Empty States)
                        4. Security Scenarios (SQLi, XSS, Auth)
                        5. Performance & Usability
                        
                        Output Format:
                        [
                            { "id": "TC01", "scenario": "...", "type": "Positive", "expected": "..." }
                        ]
                        
                        IMPORTANT: Output RAW JSON only. No markdown formatting.
                        `
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "API Request Failed");
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

        // Cleanup markdown if present
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanJson);

    } catch (error: any) {
        console.error("AI Generation Failed:", error);
        return { error: `Failed: ${error?.message || "Unknown error"}` };
    }
}
