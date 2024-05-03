import { askScheduleAction } from "../common/utils";
import { scheduleTask } from "./common";
import { chains } from "@oak-network/config";
import Keyring from "@polkadot/keyring";
import { hexToU8a } from "@polkadot/util";
import { cryptoWaitReady } from "@polkadot/util-crypto";

console.log(chains);
