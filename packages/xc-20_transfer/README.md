# XC20 Transfer via nodeJS

## The Backstory

Checkout the backstory [here](./../xcm/README.md)

## The Story

After our semi successfull process with oak network and our price feed mechanism idea, we switched.

The new Idea was the following:

![The main Idea](https://i.ibb.co/ZYPJK3T/a4dfa3d0-c5fb-41c8-ae79-fdfc1e288475.jpg)

- Using xcm to recieves payments from multiple parachains.
- Aiming for reducing the friction of a sell / buy.
- Aiming for further reach of marketplaces. More Customers for a Seller from other chains.

![Our TestImplentation](https://i.ibb.co/qM7r2LN/2b90ac8c-4fb0-463d-adcb-c8bac76e60fd.jpg)

### Our process

We checkout moonbeam docs.
We created new packages to test how xc20 is working.
We implented it with Moonbase Alpha Network.
We explored the network.

- The Moonbase Alpha chain has a relay chain
- This relaychain doesn't include other parachains.

We followed the docs from moonbeam and re-adjusted the provided transfer script to make it work.
We created Button on the frontend and implented the adjusted transfer NodeJS script in a Browser compatible function.
We included the Button and checked the Moonbase Alpha Blockexplorer.

In the process we encountered the limitation of a zombienet. XC20 sending thruh a local polkadot network requires registering xc20 on the governance. Kind of a overkill.
