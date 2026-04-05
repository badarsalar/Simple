import { Zap, Sparkles, Crown } from 'lucide-react';

export const SUBSCRIPTION_PLANS = [
  {
    tier: 'Platinum',
    label: 'Basic',
    price: '49',
    color: 'purple',
    icon: Zap,
    features: [
      { name: 'Ads Manager', value: 'Limited' },
      { name: 'Analytics', value: 'Basic' }
    ],
    weight: 300,
    popular: false
  },
  {
    tier: 'Gold',
    label: 'Pro',
    price: '99',
    color: 'amber',
    icon: Sparkles,
    features: [
      { name: 'Ads Manager', value: 'Standard' },
      { name: 'Analytics', value: 'Standard' }
    ],
    weight: 600,
    popular: true
  },
  {
    tier: 'Diamond',
    label: 'Premium',
    price: '149',
    color: 'sky',
    icon: Crown,
    features: [
      { name: 'Ads Manager', value: 'Full Control' },
      { name: 'Analytics', value: 'Advanced' }
    ],
    weight: 1000,
    popular: false
  }
];

export const getPlanByTier = (tier) => SUBSCRIPTION_PLANS.find(p => p.tier === tier) || { 
  tier: 'Free', 
  label: 'Standard', 
  price: '0', 
  weight: 0, 
  features: [
    { name: 'Daily Slots', value: '3' },
    { name: 'Listing', value: 'Standard' },
    { name: 'Support', value: 'Email' }
  ] 
};
