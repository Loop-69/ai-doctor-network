
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const CTASection = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-r from-medical-red to-medical-purple p-10 md:p-16 text-white">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your practice?</h2>
              <p className="text-white/80 max-w-xl">
                Join thousands of healthcare professionals using LENY-AI to enhance patient care and streamline their workflow.
              </p>
            </div>
            <div>
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
