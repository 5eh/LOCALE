# XCM

## Intro

This is our XCM Exploration.  
Our goal was to create a simple price feed mechanism via XCM.  
The current default is using oracles.  
If you wanna know more about price feed, checkout [Chainlink docs - Price feed](https://docs.chain.link/data-feeds/price-feeds)  
We checkout the [XCM-Demo](https://github.com/OAK-Foundation/xcm-demo/tree/master). We settled on the Section `Moonbeam EVM smart contract automation`.

## Our Struggles

1. Getting the right binaries  
    Oak Collar - We submitted a [Issue](https://github.com/OAK-Foundation/xcm-demo/issues/113) to the Repo  
    Moonbeam - Moonbeam binary only showed runtime. Tried compiling the source code. It failed. Next version worked smoothly had downloadable binary. It worked.  
   After finding all correct version, zombienet spawn up. 🥳

2. How to work with Zobmienet
   We had to modified the provided [moonbase.toml](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/zombienets/turing/moonbase.toml) file to our local binaries.  
   That was not obvious in the beginning. At least a bit annoying. But ok.

3. Deploy via hardhat
   We encountered Issues, couldn't figured out in the first place where to look why deployment doesnt work.
   Is it zombienet, is it moonbeam. Is it the rpc port of xxx. Yeah, took a while.
   We followed the following steps.

   - Deploy on hardhat node
   - Spin up a moonbeam --dev, deploy on moonbeam. It didn't worked.
   - Solution was to use moonbeam in the following way `moonbeam --dev --ws-external --rpc-external --sealing 100`
   - Next up to spin up zombienet and deploy it there. It worked. Yeay ^^

4. Use moonbase-local.js scripts  
   This was horrible. First there are a bunch of polkadot warnings. Somewhen we solved that by locking the version. Alias remove the cartet in package.json. We tooked the time to look in the necessary repos and locked the right version. Ask Bright for more, I was typing he was github'ing. In the end it was not responsible for the working.
   Then there was a issue with xcm, it says version 2 not found use version 3. Then you add version 3 and it wants version 2. And then we rabbitholed us a bit thruh and in the beginning of the last weekend, we shifted to xc20. To get at least something with xcm working. We were really happy that zombienet worked and how to create a .toml file for chains.

## Our internal setup Instructions.

1. `wget https://github.com/paritytech/polkadot/releases/download/v0.9.43/polkadot`
2. `chmod +755`
3. `mv ./polkadot /usr/bin`
4. `wget https://github.com/OAK-Foundation/OAK-blockchain/releases/download/v2.0.0/oak-collator`
5. `chmod +755 oak-collator`
6. `mv ./oak-collator /usr/bin`
7. `wget https://github.com/moonbeam-foundation/moonbeam/releases/download/v0.32.2/moonbeam`
8. `chmod +755 moonbeam`
9. `mv ./moonbeam /usr/bin`
10. `wget https://github.com/paritytech/zombienet/releases/download/v1.3.102/zombienet-linux-x64`
11. `mv zombienet-linux-x64 zombienet`
12. `chmod +755 ./zombienet`
13. `mv ./zombienet /usr/bin`
14. `POLKADOT_CHAINS_PATH=/usr/bin`
15. `echo if POLKADOT_CHAINS_PATH $POLKADOT_CHAINS_PATH is not in PATH $PATH, then add it with PATH=PATH:$POLKADOT_CHAINS_PATH`
16. `# PATH=PATH:$POLKADOT_CHAINS_PATH`
17. `polkadot --version && oak-collator --version && moonbeam --version && zombienet version`

```
polkadot 0.9.43-ba42b9ce51d
oak-collator 2.0.0-a3ffd039d1a
moonbeam 0.32.2-d3172714146
1.3.100
```

15. `cat moonbase.toml`

### Run the process

1. `cd packages/xcm`
2. `zombienet spawn ./moonbase.toml`
3. `cd packages/xcm/src/moonbeam/contracts/`
4. `npx hardhat compile`
5. `npx hardhat run ./scripts/deploy.js`
6. `export CONTRACT_ADDRESS="<PASTEININCREMENTERCONTRACTADDRESS>"`
7. `cd packages/xcm/`
8. `npm run moonbase-local`
9. `<Error should appear, work in progress>`
