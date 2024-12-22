import React, { useState } from 'react';

const CORSTest = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://tokengen-function-714423430443.europe-west1.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div>
        <h1>CORS Test</h1>
      </div>
      <div className="space-y-4">
        <button 
          onClick={testRequest}
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test CORS Request'}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}

        {response && (
          <div className="p-4 bg-green-50 text-green-700 rounded-md">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CORSTest;