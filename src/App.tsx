import "./App.css";
import { ProgressBarPage } from "./pages/ProgressBarPage/ProgressBarPage.tsx";
import { useState } from "react";
import { QuoteGeneratorPage } from "./pages/QuoteGeneratorPage/QuoteGeneratorPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const pages = [
  { jsx: <ProgressBarPage />, name: "Progress Bar" },
  {
    jsx: <QuoteGeneratorPage />,
    name: "Quote generator",
  },
  {
    jsx: <div className="text-xl">Page 2</div>,
    name: "Page 2",
  },
  {
    jsx: (
      <div>
        <h2>Page 3</h2>
      </div>
    ),
    name: "Page 3",
  },
];

const queryClient = new QueryClient();

function App() {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full">
        <h1>This is my React playground!</h1>
        <div className="flex-row justify-start align-middle">
          {pages.map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => setSelectedPageIndex(index)}
                className={`mr-2 rounded px-4 py-2 font-bold text-white ${selectedPageIndex === index ? "bg-blue-500" : "bg-blue-300"}`}
              >
                {page.name}
              </button>
            );
          })}
        </div>
        <div>{pages[selectedPageIndex].jsx}</div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
