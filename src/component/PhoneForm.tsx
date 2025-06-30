import type React from "react";
import { useState } from "react";
import Button from "../component/ui/button";
import Input from "./ui/Input";
// import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle } from "lucide-react";
import { backendCall } from "../service/backendCall";
// import { useNavigate } from "react-router-dom"

interface ValidationResult {
  Valid: boolean;
  Country: string;
  Carrier: string;
  Int_number: string;
  Local_number: string;
  E164_number: string;
  Region: string;
  Dial_code: string;
MCCMNCData:{
  brand:string;
  mcc:string;
  mnc:string;
  operator:string;
  status:string;
  type:string;
}
}

export function PhoneForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const router = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.phoneNumber.trim()) {
      setError("Please enter a phone number");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      backendCall({
        url: "/api/phonenumber/verify",
        method: "POST",
        data: {
          phoneNumber: formData.phoneNumber,
        },
      })
        .then((response) => {
          const validationResult = response as unknown as ValidationResult;
          console.log("response", validationResult);
          setResult(validationResult);
        })
        .catch((error) => {
          console.log(error);
        });
      // Redirect to dashboard after successful login
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
    // Simulate API call
    // setTimeout(() => {
    //     // Mock result - in a real app, this would come from your API
    //     setResult({
    //         valid: true,
    //         country: "United States",
    //         carrier: "Verizon",
    //         lineType: "Mobile",
    //         formatted: "+1 (555) 123-4567",
    //         e164: "+15551234567",
    //         region: "California",
    //         countryCode: "US",
    //     })
    //     setIsLoading(false)
    // }, 1000)
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Try it yourself</h3>
        <p className="text-gray-600">
          Enter any phone number to validate it instantly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            id="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ phoneNumber: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="h-12"
          />
          {error && (
            <p className="text-red-500 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" /> {error}
            </p>
          )}
        </div>

        <Button
          label="Validate Number"
          labelClass="text-white"
          type="submit"
          styleClass="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12"
          disabled={isLoading}
        />
        {/* {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Validating...
            </>
          ) : (
            "Validate Number"
          )} */}
        {/* </Button> */}
      </form>

      {result && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center mb-3">
            {result.Valid ? (
              <div className="flex items-center text-green-600 font-medium">
                <CheckCircle className="h-5 w-5 mr-2" /> Valid Phone Number
              </div>
            ) : (
              <div className="flex items-center text-red-600 font-medium">
                <AlertCircle className="h-5 w-5 mr-2" /> Invalid Phone Number
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Country</p>
              <p className="font-medium">{result.Country}</p>
            </div>
            <div>
              <p className="text-gray-500">Carrier</p>
              <p className="font-medium">{result.Carrier}</p>
            </div>
            <div>
              <p className="text-gray-500">Int Number</p>
              <p className="font-medium">{result.Int_number}</p>
            </div>
            <div>
              <p className="text-gray-500">Region</p>
              <p className="font-medium">{result.Region}</p>
            </div>
            <div>
              <p className="text-gray-500">Brand</p>
              <p className="font-medium">{result.MCCMNCData.brand}</p>
            </div>
            <div>
              <p className="text-gray-500">MCC</p>
              <p className="font-medium">{result.MCCMNCData.mcc}</p>
            </div>
            <div>
              <p className="text-gray-500">MNC</p>
              <p className="font-medium">{result.MCCMNCData.mnc}</p>
            </div> 
            <div>
              <p className="text-gray-500">Operator</p>
              <p className="font-medium">{result.MCCMNCData.operator}</p>
            </div>
            <div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">{result.MCCMNCData.status}</p>
            </div>
              <p className="text-gray-500">Type</p>
              <p className="font-medium">{result.MCCMNCData.type}</p>
            </div>
            <div className="">
              <p className="text-gray-500">Country Number</p>
              <p className="font-medium">{result.Dial_code}</p>
            </div>
            <div className="">
              <p className="text-gray-500">E.164 Format</p>
              <p className="font-medium font-mono">{result.E164_number}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
