import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { ArrowRight, FileText, BarChart, MessageSquare } from "lucide-react"
import MainLayout from "../../layouts/MainLayout"

const Home = () => {
  const { user } = useSelector(({auth}: {auth: any}) => ({user: auth.user}))

  const getDashboardLink = () => {
    if (!user) return "/auth/login"
    return user?.role === "ADMIN" ? "/admin/dashboard" : "/citizen/dashboard"
  }

  return (
    <MainLayout>
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Your Voice Matters in Building Better Communities
              </h1>
              <p className="text-lg text-light-gray mb-8">
                Submit, track, and resolve complaints about public services. Connect directly with government agencies
                for faster resolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={getDashboardLink()}
                  className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                >
                  {user ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/onboarding"
                  className="border border-primary text-primary hover:bg-light-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Citizen Engagement Platform"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-light-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">How CitizenConnect Works</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              Our platform streamlines the process of submitting and resolving citizen complaints through a simple,
              transparent workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-gray">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Complaints</h3>
              <p className="text-light-gray">
                Easily submit detailed complaints about public services with the option to add photos and location data.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-gray">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-light-gray">
                Monitor the status of your complaints in real-time and receive updates as they move through the
                resolution process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-gray">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Responses</h3>
              <p className="text-light-gray">
                Receive official responses from government agencies and provide feedback on the resolution process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
              <p className="text-light-gray">Complaints Resolved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">15+</p>
              <p className="text-light-gray">Government Departments</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-light-gray">Registered Citizens</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">92%</p>
              <p className="text-light-gray">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-light-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Complaint Categories</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              We handle a wide range of public service issues across multiple departments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Roads & Infrastructure",
              "Water & Sanitation",
              "Electricity",
              "Public Safety",
              "Environment",
              "Public Health",
              "Education",
              "Public Transport",
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-border-gray hover:border-primary hover:shadow-sm transition-all"
              >
                <p className="font-medium text-center">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">What Citizens Say</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              Hear from citizens who have used our platform to resolve their issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Citizen",
                quote:
                  "I reported a broken street light that had been out for months. Within a week, it was fixed! The tracking system kept me informed throughout the process.",
              },
              {
                name: "Michael Chen",
                role: "Community Leader",
                quote:
                  "As a community organizer, I've used CitizenConnect to report multiple issues in our neighborhood. The response time has improved dramatically.",
              },
              {
                name: "Aisha Patel",
                role: "Small Business Owner",
                quote:
                  "The water supply in our area was inconsistent for years. After submitting a complaint through CitizenConnect, the issue was escalated and finally resolved.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border-gray">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-light-gray">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-light-gray italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make Your Voice Heard?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of citizens who are actively participating in improving public services in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? getDashboardLink() : "/register"}
              className="bg-white text-primary hover:bg-light-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              {user ? "Go to Dashboard" : "Register Now"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/onboarding"
              className="border border-white text-white hover:bg-primary/80 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>

    </MainLayout>
  )
}

export default Home
