import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [resData, setResData] = useState(null);

  useEffect(() => {
    API.get("/api")
      .then((response) => {
        setResData(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">SyncSpace Frontend</h1>

      {resData ? (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>Message: {resData.message}</p>
          <p>Status: {resData.status.toString()}</p>
        </div>
      ) : (
        <p>Loading API response...</p>
      )}
    </div>
  );
}

export default App;
