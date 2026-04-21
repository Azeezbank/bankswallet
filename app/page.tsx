"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PlansTable from "./components/PlansTable";
import Footer from "./components/Footer";

export interface Plan {
  d_id: number;
  name: string;
  data_type: string;
  network_name: string;
  validity: string;
  USER: string;
  RESELLER: string;
  API: string;
}

export default function LandingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [airtelPlan, setAirtelPlan] = useState<Plan[]>([]);
  const [gloPlan, setGloPlan] = useState<Plan[]>([]);
  const [mobile, setMobile] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("/api/data/plan", {
        });
        if (res.status === 200) {
          setPlans(res.data.mtn);
          setAirtelPlan(res.data.airtel);
          setGloPlan(res.data.glo);
          setMobile(res.data.mobile);
        }
      } catch (err: any) {
        console.error("Failed to fetch plans:", err.message);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PlansTable
        mtn={plans}    
        airtel={airtelPlan}
        glo={gloPlan}
        nimobile={mobile}  
      />
      <Footer />
    </div>
  );
}