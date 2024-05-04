# XCM

## Install Binaries

1. `wget https://github.com/paritytech/polkadot/releases/tag/v0.9.43/polkadot`
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
14. `polkadot --version && oak-collator --version && moonbeam --version && zombienet version`

```
polkadot 0.9.43-ba42b9ce51d
oak-collator 2.0.0-a3ffd039d1a
moonbeam 0.32.2-d3172714146
1.3.100
```

15. `cat moonbase.toml`

## Run the process

1. `cd ~/packages/xcm/src`
2. `zombienet spawn ./moonbase.toml`
3. `cd ~/packages/xcm/src/moonbeam/contracts/`
4. `npx hardhat compile`
5. `npx hardhat run ./scripts/deploy.js`
6. `export CONTRACT_ADDRESS="<PASTEININCREMENTERCONTRACTADDRESS>"`
7. `cd ~/packages/xcm/`
8. `npm run moonbeam-local`
9. `<Error should appear, work in progress>`
