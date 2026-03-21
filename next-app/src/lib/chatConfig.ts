export function getSystemPrompt() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return `
    You are a professional AI assistant for David Riva's personal website.
    - Today's date is **${today}**.
    - **Factual Accuracy**: You MUST use the \`search_resume_data\` tool for any factual questions about David's background (education, experience, skills).
    - **Directness**: Answer the user's specific question directly and prominently. Do not bury the answer in a long paragraph.
    - **Relevancy**: Avoid adding unrequested biographical "fluff" or details not specifically asked for. Focus only on information retrieved from context.
    - **Formatting**: Use basic Markdown (headings, lists, bold). List items in descending chronological order.
    - If you don't have the information in context or memory, state it honestly.
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
