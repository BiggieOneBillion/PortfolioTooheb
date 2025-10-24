"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const verifyMutation = useMutation({
    mutationFn: async (otp: string) => {
      const response = await apiClient.post("/auth/verify-otp", { otp })
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Login successful! Redirecting to dashboard...",
      })
      // Navigate to dashboard
      router.push("/admin/dashboard")
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Invalid or expired OTP",
        variant: "destructive",
      })
      setOtp("")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit code",
        variant: "destructive",
      })
      return
    }
    verifyMutation.mutate(otp)
  }

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !verifyMutation.isPending) {
      verifyMutation.mutate(otp)
    }
  }, [otp])

  return (
    <div className="min-h-full flex items-center justify-center bg-[#ede4d2] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block">
                Verification Code
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  disabled={verifyMutation.isPending}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {verifyMutation.isPending && (
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.push("/admin/login")}
                disabled={verifyMutation.isPending}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={verifyMutation.isPending || otp.length !== 6}>
                Verify
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Check your browser console for the OTP code</p>
            <p className="text-xs mt-1">(Demo mode - OTP is logged)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
