"use client"

import type React from "react"

import { useState } from "react"
import Button from "../component/ui/button"
import Input from "./ui/Input"
// import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface ValidationResult {
    valid: boolean
    country: string
    carrier: string
    lineType: string
    formatted: string
    e164: string
    region: string
    countryCode: string
}

export function PhoneForm() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<ValidationResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!phoneNumber.trim()) {
            setError("Please enter a phone number")
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            // Mock result - in a real app, this would come from your API
            setResult({
                valid: true,
                country: "United States",
                carrier: "Verizon",
                lineType: "Mobile",
                formatted: "+1 (555) 123-4567",
                e164: "+15551234567",
                region: "California",
                countryCode: "US",
            })
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold mb-2">Try it yourself</h3>
                <p className="text-gray-600">Enter any phone number to validate it instantly</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Input
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                    disabled={isLoading} />
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
                        {result.valid ? (
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
                            <p className="font-medium">{result.country}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Carrier</p>
                            <p className="font-medium">{result.carrier}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Line Type</p>
                            <p className="font-medium">{result.lineType}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Region</p>
                            <p className="font-medium">{result.region}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-500">Formatted Number</p>
                            <p className="font-medium">{result.formatted}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-500">E.164 Format</p>
                            <p className="font-medium font-mono">{result.e164}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
