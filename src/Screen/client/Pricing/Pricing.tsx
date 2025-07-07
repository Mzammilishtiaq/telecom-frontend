import React from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
} from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

export default function PricingPage() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals and small projects",
      features: [
        "1,000 validations per month",
        "Basic validation features",
        "Standard API rate limits",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "For growing businesses and teams",
      features: [
        "50,000 validations per month",
        "Advanced carrier detection",
        "Bulk validation",
        "Higher API rate limits",
        "Email support",
        "Detailed analytics",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited validations",
        "Dedicated infrastructure",
        "Custom integrations",
        "SLA guarantees",
        "24/7 priority support",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <Box className="min-h-screen bg-gray-50 m-5">
      {/* Header Section */}
      <Box className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h2" component="h1" className="font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h5" className="max-w-2xl mx-auto text-blue-100">
              Choose the plan thats right for your business. All plans include access to our global phone validation
              API.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Pricing Cards */}
      <Container maxWidth="lg" className="py-16">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`h-full flex flex-col relative transition-all duration-300 ease-in-out cursor-pointer ${
                tier.popular ? "border-2 border-blue-500 shadow-xl" : "border border-gray-200"
              }`}
              elevation={tier.popular ? 8 : 2}
              sx={{
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: tier.popular ? "0 20px 40px rgba(59, 130, 246, 0.3)" : "0 20px 40px rgba(0, 0, 0, 0.15)",
                  borderColor: tier.popular ? "#3b82f6" : "#60a5fa",
                  "& .pricing-button": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  },
                  "& .pricing-chip": {
                    transform: "scale(1.1)",
                  },
                  "& .feature-icon": {
                    color: "#10b981",
                    transform: "scale(1.2)",
                  },
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {tier.popular && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  className="pricing-chip absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-medium transition-all duration-300"
                />
              )}

              <CardContent className="flex-grow p-6">
                <Typography variant="h4" component="h3" className="font-bold mb-4">
                  {tier.name}
                </Typography>

                <Box className="mb-4">
                  <Typography variant="h3" component="span" className="font-bold">
                    {tier.price}
                  </Typography>
                  {tier.period && (
                    <Typography variant="body1" component="span" className="text-gray-500 ml-2">
                      {tier.period}
                    </Typography>
                  )}
                </Box>

                <Typography variant="body1" className="text-gray-600 mb-6">
                  {tier.description}
                </Typography>

                <List className="space-y-2">
                  {tier.features.map((feature) => (
                    <ListItem key={feature} className="px-0 py-1">
                      <ListItemIcon className="min-w-0 mr-3">
                        <CheckCircle className="feature-icon text-green-500 w-5 h-5 transition-all duration-300" />
                      </ListItemIcon>
                      <ListItemText primary={feature} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <CardActions className="p-6 pt-0">
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  className={`pricing-button py-3 transition-all duration-300 ${
                    tier.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"
                  }`}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {tier.cta}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>

      {/* FAQ Section */}
      <Box className="mt-16">
        <Typography variant="h3" component="h2" className="text-center font-bold mb-8">
          Frequently Asked Questions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: 4,
          }}
        >
          <Paper
            className="p-6 h-full transition-all duration-300 cursor-pointer"
            elevation={1}
            sx={{
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #3b82f6",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography variant="h6" className="font-semibold mb-2">
              How accurate is the phone validation?
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Our phone validation service is highly accurate, with over 99% accuracy for most countries. We regularly
              update our database to ensure the most current information.
            </Typography>
          </Paper>

          <Paper
            className="p-6 h-full transition-all duration-300 cursor-pointer"
            elevation={1}
            sx={{
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #3b82f6",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography variant="h6" className="font-semibold mb-2">
              Can I upgrade or downgrade my plan?
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
              cycle.
            </Typography>
          </Paper>

          <Paper
            className="p-6 h-full transition-all duration-300 cursor-pointer"
            elevation={1}
            sx={{
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #3b82f6",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography variant="h6" className="font-semibold mb-2">
              Do unused validations roll over?
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              No, unused validations do not roll over to the next month. Each billing cycle resets your validation
              count.
            </Typography>
          </Paper>

          <Paper
            className="p-6 h-full transition-all duration-300 cursor-pointer"
            elevation={1}
            sx={{
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #3b82f6",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography variant="h6" className="font-semibold mb-2">
              Is there a contract or commitment?
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              No, all our plans are month-to-month with no long-term commitment. You can cancel at any time.
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Contact Sales Section */}
      <Box className="mt-16 text-center">
        <Typography variant="h3" component="h2" className="font-bold mb-4">
          Need a custom solution?
        </Typography>
        <Typography variant="h6" className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact our sales team to discuss your specific requirements and get a tailored quote.
        </Typography>
        <Button
          variant="contained"
          size="large"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg transition-all duration-300"
          sx={{
            "&:hover": {
              transform: "scale(1.05) translateY(-2px)",
              boxShadow: "0 12px 30px rgba(59, 130, 246, 0.4)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Contact Sales
        </Button>
      </Box>
    </Box>
  )
}
