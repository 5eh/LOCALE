// src/components/Types/userTestData.tsx
/* ESLINT-DISABLE */
import { Service_Provider } from './publicUserData';
import { Listing_Data } from './userListingData';

interface CombinedUserListing {
  user: Service_Provider;
  listings: Listing_Data[];
}

export const listingTestData: Listing_Data[] = [
  {
    listingID: '1',
    title: 'Landscape Photography Session',
    description:
      'Professional landscape photography services in New York. Professional landscape photography services in New York. Professional landscape photography services in New York. Professional landscape photography services in New York.Professional landscape photography services in New York.  Professional landscape photography services in New York. Professional landscape photography services in New York.Professional landscape photography services in New York. Professional landscape photography services in New York.',
    location: 'New York, NY',
    features: [
      { feature: 'Duration', value: '2 hours' },
      { feature: 'Equipment', value: 'Professional DSLR' },
    ],
    upcharges: [
      { upcharge: 'Extra Hour', value: 100 },
      { upcharge: 'Travel Outside City', value: 150 },
    ],
    photo:
      'https://images.unsplash.com/photo-1542203061-00428f2ee9ea?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 500,
    creator: '1',
    userWallet: '0x123abc',
    quantityOfService: 5,
    serviceType: 'Photography',
    timeCreated: '2021-03-01',
  },
  {
    listingID: '2',
    title: 'Portrait Photography Package',
    description: 'High-quality portrait sessions available.',
    location: 'New York, NY',
    features: [
      { feature: 'Session Length', value: '1 hour' },
      { feature: 'Photo Edits', value: '10 Photos' },
    ],
    upcharges: [
      { upcharge: 'Additional Edits', value: 50 },
      { upcharge: 'Location Change', value: 75 },
    ],
    photo:
      'https://images.unsplash.com/photo-1697823101733-5cca1a807a8a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
    creator: '1',
    userWallet: '0x123abc',
    quantityOfService: 10,
    serviceType: 'Portrait',
    timeCreated: '2021-03-01',
  },
  {
    listingID: '3',
    title: 'Portrait Photography Package',
    description: 'High-quality portrait sessions available.',
    location: 'New York, NY',
    features: [
      { feature: 'Session Length', value: '1 hour' },
      { feature: 'Photo Edits', value: '10 Photos' },
    ],
    upcharges: [
      { upcharge: 'Additional Edits', value: 50 },
      { upcharge: 'Location Change', value: 75 },
    ],
    photo:
      'https://images.unsplash.com/photo-1517988125222-aa07cf3ba98b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
    creator: '2',
    userWallet: '0x123abc',
    quantityOfService: 10,
    serviceType: 'Portrait',
    timeCreated: '2023-03-01',
  },
  {
    listingID: '4',
    title: 'Portrait Photography Package',
    description: 'High-quality portrait sessions available.',
    location: 'New York, NY',
    features: [
      { feature: 'Session Length', value: '1 hour' },
      { feature: 'Photo Edits', value: '10 Photos' },
    ],
    upcharges: [
      { upcharge: 'Additional Edits', value: 50 },
      { upcharge: 'Location Change', value: 75 },
    ],
    photo:
      'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
    creator: '2',
    userWallet: '0x123abc',
    quantityOfService: 10,
    serviceType: 'Portrait',
    timeCreated: '2023-03-01',
  },
  {
    listingID: '5',
    title: 'Portrait Photography Package',
    description: 'High-quality portrait sessions available.',
    location: 'New York, NY',
    features: [
      { feature: 'Session Length', value: '1 hour' },
      { feature: 'Photo Edits', value: '10 Photos' },
    ],
    upcharges: [
      { upcharge: 'Additional Edits', value: 50 },
      { upcharge: 'Location Change', value: 75 },
    ],
    photo:
      'https://images.unsplash.com/photo-1516900557549-41557d405adf?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
    creator: '3',
    userWallet: '0x123abc',
    quantityOfService: 1,
    serviceType: 'Portrait',
    timeCreated: '2024-03-01',
  },
  {
    listingID: '6',
    title: 'Portrait Photography Package',
    description: 'High-quality portrait sessions available.',
    location: 'New York, NY',
    features: [
      { feature: 'Session Length', value: '1 hour' },
      { feature: 'Photo Edits', value: '10 Photos' },
    ],
    upcharges: [
      { upcharge: 'Additional Edits', value: 50 },
      { upcharge: 'Location Change', value: 75 },
    ],
    photo:
      'https://images.unsplash.com/photo-1542203061-00428f2ee9ea?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
    creator: '3',
    userWallet: '0x123abc',
    quantityOfService: 1,
    serviceType: 'Portrait',
    timeCreated: '2024-03-01',
  },
];

