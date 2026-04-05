import { SUBSCRIPTION_PLANS } from '../constants/subscriptions';

/**
 * Calculates the Haversine distance between two points in kilometers.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const calculateProviderScore = (provider, userCoords = null) => {
  const tierWeights = SUBSCRIPTION_PLANS.reduce((acc, plan) => ({
    ...acc,
    [plan.tier]: plan.weight
  }), { 'Free': 0 });

  // 1. Ad Ranking (Subscription Tier + Active Ads)
  // Higher tiers get massive base score boosts for priority placement
  let score = tierWeights[provider.subscription?.type] || 0;
  
  // Boost for providers specifically running manual ad campaigns
  if (provider.hasActiveAds) {
    score += 800; // Boost equivalent to a high-tier placement
  }

  // 2. Proximity Scoring (Organic + Relevance)
  if (userCoords && provider.coords) {
    const dist = calculateDistance(
      userCoords.lat, 
      userCoords.lng, 
      provider.coords.lat, 
      provider.coords.lng
    );
    
    // Within 1km - 10km range boosts
    if (dist <= 1) score += 800; // Ultra-local
    else if (dist <= 5) score += 400; // Very close
    else if (dist <= 10) score += 200; // Nearby
    
    // Penalty for distance in "Local Search"
    if (dist > 20) score -= 100 * (dist / 20);
  }

  // 3. Performance Metrics (Organic)
  // totalVisits: 2 points per visit (simulating popularity)
  score += (provider.metrics?.totalVisits || 0) * 2;
  
  // consultationHistory: 20 points per completed consultation
  score += (provider.metrics?.consultationHistory?.completed || 0) * 20;

  // 4. Availability Bonus
  // If provider has slots today, boost!
  if (provider.availability?.todayHasSlots) {
    score += 300;
  }

  // 5. Rating Weight
  score += (parseFloat(provider.rating || 0) * 50);

  return score;
};

export const rankProviders = (providers, userCoords = null) => {
  return [...providers].sort((a, b) => {
    const scoreA = calculateProviderScore(a, userCoords);
    const scoreB = calculateProviderScore(b, userCoords);
    return scoreB - scoreA;
  });
};
