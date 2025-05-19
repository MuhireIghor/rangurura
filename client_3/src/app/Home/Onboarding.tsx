import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { ArrowRight, FileText, CheckCircle, BarChart2, MessageSquare, Users, Shield, Clock } from "lucide-react"

const Onboarding = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login"
    return user?.role === "admin" ? "/admin/dashboard" : "/citizen/dashboard"
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">How Rangurura Works</h1>
            <p className="text-lg text-light-gray mb-8">
              Our platform connects citizens with government agencies to efficiently resolve public service issues.
              Learn how to use Rangurura to make your voice heard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={getDashboardLink()}
                className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-light-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">The Complaint Resolution Process</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              Follow these simple steps to submit and track your complaints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="h-8 w-8 text-primary" />,
                title: "Submit a Complaint",
                description:
                  "Fill out the complaint form with details about the issue, location, and any supporting evidence like photos.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "Verification",
                description:
                  "Your complaint is verified and categorized by our system, then routed to the appropriate government department.",
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-primary" />,
                title: "Track Progress",
                description:
                  "Monitor the status of your complaint in real-time through your dashboard and receive email notifications.",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-primary" />,
                title: "Resolution & Feedback",
                description:
                  "Receive official responses, mark complaints as resolved, and provide feedback on the resolution process.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border-gray relative">
                <div className="absolute -top-4 -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-light-gray">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Citizens */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-black mb-6">For Citizens</h2>
              <p className="text-light-gray mb-6">
                As a citizen, you can use Rangurura to report issues with public services, track the status of your
                complaints, and provide feedback on resolutions.
              </p>

              <div className="space-y-4">
                {[
                  "Submit complaints with photos and location data",
                  "Track the status of your complaints in real-time",
                  "Receive notifications about updates",
                  "Communicate directly with government officials",
                  "Rate and provide feedback on resolutions",
                  "View history of all your past complaints",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-light-gray">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to={isAuthenticated && user?.role === "citizen" ? "/citizen/dashboard" : "/register"}
                  className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                >
                  {isAuthenticated && user?.role === "citizen" ? "Go to Citizen Dashboard" : "Register as a Citizen"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Citizen Dashboard"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Government Staff */}
      <section className="bg-light-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Government Staff Dashboard"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2 md:pl-10 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-black mb-6">For Government Staff</h2>
              <p className="text-light-gray mb-6">
                Government staff can use Rangurura to efficiently manage citizen complaints, assign them to the
                appropriate departments, and track resolution progress.
              </p>

              <div className="space-y-4">
                {[
                  "Receive and categorize citizen complaints",
                  "Assign complaints to appropriate departments",
                  "Track resolution progress and set priorities",
                  "Communicate directly with citizens",
                  "Generate reports and analytics",
                  "Improve service delivery based on feedback",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-light-gray">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to={isAuthenticated && user?.role === "admin" ? "/admin/dashboard" : "/login"}
                  className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                >
                  {isAuthenticated && user?.role === "admin" ? "Go to Admin Dashboard" : "Login as Staff"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Benefits of Rangurura</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              Our platform offers numerous advantages for both citizens and government agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Faster Resolution Times",
                description:
                  "Direct routing to appropriate departments reduces bureaucracy and speeds up the resolution process.",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Transparency",
                description:
                  "Real-time tracking and updates ensure complete transparency throughout the complaint resolution process.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Improved Citizen Engagement",
                description:
                  "Citizens become active participants in improving public services and community development.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border-gray">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-light-gray">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-light-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              Find answers to common questions about using Rangurura.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How do I submit a complaint?",
                  answer:
                    "After registering and logging in, navigate to the 'New Complaint' section in your dashboard. Fill out the complaint form with all relevant details, attach any supporting documents or photos, and submit.",
                },
                {
                  question: "How long does it take to resolve a complaint?",
                  answer:
                    "Resolution times vary depending on the nature and complexity of the issue. Simple complaints may be resolved within days, while more complex issues might take longer. You can always check the real-time status of your complaint in your dashboard.",
                },
                {
                  question: "Can I submit anonymous complaints?",
                  answer:
                    "While you need to register to use the platform, you can choose to keep your identity confidential from the public. Your personal information will only be visible to the relevant government officials handling your complaint.",
                },
                {
                  question: "What happens if I'm not satisfied with the resolution?",
                  answer:
                    "If you're not satisfied with the resolution, you can provide feedback and request a review. The complaint will be reassessed by senior officials who will determine if further action is needed.",
                },
                {
                  question: "Can I track multiple complaints at once?",
                  answer:
                    "Yes, your dashboard shows all your active and past complaints. You can easily track the status of multiple complaints simultaneously.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border-gray">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-light-gray">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join Rangurura today and help improve public services in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? getDashboardLink() : "/register"}
              className="bg-white text-primary hover:bg-light-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              {isAuthenticated ? "Go to Dashboard" : "Register Now"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border border-white text-white hover:bg-primary/80 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Onboarding
