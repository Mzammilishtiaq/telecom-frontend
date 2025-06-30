import Button from "../../../component/ui/button";
import Input from "../../../component/ui/Input";
import { Textarea } from "../../../component/ui/textarea";
import Tabs from "../../../component/ui/tab"; // Your custom MUI-based Tabs
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../component/ui/card";
import { RadioGroup, RadioGroupItem } from "../../../component/ui/radio-group";
import { Upload, FileText } from "lucide-react";

export default function Contributor() {
  const tabItems = [
    {
      label: (<span className="font-semibold text-blue-700">Manual Entry</span>),
      content: (
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="submission-type">Submission Type</label>
              <RadioGroup defaultValue="new" id="submission-type" className="mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="new" id="new" />
                  <label htmlFor="new">New data entry</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="correction" id="correction" />
                  <label htmlFor="correction">Correction to existing data</label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <label htmlFor="phone-number">Phone Number</label>
              <Input id="phone-number" placeholder="Enter phone number (e.g., +1 555-123-4567)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country">Country</label>
                <Input id="country" placeholder="Country" />
              </div>
              <div>
                <label htmlFor="carrier">Carrier</label>
                <Input id="carrier" placeholder="Carrier" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="line-type">Line Type</label>
                <Input id="line-type" placeholder="Mobile, Landline, VoIP, etc." />
              </div>
              <div>
                <label htmlFor="region">Region</label>
                <Input id="region" placeholder="State/Province/Region" />
              </div>
            </div>

            <div>
              <label htmlFor="additional-info">Additional Information</label>
              <Textarea id="additional-info" placeholder="Any other details that might be helpful" />
            </div>
          </div>

          <Button type="submit" styleClass="w-full !bg-blue-600" label="Submit Contribution" labelClass="text-white " />
        </form>
      ),
    },
    {
      label:(<span className="font-semibold text-blue-700">Bulk Upload</span>),
      content: (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload CSV or JSON File</h3>
              <p className="text-sm text-gray-500 mb-4">Drag and drop your file here, or click to browse</p>
              <Button
                styleClass="bg-blue-600 hover:bg-blue-700"
                label="Browse Files"
                icon={<FileText className="mr-2 h-4 w-4" />}
                type="button"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">File Format Requirements</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>CSV or JSON format only</li>
              <li>Maximum file size: 10MB</li>
              <li>Required columns: phone_number, country_code</li>
              <li>Optional columns: carrier, line_type, region</li>
            </ul>
          </div>

          <div>
            <label htmlFor="submission-notes">Submission Notes</label>
            <Textarea id="submission-notes" placeholder="Any notes about this batch of data" />
          </div>

          <Button type="submit" styleClass="w-full !bg-blue-600 hover:bg-blue-700" label="Upload File" labelClass="text-white" />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Contributor Portal</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Help us improve our phone number database by submitting corrections or new data.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto border border-black/30 bg-white">
          <CardHeader className="">
            <CardTitle>Submit Phone Number Data</CardTitle>
            <CardDescription>
              No login required. Your contributions help make our database more accurate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs tabs={tabItems} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
