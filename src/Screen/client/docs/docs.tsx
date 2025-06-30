import React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  IconButton,
} from "@mui/material"
import {
  Search,
  ExpandMore,
  Code,
  Api,
  Security,
  Speed,
  CheckCircle,
  ContentCopy,
  GitHub,
  MenuBook,
  EmojiObjects,
  Extension,
  Settings,
} from "@mui/icons-material"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`docs-tabpanel-${index}`}
      aria-labelledby={`docs-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const [activeSubItem, setActiveSubItem] = useState("")

  const handleNavigation = (_sectionId: string, itemId?: string) => {
    if (itemId) {
      setActiveSubItem(itemId)
      // Scroll to section
      const element = document.getElementById(itemId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const sidebarItems = [
    {
      title: "Getting Started",
      icon: <MenuBook />,
      items: [
        { title: "Quick Start", id: "quick-start", description: "Get up and running in minutes" },
        { title: "Installation", id: "installation", description: "Install SDKs and dependencies" },
        { title: "Authentication", id: "authentication", description: "API key setup and security" },
        { title: "First Request", id: "first-request", description: "Make your first API call" },
        { title: "Error Handling", id: "error-handling", description: "Handle API errors gracefully" },
      ],
    },
    {
      title: "API Reference",
      icon: <Api />,
      items: [
        { title: "Phone Validation", id: "phone-validation", description: "Validate single phone numbers" },
        { title: "Bulk Validation", id: "bulk-validation", description: "Validate multiple numbers at once" },
        { title: "Number Lookup", id: "number-lookup", description: "Get detailed number information" },
        { title: "Carrier Info", id: "carrier-info", description: "Retrieve carrier details" },
        { title: "Line Type", id: "line-type", description: "Identify mobile, landline, or VoIP" },
        { title: "Webhooks", id: "webhooks", description: "Real-time notifications" },
      ],
    },
    {
      title: "SDKs & Libraries",
      icon: <Extension />,
      items: [
        { title: "JavaScript/Node.js", id: "javascript-sdk", description: "Official JavaScript SDK" },
        { title: "Python", id: "python-sdk", description: "Python library and examples" },
        { title: "PHP", id: "php-sdk", description: "PHP integration guide" },
        { title: "Java", id: "java-sdk", description: "Java SDK documentation" },
        { title: "C#/.NET", id: "csharp-sdk", description: ".NET library reference" },
        { title: "Ruby", id: "ruby-sdk", description: "Ruby gem documentation" },
        { title: "Go", id: "go-sdk", description: "Go package reference" },
      ],
    },
    {
      title: "Guides & Tutorials",
      icon: <EmojiObjects />,
      items: [
        { title: "Best Practices", id: "best-practices", description: "Optimization tips and tricks" },
        { title: "Rate Limiting", id: "rate-limiting", description: "Understanding API limits" },
        { title: "Caching Strategies", id: "caching", description: "Improve performance with caching" },
        { title: "Batch Processing", id: "batch-processing", description: "Handle large datasets efficiently" },
        { title: "Real-time Validation", id: "realtime-validation", description: "Live form validation" },
        { title: "Data Privacy", id: "data-privacy", description: "GDPR compliance guide" },
      ],
    },
    {
      title: "Integration Examples",
      icon: <Code />,
      items: [
        { title: "React Forms", id: "react-integration", description: "Integrate with React applications" },
        { title: "Vue.js Setup", id: "vue-integration", description: "Vue.js implementation guide" },
        { title: "WordPress Plugin", id: "wordpress-integration", description: "WordPress integration" },
        { title: "Shopify Apps", id: "shopify-integration", description: "E-commerce validation" },
        { title: "Salesforce", id: "salesforce-integration", description: "CRM integration guide" },
        { title: "Zapier", id: "zapier-integration", description: "No-code automation" },
      ],
    },
    {
      title: "Advanced Features",
      icon: <Settings />,
      items: [
        { title: "Custom Fields", id: "custom-fields", description: "Add custom validation rules" },
        { title: "Analytics Dashboard", id: "analytics", description: "Usage analytics and insights" },
        { title: "White-label API", id: "white-label", description: "Brand the API as your own" },
        { title: "Enterprise Features", id: "enterprise", description: "Advanced enterprise options" },
        { title: "API Versioning", id: "versioning", description: "Version management" },
        { title: "Custom Endpoints", id: "custom-endpoints", description: "Create custom validation logic" },
      ],
    },
    {
      title: "Support & Resources",
      icon: <Security />,
      items: [
        { title: "FAQ", id: "faq", description: "Frequently asked questions" },
        { title: "Status Page", id: "status", description: "API status and uptime" },
        { title: "Changelog", id: "changelog", description: "Latest updates and changes" },
        { title: "Community Forum", id: "community", description: "Developer community" },
        { title: "Contact Support", id: "support", description: "Get help from our team" },
        { title: "Service Level Agreement", id: "sla", description: "SLA and guarantees" },
      ],
    },
  ]

  const codeExamples = {
    javascript: `// JavaScript Example
import { VeriPhone } from 'veriphone-js';

const client = new VeriPhone('your-api-key');

async function validatePhone(phoneNumber) {
  try {
    const result = await client.validate(phoneNumber);
    console.log('Validation result:', result);
    return result;
  } catch (error) {
    console.error('Validation failed:', error);
  }
}

validatePhone('+1234567890');`,

    python: `# Python Example
from veriphone import VeriPhone

client = VeriPhone('your-api-key')

def validate_phone(phone_number):
    try:
        result = client.validate(phone_number)
        print(f"Validation result: {result}")
        return result
    except Exception as error:
        print(f"Validation failed: {error}")

validate_phone('+1234567890')`,

    curl: `# cURL Example
curl -X GET "https://api.veriphone.io/v1/verify" \\
  -H "X-API-Key: your-api-key" \\
  -G \\
  -d "phone=+1234567890" \\
  -d "default_country=US"`,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Box className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Typography variant="h2" component="h1" className="font-bold mb-4">
            Documentation
          </Typography>
          <Typography variant="h6" className="max-w-3xl opacity-90">
            Complete guide to integrating and using the VeriPhone API for phone number validation
          </Typography>

          {/* Search Bar */}
          <Box className="mt-8 max-w-md">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-400" />
                  </InputAdornment>
                ),
                className: "bg-white rounded-lg",
              }}
            />
          </Box>
        </div>
      </Box>

      {/* Breadcrumbs */}
      <Box className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Documentation</Typography>
          </Breadcrumbs>
        </div>
      </Box>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 max-h-[calc(100vh-2rem)] overflow-hidden">
              <CardContent className="p-0">
                <Box className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
                  <Typography variant="h6" className="font-bold text-blue-800">
                    Documentation
                  </Typography>
                  <Typography variant="body2" className="text-blue-600 mt-1">
                    Complete API Reference
                  </Typography>
                </Box>

                <Box className="overflow-y-auto max-h-[calc(100vh-8rem)]">
                  {sidebarItems.map((section, index) => (
                    <Accordion
                      key={index}
                      elevation={0}
                      className="shadow-none border-b border-gray-100 last:border-b-0"
                      defaultExpanded={index === 0}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Box className="flex items-center gap-3">
                          <Box className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            {React.cloneElement(section.icon, {
                              className: "text-blue-600",
                              fontSize: "small",
                            })}
                          </Box>
                          <Box>
                            <Typography variant="body1" className="font-semibold text-gray-800">
                              {section.title}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500">
                              {section.items.length} items
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails className="px-0 pt-0 pb-2">
                        <List dense className="py-0">
                          {section.items.map((item, itemIndex) => (
                            <ListItem
                              key={itemIndex}
                              className={`py-2 px-4 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeSubItem === item.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"
                              }`}
                              onClick={() => handleNavigation(section.title.toLowerCase(), item.id)}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    className={`font-medium ${
                                      activeSubItem === item.id ? "text-blue-700" : "text-gray-700"
                                    }`}
                                  >
                                    {item.title}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="caption" className="text-gray-500 mt-1 block">
                                    {item.description}
                                  </Typography>
                                }
                              />
                              {activeSubItem === item.id && <Box className="w-2 h-2 bg-blue-500 rounded-full ml-2" />}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>

                {/* Sidebar Footer */}
                <Box className="p-4 border-t bg-gray-50">
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GitHub />}
                    className="mb-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    View on GitHub
                  </Button>
                  <Button variant="contained" fullWidth className="bg-blue-600 hover:bg-blue-700">
                    Get API Key
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Start Section */}
            <Card id="quick-start">
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-4">
                  Quick Start Guide
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Get started with VeriPhone API in just a few minutes. Follow these simple steps to validate your first
                  phone number.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="border border-blue-200 bg-blue-50">
                    <CardContent className="p-4 text-center">
                      <Box className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Typography variant="h6" className="text-white font-bold">
                          1
                        </Typography>
                      </Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        Sign Up
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Create your account and get your API key
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="border border-green-200 bg-green-50">
                    <CardContent className="p-4 text-center">
                      <Box className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Typography variant="h6" className="text-white font-bold">
                          2
                        </Typography>
                      </Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        Install
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Install our SDK or use direct API calls
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="border border-purple-200 bg-purple-50">
                    <CardContent className="p-4 text-center">
                      <Box className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Typography variant="h6" className="text-white font-bold">
                          3
                        </Typography>
                      </Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        Validate
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Start validating phone numbers instantly
                      </Typography>
                    </CardContent>
                  </Card>
                </div>

                {/* Code Examples */}
                <Typography variant="h5" className="font-semibold mb-4">
                  Code Examples
                </Typography>

                <Box className="border rounded-lg overflow-hidden">
                  <Tabs value={tabValue} onChange={handleTabChange} className="border-b">
                    <Tab label="JavaScript" />
                    <Tab label="Python" />
                    <Tab label="cURL" />
                  </Tabs>

                  {Object.entries(codeExamples).map(([lang, code], index) => (
                    <TabPanel key={lang} value={tabValue} index={index}>
                      <Box className="relative">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                        <IconButton
                          className="absolute top-2 right-2 text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                        {copiedCode === lang && (
                          <Alert severity="success" className="mt-2">
                            Code copied to clipboard!
                          </Alert>
                        )}
                      </Box>
                    </TabPanel>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Installation Section */}
            <Card id="installation">
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-4">
                  Installation
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Choose your preferred method to install the VeriPhone SDK or use our REST API directly.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <Typography variant="h6" className="font-semibold mb-3 flex items-center gap-2">
                        <Code className="text-blue-600" />
                        NPM Package
                      </Typography>
                      <Box className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3">
                        <code>npm install veriphone-js</code>
                      </Box>
                      <Typography variant="body2" className="text-gray-600">
                        Official JavaScript/TypeScript SDK with full type support
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <Typography variant="h6" className="font-semibold mb-3 flex items-center gap-2">
                        <Api className="text-green-600" />
                        Direct API
                      </Typography>
                      <Box className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3">
                        <code>https://api.veriphone.io/v1</code>
                      </Box>
                      <Typography variant="body2" className="text-gray-600">
                        RESTful API for any programming language
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Authentication Section */}
            <Card id="authentication">
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-4">
                  Authentication
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Secure your API requests with authentication keys and learn about best practices.
                </Typography>

                <Alert severity="info" className="mb-6">
                  <Typography variant="body2">
                    <strong>API Key Required:</strong> All requests must include a valid API key in the headers.
                  </Typography>
                </Alert>

                <Box className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                  <code>{`curl -H "X-API-Key: your-api-key-here" \\
     -H "Content-Type: application/json" \\
     https://api.veriphone.io/v1/verify?phone=+1234567890`}</code>
                </Box>
              </CardContent>
            </Card>

            {/* Phone Validation Section */}
            <Card id="phone-validation">
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-4">
                  Phone Validation API
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Validate individual phone numbers and get detailed information about number validity, carrier, and
                  location.
                </Typography>

                <Typography variant="h6" className="font-semibold mb-3">
                  Endpoint
                </Typography>
                <Box className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
                  <code className="text-blue-800">GET https://api.veriphone.io/v1/verify</code>
                </Box>

                <Typography variant="h6" className="font-semibold mb-3">
                  Parameters
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 border-b">Parameter</th>
                        <th className="text-left p-3 border-b">Type</th>
                        <th className="text-left p-3 border-b">Required</th>
                        <th className="text-left p-3 border-b">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b font-mono text-sm">phone</td>
                        <td className="p-3 border-b">string</td>
                        <td className="p-3 border-b">Yes</td>
                        <td className="p-3 border-b">Phone number to validate</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b font-mono text-sm">default_country</td>
                        <td className="p-3 border-b">string</td>
                        <td className="p-3 border-b">No</td>
                        <td className="p-3 border-b">ISO 3166-1 alpha-2 country code</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Add more sections for other navigation items */}
            <Card id="bulk-validation">
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-4">
                  Bulk Validation
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Validate multiple phone numbers in a single API request for improved efficiency.
                </Typography>
                {/* Bulk validation content */}
              </CardContent>
            </Card>

            {/* Continue with other sections... */}

            {/* API Features */}
            <Card>
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-6">
                  API Features
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Box className="flex gap-4">
                    <Box className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-blue-600" />
                    </Box>
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        Real-time Validation
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Validate phone numbers instantly with our global database of carrier information.
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex gap-4">
                    <Box className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Speed className="text-green-600" />
                    </Box>
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        High Performance
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Process thousands of validations per second with 99.9% uptime guarantee.
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex gap-4">
                    <Box className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Security className="text-purple-600" />
                    </Box>
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        Secure & Compliant
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Enterprise-grade security with GDPR compliance and data encryption.
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex gap-4">
                    <Box className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="text-orange-600" />
                    </Box>
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-2">
                        Easy Integration
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        RESTful API with SDKs for all major programming languages.
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-6">
                  Frequently Asked Questions
                </Typography>

                {[
                  {
                    question: "What is the rate limit for API calls?",
                    answer:
                      "Our API supports up to 1000 requests per minute for standard plans and 10,000 requests per minute for enterprise plans.",
                  },
                  {
                    question: "Do you support international phone numbers?",
                    answer: "Yes, we support phone number validation for over 230 countries and territories worldwide.",
                  },
                  {
                    question: "How accurate is the validation?",
                    answer:
                      "Our validation accuracy is over 99.5% with real-time carrier lookup and number portability data.",
                  },
                  {
                    question: "Can I validate phone numbers in bulk?",
                    answer:
                      "Yes, our bulk validation endpoint allows you to validate up to 1000 phone numbers in a single API call.",
                  },
                ].map((faq, index) => (
                  <Accordion key={index} className="mb-2">
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" className="font-medium">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" className="text-gray-600">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <Typography variant="h5" className="font-bold mb-4">
                  Need Help?
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Our support team is here to help you integrate and optimize your phone validation workflow.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="contained" className="bg-blue-600 hover:bg-blue-700">
                    Contact Support
                  </Button>
                  <Button variant="outlined" startIcon={<GitHub />}>
                    View on GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
