import { ApiPromise, WsProvider } from "@polkadot/api"; // Version 9.13.6
import fs from "node:fs";

const getXc20s = async () => {
  // 1. Create API provider
  const substrateProvider = new WsProvider(
    "wss://wss.api.moonbase.moonbeam.network"
  );
  const api = await ApiPromise.create({ provider: substrateProvider });

  // 2. Query the assets pallet for all assets
  const assets = await api.query.assets.asset.entries();

  // Create an array to store the results
  const results = [];

  // 3. Get metadata for each asset using the ID
  for (const [
    {
      args: [id],
    },
  ] of assets) {
    const metadata = await api.query.assets.metadata(id);
    results.push({
      assetId: id.toString(),
      metadata: metadata.toHuman(),
    });
  }

  // Write the results to a file
  fs.writeFileSync("results.json", JSON.stringify(results, null, 2));

  api.disconnect();
};

getXc20s();

// RUN
// node ./scripts/get-external-xc20.js
