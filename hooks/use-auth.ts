"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import apiClient from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface SessionData {
  authenticated: boolean
  email?: string
}

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  // Check session status
  const {
    data: session,
    isLoading,
    error,
  } = useQuery<SessionData>({
    queryKey: ["auth-session"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/auth/session")
        return response.data
      } catch (error: any) {
        if (error.response?.status === 401) {
          return { authenticated: false }
        }
        throw error
      }
    },
    retry: false,
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post("/auth/logout")
      return response.data
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth-session"], { authenticated: false })
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      })
      router.push("/admin/login")
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    },
  })

  return {
    session,
    isLoading,
    isAuthenticated: session?.authenticated ?? false,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  }
}
