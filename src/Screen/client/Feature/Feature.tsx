import { CheckCircle, Database, Globe, MapPin, Phone, Shield } from 'lucide-react'
import { FeatureCard } from '../../../component/FeatureCard'
function Feature() {
  return (
    <div>
              {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Phone Validation Features</h2>
            <p className="text-xl text-gray-600">
              Our platform offers everything you need to validate, format, and analyze phone numbers globally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-green-500" />}
              title="Validation"
              description="Instantly verify if a phone number is valid, active, and properly formatted."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-blue-500" />}
              title="Global Coverage"
              description="Support for 240+ countries and territories worldwide with local number formatting."
            />
            <FeatureCard
              icon={<MapPin className="h-6 w-6 text-red-500" />}
              title="Geolocation"
              description="Identify the country, region, and city associated with any phone number."
            />
            <FeatureCard
              icon={<Phone className="h-6 w-6 text-purple-500" />}
              title="Carrier Detection"
              description="Detect the carrier and line type (mobile, landline, VoIP) for any number."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-indigo-500" />}
              title="Fraud Prevention"
              description="Identify potentially fraudulent or risky phone numbers before they cause issues."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6 text-orange-500" />}
              title="Bulk Processing"
              description="Validate thousands of phone numbers at once with our bulk processing tools."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Feature
