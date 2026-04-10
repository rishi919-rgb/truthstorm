console.log('=== Google Gemini API Key Update Guide ===\n');

console.log('CURRENT ISSUE:');
console.log('Your API key was reported as leaked and blocked by Google.\n');

console.log('SOLUTION STEPS:');
console.log('1. Go to: https://aistudio.google.com/app/apikey');
console.log('2. Sign in with your Google account');
console.log('3. Click "Create API Key"');
console.log('4. Copy the new API key');
console.log('5. Run: node update-api-key.js YOUR_NEW_API_KEY\n');

console.log('COMMAND TO UPDATE:');
console.log('node update-api-key.js AIzaSyYOUR_NEW_API_KEY_HERE\n');

// Check if user provided API key as argument
const args = process.argv.slice(2);
if (args.length > 0) {
    const newApiKey = args[0];
    console.log(`\nUpdating API key to: ${newApiKey.substring(0, 20)}...`);
    
    const fs = require('fs');
    try {
        // Read current .env file
        const envContent = fs.readFileSync('.env', 'utf8');
        
        // Update API key
        const updatedContent = envContent.replace(
            /GEMINI_API_KEY=.*/,
            `GEMINI_API_KEY=${newApiKey}`
        );
        
        // Write back to .env
        fs.writeFileSync('.env', updatedContent);
        
        console.log('API key updated successfully!');
        console.log('Please restart the backend server to apply changes.');
        console.log('Run: taskkill /F /IM node.exe && start_all_enhanced.bat');
        
    } catch (error) {
        console.error('Error updating API key:', error.message);
    }
}
