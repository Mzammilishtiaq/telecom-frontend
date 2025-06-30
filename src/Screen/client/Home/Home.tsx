import { CheckCircle, Zap } from "lucide-react";
import Button from "../../../component/ui/button";
import { StatsCard } from "../../../component/StatsCard"

import { PhoneForm } from '../../../component/PhoneForm'
function Home() {

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                <Zap className="h-4 w-4 mr-1" /> Validate phone numbers in real-time
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Phone validation made <span className="text-indigo-600">simple</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Instantly validate phone numbers, detect carriers, and prevent fraud with our powerful API. Supporting
                240+ countries worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button label=" Start for free"
                  styleClass="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-6 py-6"
                  type={'button'} labelClass="text-white text-[12px]" />
                <Button styleClass="text-lg px-6 py-6 border-2" label="View documentation" type={'button'} />
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> 1,000 free validations
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <PhoneForm />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard value="240+" label="Countries Supported" />
            <StatsCard value="99.8%" label="Accuracy Rate" />
            <StatsCard value="50M+" label="Numbers Validated" />
            <StatsCard value="5,000+" label="Happy Customers" />
          </div>
        </div>
      </section>



      {/* API Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Simple, Powerful API</h2>
              <p className="text-xl opacity-90">
                Integrate phone validation into your applications with just a few lines of code. Our RESTful API is
                designed to be easy to use and highly reliable.
              </p>
              <Button type={'button'} styleClass="bg-white text-indigo-600 hover:bg-gray-100" label="Explore API Docs" labelClass="text-white text-[12px]" />
            </div>
            <div className="bg-indigo-800 rounded-lg p-6 font-mono text-sm">
              <pre className="overflow-x-auto">
                <code className="text-gray-300">
                  {`// Example API request
fetch('https://api.verifyphone.com/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+1 555 123 4567',
    api_key: 'YOUR_API_KEY'
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
  // {
  //   valid: true,
  //   country: "United States",
  //   carrier: "Verizon",
  //   line_type: "mobile",
  //   formatted: "+1 (555) 123-4567"
  // }
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Integrate With Your Favorite Tools</h2>
            <p className="text-xl text-gray-600">
              VerifyPhone works seamlessly with the tools and platforms you already use.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-medium">Partner {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to validate phone numbers?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get started for free with 1,000 validations. No credit card required.
            </p>
            <Button type={'button'}
             styleClass="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6"
              label="Sign up for free" labelClass="text-white text-[12px]" />
          </div>
        </div>
      </section>

    </>
  )
}

export default Home
