// nextjs/app/create/page.tsx

import Link from "next/link";
import Footer from "~~/components/footer";
import { Navbar } from "~~/components/navbar";
import { FORM_SELECTION } from '~~/marketplaceVariables/form'

export default function Create() {
  return (
    <>
      <div className="bg-gray-900">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Arthur Labs</span>
                <img />
              </a>
            </div>
            <Navbar />
            <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
          </nav>
        </header>

        <main className="relative isolate">
          {/* Background */}
          <div
            className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>

          {/* Main */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:pt-24">
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr sm:grid-cols-2 md:grid-cols-3 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {FORM_SELECTION.map(service => (
                <article
                  key={service.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                  <img src={service.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <h3 className="mt-3 text-lg font-semibold leading-6 center text-white">
                    <Link
                      href={{
                        pathname: "/create/form",
                        query: {
                          id: service.id,
                          title: service.title,
                        },
                      }}
                    >
                      <span className="absolute inset-0" />
                      {service.title.toUpperCase()}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