export const userTestData: Service_Provider[] = [
  {
    _id: '1',
    email: 'photographer1@example.com',
    phone: '123-456-7890',
    name: 'John Doe',
    amountOfReviews: 10,
    rating: 4.5,
    location: 'New York',
    verifications: {
      phone: true,
      email: true,
      region: true,
      passport: false,
    },
    backgroundBanner: 'banner1.jpg',
    badges: ['Top Rated', 'Creative Eye'],
    about: {
      born: '1980-01-01',
      hobbies: ['Photography', 'Traveling'],
      funFact: 'Photographed in over 30 countries',
      raisedIn: 'California',
      worksAt: 'Freelance',
      years: 15,
    },
    media: {
      mediaLinkOne: 'https://instagram.com',
      mediaLinkTwo: 'https://facebook.com',
      mediaLinkThree: 'https://linkedin.com',
    },
    username: 'john_doe',
    listings: ['1', '2'],
    avatar:
      'https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Specializing in landscape and portrait photography.',
    dateCreated: '2021-03-01',
  },
  {
    _id: '2',
    email: 'photographer2@example.com',
    phone: '987-654-3210',
    name: 'Mary Anne',
    amountOfReviews: 5,
    rating: 4.8,
    location: 'London',
    verifications: {
      phone: true,
      email: false,
      region: false,
      passport: true,
    },
    backgroundBanner: 'banner2.jpg',
    badges: ['Rising Star', 'Most Creative'],
    about: {
      born: '1990-05-15',
      hobbies: ['Nature Photography', 'Blogging'],
      funFact: 'Has a photography blog with over 10k followers',
      raisedIn: 'Paris',
      worksAt: 'Nature Magazine',
      years: 7,
    },
    media: {
      mediaLinkOne: 'media4.jpg',
      mediaLinkTwo: 'media5.jpg',
      mediaLinkThree: 'media6.jpg',
    },
    username: 'mary_anne',
    listings: ['3', '4'],
    avatar:
      'https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Passionate about capturing nature’s beauty.',
    dateCreated: '2021-23-01',
  },
  {
    _id: '3',
    email: 'photographer3@example.com',
    phone: '555-666-7777',
    name: 'Steve Jobs',
    amountOfReviews: 20,
    rating: 4.9,
    location: 'Tokyo',
    verifications: {
      phone: true,
      email: true,
      region: true,
      passport: true,
    },
    backgroundBanner: 'banner3.jpg',
    badges: ['Veteran', 'Best Portfolio'],
    about: {
      born: '1985-08-20',
      hobbies: ['Urban Photography', 'Teaching'],
      funFact: 'Runs photography workshops worldwide',
      raisedIn: 'Sydney',
      worksAt: 'Freelance',
      years: 12,
    },
    media: {
      mediaLinkOne: 'media7.jpg',
      mediaLinkTwo: 'media8.jpg',
      mediaLinkThree: 'media9.jpg',
    },
    username: 'Steve_jobs',
    listings: ['5', '6', '7'],

    avatar:
      'https://images.unsplash.com/photo-1604339454409-701c5278c546?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Specializes in urban scenes and street photography.',
    dateCreated: '2024-03-24',
  },
];

const combinedUserAndListingData = (
  users: Service_Provider[],
  listings: Listing_Data[]
): CombinedUserListing[] => {
  return users.map((user) => {
    const userListingData = listings.filter((listing) =>
      user.listings.includes(listing.listingID)
    );
    return {
      user: user,
      listings: userListingData,
    };
  });
};

export const combinedData = combinedUserAndListingData(
  userTestData,
  listingTestData
);
