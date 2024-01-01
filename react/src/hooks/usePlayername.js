import { useAuth0 } from "@auth0/auth0-react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserById } from "../apis/apis.js";

// Abstract the implementation of getting the user's playername via custom hook
// useQuery handles state management for our user data
export default function usePlayername() {
  const { user } = useAuth0();
  const { data, status, refetch } = useQuery({
    queryKey: ["userData", user?.sub],
    queryFn: () => {
      console.log("refetching user data from api because it's not in cache");
      return getUserById(user?.sub);
    },
  });

  if (status === "pending" || status === "error") {
    return { playername: "Player name loading...", refetch: refetch };
  }

  return { playername: data?.["playerName"], refetch: refetch };
}

// todo custom hook that wraps around a useAuth hook?

// * auth0 and useQuery: 2 calls
// * useQuery: 2 calls
