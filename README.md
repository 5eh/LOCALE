<div align="center">
<img src="https://i.ibb.co/CMKZrPj/Group-1739.png" alt="logo" width="120" height="120" />
</div>

<h3 align="center">LOCALE</h3>
  <p align="center">
  <br />
    <a href="https://drive.google.com/file/d/1cQzj4q9q7yn0LPZ4G287Bjo_bN-n7KkM/view?usp=sharing">Youtube</a>
    ·
    <a href="https://drive.google.com/file/d/1Lt-Ocd0fLM6UAZ5BbDNExJSKPsVkLkG4/view?usp=sharing">Long Video</a>
    ·
    <a href="https://github.com/5eh/LOCALE">Repo</a>
  </p>
</div>

### Intro

![Screenshot](https://i.ibb.co/nCW7Pkj/image-2024-05-06-093903626.png)

We're Arthur Labs. We develop open source marketplace boilerplates that reduce the time it takes for developers and entrepreneurs to bring ideas to Web3 by 94%, from 6-12 months to 1 week. Our test case LOCALE is a Web3 enhanced commerce platform for plants.

In Polkadot Global Hackathon - North America Editino we explored XCM as a price feed mechanism. Please check out `./packages/xcm/README.md` for further docs.

Later on we switch to use xc20 to make enable payments without swaping tokens around. See `./packages/xc-20_transfer/README.md`.

The implentation of xc-20 transfers can be found here `./packages/nextjs/components/buttons/SendxcUnit.tsx`.

<details>
  <summary>Read the Backstory</summary>
  Watson participated in a accelator over the last 3 months.
  In the last weeks of the programm, he created Locale. See commit history.
  Watson, Bright, Mork and Frank were in a chat and decided to bring this on the Hack and explore price feed mechanism via xcm and add it to LOCALE.
</details>

### Quick start

1.  `Git clone`
2.  `npm install`
3.  `npm run chain`
4.  `npm run deploy`
5.  `cd packages/nextjs`
6.  `.env` - Read comments [here](https://github.com/5eh/LOCALE/blob/main/packages/nextjs/.env.example)
7.  `npm run start`


### Deep dive

Check the READMEs in the individual package folders

[Configure a new marketplace!](https://github.com/5eh/LOCALE/blob/main/packages/nextjs/marketplaceVariables/readme.md)

[LOCALE frontend](https://github.com/5eh/LOCALE/tree/main/packages/nextjs#readme)

[Smart contracts and hardhat deployment](https://github.com/5eh/LOCALE/blob/main/packages/hardhat/README.md)

[Moonbeam gasless TXs](https://github.com/5eh/LOCALE/blob/main/packages/moon_gasless/README.md)

[Moonbeam XC20 cross-chain payments]()

[OAK Network -> Moonbeam cross-chain calls](https://github.com/5eh/LOCALE/tree/main/packages/xcm#readme)


### Contact

| Name           | DC            | TG           | Mail                        |
| :------------- | :------------ | :----------- | :-------------------------- |
| Watson         | `watsonlr`    | `watsonlr`   | `wlewisrodriguez@gmail.com` |
| Frank Dierolf  | `frankbevr`   | `frankbevr`  | `frank_dierolf@web.de`      |
| Opeyemi Oginni | `obo.baddest` | `McFarts_II` | `brightoginni123@gmail.com` |
| Mork Morkberg  | `morkeltry`   |              |                             |
