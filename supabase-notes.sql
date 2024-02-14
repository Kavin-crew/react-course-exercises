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

------------------------------------------------
-- handling errors 
------------------------------------------------
const { formState } = useForm();
const { errors } = formState;

function onError(errors) {
  console.log(errors);
}

<form onSubmit={handleSubmit(onSubmit, onError)}>
  <input
    type="text"
    id="name"
    {...register("name", { required: "This field is required" })}
  />
  {errors?.name?.message && <Error>{errors.name.message}</Error>}
</form>;

------------------------------------------------
-- uploading images 
------------------------------------------------
------ in the services
export async function createCabin(newCabin) {
  -- to create a unique filename of the image upon upload
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  -- the storage where we upload our images
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  --https://bdvhiizjigklgnlfzxfc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  -- 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be created");
  }

  -- 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  -- 3. delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

------- in the component where our form located
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

<input
  id="image"
  accept="image/*"
  disabled={isCreating}
  type="file"
  {...register("image", { required: "This field is required" })}
/>

------------------------------------------------
-- filtering in server side/filter in api 
------------------------------------------------
-- custom hook using the react query
export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  -- // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  -- // : { field: "status", value: filterValue, method: "gte" };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    -- query key is like the dependency array to refetch data once it has changes
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, bookings, error };
}

----------------------
-- reading data in supabase w/ filter
export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)");

  if (filter !== null)
    query = query[filter.method || "eq"](filter.field, filter.value);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

------------------------------------------------
-- pre-fetching
------------------------------------------------
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

-- // PRE-FETCHING
const pageCount = Math.ceil(page / PAGE_SIZE);

-- // if we are in the last page, we cont prefetch + 1 since its the last
if (page < pageCount)
queryClient.prefetchQuery({
  queryKey: ["bookings", filter, sortBy, page + 1],
  queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
});


------------------------------------------------
-- sample mutation and revalidation
------------------------------------------------

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const nagivate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      nagivate("/");
    },
  });
}
