import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import MobileHeroGrid from "@/components/home/MobileHeroGrid";
import ServicesOverview from "@/components/home/ServicesOverview";
import ServiceSection from "@/components/home/ServiceSection";
import ScreenPrintingFeature from "@/components/home/ScreenPrintingFeature";
import EmbroideryFeature from "@/components/home/EmbroideryFeature";
import DTFFeature from "@/components/home/DTFFeature";
import FinishingFeature from "@/components/home/FinishingFeature";
import EmbroideryShowcase from "@/components/home/EmbroideryShowcase";
import ContractPositioning from "@/components/home/ContractPositioning";
import ClientCredibility from "@/components/home/ClientCredibility";
import WorkGallery from "@/components/home/WorkGallery";
import FinalCta from "@/components/home/FinalCta";

// The real homepage, parked here while /home shows the coming-soon page
// and "/" sends visitors to the login chooser. Not linked from anywhere
// public — lets work on the full build continue and stay reviewable
// ahead of launch.
export default function Preview() {
  return (
    <div id="top">
      <Header />

      <main>
        <Hero />
        <MobileHeroGrid />

        <ServicesOverview />

        <ScreenPrintingFeature
          title="Screen Printing"
          description="Photo-Realistic, spot-color, and specialty ink printing built for production runs — not just samples. Consistent registration and color match from the first unit to the last."
          bullets={[
            "Full package printing — specializing in photo-realistic artwork, up to 14 colors",
            "Specialty inks: puff, discharge, metallic",
            "Fully automatic M&R machines, modified for JUMBO/Allover prints",
            "Free samples / no setup cost on orders 500pcs+",
          ]}
          useCases={["Bulk runs", "Tour merch", "Brand drops", "Licensing programs"]}
          moq="144 pcs per style/design/SKU"
          leadTime="7–10 business days after approval (TBD)"
        />

        <EmbroideryFeature
          title="Embroidery"
          description="Precision stitching using Barudan embroidery machines — specializing in 3D embroidery, split jacket, tackle twill, and appliqué."
          bullets={[
            "High-density foam",
            "In-house digitizing",
            "Free samples / no setup cost on orders 500+",
          ]}
          useCases={["Hats", "Polos", "Fleece", "Premium uniform programs"]}
          moq="Starting at 75 pcs"
          leadTime="Samples 2–4 business days; bulk 7–10 business days (project specific)"
          ctaLabel="Start an Embroidery Project"
        />

        <EmbroideryShowcase />

        <DTFFeature
          title="DTF Printing"
          description="Full-color, durable transfers for detailed artwork, gradients, and small-run or on-demand jobs that don't need a full screen setup."
          bullets={[
            "Full-color, photo-real detail",
            "No minimums for small runs",
            "Durable, soft-hand finish",
            "Ideal for same-day samples, photoshoots, and rush jobs",
          ]}
          useCases={["Quick turns", "Multi-color artwork", "Short runs", "Neck labels", "Complex graphics"]}
          moq="No minimum"
          leadTime="Same-day turn for most orders; 3–5 days for jobs requiring application to garments, 50pcs+"
        />

        <ServiceSection
          id="fulfillment"
          code="FUL"
          title="Fulfillment"
          description="Pick, pack, and ship straight from the production floor — direct to your customer, your retail partners, or your tour stops."
          bullets={[
            "Pick, pack & ship",
            "Direct-to-consumer and B2B",
            "Inventory storage & kitting",
            "Packing slips provided for every order",
          ]}
          useCases={["Kitting", "Packaging", "Drop shipping", "Program-based distribution"]}
          video="/videos/services/fulfillment.mp4"
          reverse
          tone="alt"
        />

        <FinishingFeature
          title="Finishing"
          description="Tagging, folding, poly-bagging, and final quality control — every unit checked and finished to spec before it leaves the building."
          bullets={["Tagging & labeling", "Folding & poly-bagging", "Final QC on every unit"]}
          useCases={["Folding", "Bagging", "Tagging", "Labeling & relabeling", "Retail presentation"]}
        />

        <ContractPositioning />
        <ClientCredibility />
        <WorkGallery />
        <FinalCta />
      </main>
    </div>
  );
}
