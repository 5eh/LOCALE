// src/components/Types/publicUserData.tsx



// Interface for the verification details
export interface Verification {
  phone: boolean;
  email: boolean;
  region: boolean;
  passport: boolean;
}

// Interface for the 'about' section of a photographer
export interface About {
  born: string;
  hobbies: string[];
  funFact: string;
  raisedIn: string;
  worksAt: string;
  years: number;
}

// Interface for the media links
export interface Media {
  mediaLinkOne: string;
  mediaLinkTwo: string;
  mediaLinkThree: string;
}

// Main interface for the photographer's public data
export interface Service_Provider {
  _id: string;
  email: string;
  phone: string;
  name: string;
  amountOfReviews: number;
  rating: number;
  location: string;
  verifications: Verification;
  backgroundBanner: string;
  badges: string[];
  about: About;
  media: Media;
  username: string;
  listings: string[];
  avatar: string;
  bio: string;
  dateCreated: string;
}
