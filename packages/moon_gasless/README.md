# Moonbeam Gasless

A tiny README.md for our gasless exploration.

We explored how to use gasless permit to minder the friction for a web3 commerce site.

We used foundry because of the clone contracts directly from etherscan. The tutorial uses DPS contracts, which are not publicly availabe in a repo but it was verifid in moonscan. We had deployment issue for the `moonbeam --dev` thing. These things got solved. We discovered the `--sealing` flag. Nontheless deployment with foundry struggled but deployment with hardhat works fine.

We choose to get it locally running because the intergration with the moonbase zombienet node was in our head.

Anyways, then deadline came closer and time was better spend somewhere else.

The foundry error:

![FoundryImage](https://i.ibb.co/Yb21LD6/image.png)
