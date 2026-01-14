"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { isValidEmail, isValidPhone } from "@/lib/utils";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: Step): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    }

    if (currentStep === 2) {
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        errors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (!isValidPhone(formData.phone)) {
        errors.phone = "Please enter a valid Bangladesh phone number";
      }
      if (!formData.username.trim()) {
        errors.username = "Username is required";
      } else if (formData.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
      }
    }

    if (currentStep === 3) {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (!formData.acceptTerms) {
        errors.acceptTerms = "You must accept the terms and conditions";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3) as Step);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateStep(3)) return;

    try {
      await register({
        email: formData.email,
        username: formData.username,
        phone: formData.phone,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    }
  };

  const stepIndicator = (
    <div className="flex justify-center mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              s < step
                ? "bg-green-500 text-white"
                : s === step
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "bg-white/20 text-white/50"
            }`}
          >
            {s < step ? <Check className="h-5 w-5" /> : s}
          </div>
          {s < 3 && (
            <div
              className={`w-12 h-1 ${
                s < step ? "bg-green-500" : "bg-white/20"
              } transition-all`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <Card className="w-full max-w-md glass border-white/20 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">RP</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-white/70">
              {step === 1 && "আপনার ব্যক্তিগত তথ্য দিন"}
              {step === 2 && "যোগাযোগের তথ্য দিন"}
              {step === 3 && "পাসওয়ার্ড সেট করুন"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {stepIndicator}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/90">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  {fieldErrors.firstName && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/90">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  {fieldErrors.lastName && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+8801XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/90">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  {fieldErrors.username && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.username}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Step 3: Password */}
            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        acceptTerms: e.target.checked,
                      })
                    }
                    className="mt-1 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-white/70">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {fieldErrors.acceptTerms && (
                  <p className="text-sm text-destructive">
                    {fieldErrors.acceptTerms}
                  </p>
                )}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-white/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
