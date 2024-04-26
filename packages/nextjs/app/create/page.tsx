// nextjs/app/create/page.tsx

import Link from "next/link";
import { FORM_SELECTION } from '~~/marketplaceVariables/form'

export default function Create() {
  return (
    <>

          <div className="mx-auto max-w-7xl  x-6 lg:px-8 md:pt-24 lg:pt-24">
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

    </>
  );
}
