import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // query string
  /*eslint no-unused-vars: "warn"*/
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
