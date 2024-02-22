import React from "react";
import { useQuery } from "react-query";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const QuoteGeneratorPage: React.FC = () => {
  const query = useQuery(["quote"], async () => {
    await delay(1000);
    return "this is the quote!";
  });

  return (
    <div>
      <h1>Quote generator</h1>
      <button onClick={() => query.refetch()}>Generate Quote</button>
      <div>
        {query.isLoading ? (
          <p>Loading...</p>
        ) : query.isError ? (
          <p>Error fetching the quote, please try again</p>
        ) : (
          <>
            <div>{query.data}</div>
            {query.isFetching && <p>Fetching...</p>}
          </>
        )}
      </div>
    </div>
  );
};
