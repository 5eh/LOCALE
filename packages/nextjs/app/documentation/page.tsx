import React from "react";
import { Guides } from "~~/components/docComponents/Guides";
import { Resources } from "~~/components/docComponents/Resources";
import { HeroPattern } from "~~/components/docComponents/HeroPattern";
import { Button } from "~~/components/docComponents/Button";
import { SectionProvider } from "~~/components/docComponents/SectionProvider";

export const metadata = {
  title: "API Documentation",
  description: "Learn everything there is to know about the Protocol API and integrate Protocol into your product.",
};

export const sections = [
  { title: "Guides", id: "guides" },
  { title: "Resources", id: "resources" },
];

const APIDocumentation: React.FC = () => {
  return (
    <SectionProvider sections={sections}>
      <div>
        <HeroPattern />

        <h1>API Documentation</h1>
        <p className="lead">
          Use the Protocol API to access contacts, conversations, group messages, and more and seamlessly integrate your
          product into the workflows of dozens of devoted Protocol users.
        </p>

        <div className="not-prose mb-16 mt-6 flex gap-3">
          <Button href="/quickstart" arrow="right">
            <>Quickstart</>
          </Button>
          <Button href="/sdks" variant="outline">
            <>Explore SDKs</>
          </Button>
        </div>

        <h2>Getting started</h2>
        <p className="lead">
          To get started, create a new application in your <a href="#">developer settings</a>, then read about how to
          make requests for the resources you need to access using our HTTP APIs or dedicated client SDKs. When your
          integration is ready to go live, publish it to our <a href="#">integrations directory</a> to reach the
          Protocol community.
        </p>

        <div className="not-prose">
          <Button href="/sdks" variant="text" arrow="right">
            <>Get your API key</>
          </Button>
        </div>

        <Guides />
        <Resources />
      </div>
    </SectionProvider>
  );
};

export default APIDocumentation;
