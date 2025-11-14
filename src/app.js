document.getElementById('generator-form').addEventListener('submit',async function(event) {
    event.preventDefault();
    const type= document.getElementById('type').value;
    const instructions=document.getElementById('instructions').value.trim();
    const output=document.getElementById('output');

    if(!instructions) {
        output.textContent= 'Please enter your instructions.';
        return;
    }

    output.textContent='Generating...';

    try{
        const generatedContent=await generateContent(type, instructions);
        output.textContent=generatedContent;
    }   catch(error){
            output.textContent='Error generating content. Please try again'
            console.error(error);
    }
});

async function generateContent(type, instructions) {
    const prompt=`Generate a ${type} based on the following instructions:${instructions}`;
    const context='Provide a creative and relevant response';
    const key= '823e0f24b43f6a7dbat32b0c74o240bf'
    const url= `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${key}`;

    const response= await fetch(url);
    if (!response.ok) {
        throw new Error ('API request failed');
    }
    const data= await response.json();
    return data.answer|| ' No response from AI.';
}
    
