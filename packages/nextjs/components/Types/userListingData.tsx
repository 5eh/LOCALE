// src/components/Types/userListingData.tsx

export interface Features {
  feature: string;
  value: string | number;
}

export interface Upcharge {
  upcharge: string;
  value: string | number;
}

export interface Listing_Data {
  listingID: string;
  title: string;
  description: string;
  price: number;
  photo: string; // URL or file path
  location: string; // Format: 'City, State'
  quantityOfService: number;
  creator: string | number;
  userWallet: string; // Must start with '0x'
  serviceType: string;
  features: Features[];
  upcharges: Upcharge[];
  timeCreated: string;
}
