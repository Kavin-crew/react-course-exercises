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
    queryKey: ["cabins"],
    -- for getCabins function, please refer above code
    queryFn: getCabins,
  });

  const { name, maxCapacity, regularPrice, discount, image } = cabins;
  
}
------------------------------------------------
-- mutating data - Delete 
------------------------------------------------
-- place this in our helper/services folder/file
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be deleted");
  }

  return data;
}
------------------------------------------------
-- go to our component, then use the deleteCabin funtion in the useMutation function
import {useMutation} from '@tanstack/react-query'

-- a hook that will connect to our client/supabase client
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    -- to refresh/invalidate the query
    -- it will refresh the changes after deleting an item
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => console.log(err.message)
  });

<button onClick={() => mutate(cabinId)}>Delete</button>

------------------------------------------------
-- mutating data - Create 
------------------------------------------------
React Hook form
npm i react-hook- form@7

import { useForm } from "react-hook-form";

const { register, handleSubmit, reset } = useForm();

const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    -- createCabin is a function in the service api file
    -- mutationFn: createCabin,
    mutationFn: (newData) => createCabin(newData),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

<form onSubmit={handleSubmit(onSubmit)}>
  <input type="text" id="name" {...register("name")} />;
</form>;