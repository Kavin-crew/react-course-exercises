-- note
-- in fixing the curl or pasting the curl request,
-- 1. change single quotes to double quotes
-- 2. change / to ^

npm i @supabase/supabase-js
------------------------------------------------
-- create file supabase.js
------------------------------------------------

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bdvhiizjigklgnlfzxfc.supabase.co";
-- change the process.env.SUPABASE_KEY to our own key in settings>api
-- const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdmhpaXpqaWdrbGdubGZ6eGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODU4MDIsImV4cCI6MjAyMjQ2MTgwMn0.Si3nBLq2HM3WlEBStccJOSjloJmq37auchTeRdMt_rU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

------------------------------------------------
-- trying to read the rows in the column
------------------------------------------------
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be loaded");
  }

  return data;
}

------------------------------------------------
-- to start with react query
------------------------------------------------
-- 1. create place where the data lives
-- 2. we provide that to application

npm i @tanstack/react-query@4 @tanstack/react-query-devtools --force

-- in app.js
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      -- staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          -- for react query devtools component
          <ReactQueryDevtools initialIsOpen={false} />
          <Route path="dashboard" element={<Dashboard />} />
      </QueryClientProvider>
  );
}

------------------------------------------------
-- fetching data
------------------------------------------------
-- in the component we want to fecth the data
import { useQuery } from "@tanstack/react-query";

function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    -- for getCabins function, please refer above code
    queryFn: getCabins,
  });

  const { name, maxCapacity, regularPrice, discount, image } = cabins;
  
}