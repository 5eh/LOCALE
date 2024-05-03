import {
  FACEBOOK_HANDLE,
  INSTAGRAM_HANDLE,
  LINKEDIN_HANDLE,
  TWITTER_HANDLE,
  WEB3_FUNCTIONALITY,
} from "~~/marketplaceVariables";

const Footer = () => {
  const navigation = {
    solutions: [
      { name: "Systems", href: "#" },
      { name: "Marketing", href: "#" },
      { name: "Insights", href: "#" },
    ],
    support: [
      { name: "Investors", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Guides", href: "#" },
      { name: "API Status", href: "#" },
    ],
    legal: [
      ...(WEB3_FUNCTIONALITY ? [{ name: "Blockchain Policy", href: "#" }] : []),
      { name: "Markeptlace Policy", href: "#" },
      { name: "Terms of Use", href: "#" },
    ],
  };

  return (
    <>
      <footer className="relative pt-4 mt-6 sm:mt-4" aria-labelledby="footer-heading">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <p className="text-sm leading-6 text-black dark:text-gray-300">ENABLING GLOBAL ENTREPRENEURSHIP</p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-black dark:text-white">Solutions</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.solutions.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-800 dark:text-gray-300 hover:text-primary transition ease-in dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-black dark:text-white">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.support.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-800 dark:text-gray-300 hover:text-primary transition ease-in dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white"
                        >
                          {item.name
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-black dark:text-white">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.legal.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-800 dark:text-gray-300 hover:text-primary transition ease-in dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="1/2 mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; 2020 Marketplace of Arthur Labs. All rights reserved.
            </p>

            <div className="flex gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                <a href={FACEBOOK_HANDLE} target="_blank">
                  FACEBOOK
                </a>
              </span>
              <span className="inline-flex items-center rounded-md bg-pink-50 px-1.5 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                <a href={INSTAGRAM_HANDLE} target="_blank">
                  INSTAGRAM
                </a>
              </span>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                <a href={TWITTER_HANDLE} target="_blank">
                  TWITTER
                </a>
              </span>
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                <a href={LINKEDIN_HANDLE} target="_blank">
                  LINKEDIN
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
