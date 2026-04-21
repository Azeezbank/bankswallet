import Link from "next/link";
import { Mail, Phone, Globe, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-app-gradient border-t mt-20">

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div className="space-y-4">

            <h2 className="text-2xl font-bold text-primary">
              Bankswallet
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              A fast, secure and automated financial platform for airtime,
              data, cable TV and wallet funding built for reliability and scale.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe size={14} />
              <span>Always Online • Always Fast • Always Secure</span>
            </div>

          </div>

          {/* LINKS */}
          <div className="bg-white rounded-xl border p-4 space-y-3">

            <h3 className="font-semibold text-gray-900">Quick Links</h3>

            <div className="space-y-2 text-sm">

              {["Features", "Pricing", "How it works", "Support"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-gray-600 hover:text-primary transition hover:translate-x-1"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

          {/* SERVICES */}
          <div className="bg-white rounded-xl border p-4 space-y-2">

            <h3 className="font-semibold text-gray-900 mb-2">Services</h3>

            {[
              "Airtime & Data",
              "Cable TV Subscription",
              "Wallet Funding",
              "Utility Payments",
            ].map((item) => (
              <p
                key={item}
                className="text-sm text-gray-600 hover:text-primary transition cursor-default"
              >
                {item}
              </p>
            ))}

          </div>

          {/* CONTACT */}
          <div className="bg-white rounded-xl border p-4 space-y-4">

            <h3 className="font-semibold text-gray-900">Contact</h3>

            <div className="space-y-3 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <Mail size={14} />
                support@bankswallet.com
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} />
                +234 000 000 0000
              </div>

            </div>

            {/* DEV CTA */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">

              <p className="text-xs text-gray-600">
                Need a custom website or system?
              </p>

              <p className="text-xs font-medium text-primary mt-1">
                We build scalable fintech & web solutions.
              </p>

            </div>

          </div>

        </div>

        {/* TRUST STRIP */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <ShieldCheck size={14} className="text-primary" />
            Secure • Automated • Reliable Transactions
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bankswallet. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}