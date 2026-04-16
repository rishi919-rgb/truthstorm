console.log('=== Google Gemini API Key Update Guide ===\n');

console.log('CURRENT ISSUE:');
console.log('Your API key was reported as leaked and blocked by Google.\n');

console.log('SOLUTION STEPS:');
console.log('1. Go to: https://aistudio.google.com/app/apikey');
console.log('2. Sign in with your Google account');
console.log('3. Click "Create API Key"');
console.log('4. Copy the new API key');
console.log('5. Paste it only into backend/.env or your hosting provider env vars');
console.log('6. Restart the backend server\n');

console.log('SAFETY NOTES:');
console.log('- Do not pass API keys on the command line. Shell history and screenshots can expose them.');
console.log('- Do not commit API keys to git, test files, or helper scripts.');
console.log('- For production, update GEMINI_API_KEY in your hosting dashboard and redeploy/restart.\n');
