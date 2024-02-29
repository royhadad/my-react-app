import React from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const quoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  authorSlug: z.string(),
  tags: z.array(z.string()),
});

type Quote = z.infer<typeof quoteSchema>;

async function randomQuote(): Promise<Quote> {
  const response = await fetch("https://api.quotable.io/random");
  const quote = await response.json();
  const res = quoteSchema.parse(quote);
  return res;
}

export const QuoteGeneratorPage: React.FC = () => {
  const query = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      return randomQuote();
    },
    staleTime: Infinity,
  });

  return (
    <div className="mx-auto max-w-md bg-gray-100 p-4">
      <h1 className="mb-4 text-3xl font-bold">Quote generator</h1>
      <button
        onClick={() => query.refetch()}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        Generate Quote
      </button>
      <div>
        {(() => {
          if (query.isPending || query.isFetching) {
            return <p>Loading...</p>;
          }
          if (query.isError) {
            return (
              <p>
                Error fetching the quote, please try again {query.error.message}
              </p>
            );
          }
          return (
            <div className="flex-col">
              <p className="font-serif text-lg">{query.data.content}</p>
              <p className="font-sans text-sm text-gray-600">
                - {query.data.author}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
