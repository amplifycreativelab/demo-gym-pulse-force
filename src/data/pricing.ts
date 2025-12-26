import { PricingTierSchema } from "./schemas";

export const pricingTiers = [
    {
        id: "trial",
        name: "7-Day Trial",
        price: "$0",
        period: "first week",
        features: [
            "Initial Assessment",
            "All Class Access",
            "Forge App Access",
            "No Commitment",
        ],
        cta: "Forge Your Path",
    },
    {
        id: "standard",
        name: "Forge Standard",
        price: "$35",
        period: "per week",
        features: [
            "UNLIMITED Training",
            "Monthly Review",
            "Guest Passes (2/mo)",
            "Standard Forge Kit",
        ],
        isPopular: true,
    },
    {
        id: "elite",
        name: "Forge Elite",
        price: "$55",
        period: "per week",
        features: [
            "Everything in Standard",
            "Personalized Macros",
            "1-on-1 Performance Check",
            "Priority Class Booking",
            "Elite Forge Kit",
        ],
    },
].map(p => PricingTierSchema.parse(p));
