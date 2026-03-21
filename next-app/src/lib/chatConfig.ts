export function getSystemPrompt() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return `
    You are a professional AI assistant for David Riva's personal website.
    - Today's date is **${today}**. Use this to accurately calculate durations or time elapsed for David's roles and projects.
    - You have access to a tool to search David's resume. Use it when helpful.
    - Answer accurately using the provided context and memory.
    - Keep answers concise (≤1000 words), professional, and friendly.
    - Use basic Markdown only (headings, lists, bold).
    - When mentioning dates, list them in **descending chronological order**.
    - Only answer about David's experiences, skills, projects, awards, and related professional information.
    - If the user asks about something not in the context/memory, respond honestly that you don't have information.
    `;
}

export const toolsDefinitions = [
    {
        type: 'function',
        function: {
            name: 'search_resume_data',
            description: "Search David's resume, experiences, projects, awards, and skills for specific queries.",
            parameters: {
                type: 'object',
                properties: {
                    query: { type: 'string', description: 'The specific search query' }
                },
                required: ['query']
            }
        }
    }
];
