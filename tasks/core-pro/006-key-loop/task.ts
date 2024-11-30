// Wykorzystaj odpowiednie mechanizmy TypeScript, aby uzyskać szczegółowe informacje o kluczach "key" wewnątrz pętli for...in

const configurations = {
  apiEndpoint: 'https://api.example.com',
  retryAttempts: 3,
  enableLogs: true,
};

for (const key of Object.keys(configurations)) {
  console.log(`${key} => ${configurations[key]}`);
}
