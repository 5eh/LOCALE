import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import Background from '~~/components/background';
import Footer from '~~/components/footer';
import { Navbar } from "~~/components/navbar";
import {
  COMPANY,
  MARKETPLACE_DESCRIPTION,
  MARKETPLACE_HEADER,
  MARKETPLACE_NAME,
  WEB3_FUNCTIONALITY,
} from "~~/marketplaceVariables";
import "~~/styles/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

const title = `${MARKETPLACE_NAME} | ${MARKETPLACE_HEADER}  `;
const titleTemplate = `%s | ${MARKETPLACE_NAME}`;
const description = `${MARKETPLACE_DESCRIPTION}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <div className="dark:bg-gray-900 bg-gray-100">
          <header className="absolute inset-x-0 top-0 mt-10 mb-2 z-1">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">{COMPANY}</span>
                </a>
              </div>

              <Navbar />
              <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
          
            </nav>
          </header>

          <main className="relative isolate">
          <Background />

            <section className="">
              <ThemeProvider enableSystem>
                {WEB3_FUNCTIONALITY ? <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders> : children}
              </ThemeProvider>
            </section>
          </main>

          <div className=''>
            <Footer />
            </div>
        </div>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
