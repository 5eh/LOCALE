#!/bin/bash

/usr/bin/moonbeam \
	--name moonbase-local-col-1 \
	--node-key def806d6edf417f16d0990d71460ca508422c8b89cc4ac2deea8cc0af2acc92c \
	--chain /tmp/zombie-64219d349808ffc8f39b89023aa19091_-483939-nQb2Hs2zdN8F/moonbase-local-col-1/cfg/moonbase-local_rococo-local-1000.json \
	--base-path /tmp/zombie-64219d349808ffc8f39b89023aa19091_-483939-nQb2Hs2zdN8F/moonbase-local-col-1/data \
	--listen-addr /ip4/0.0.0.0/tcp/44979/ws \
	--prometheus-external --rpc-cors all \
	--unsafe-rpc-external \
	--rpc-methods unsafe \
	--prometheus-port 40501 \
	--rpc-port 9949 \
	--collator \
	-- \
	--chain /tmp/zombie-64219d349808ffc8f39b89023aa19091_-483939-nQb2Hs2zdN8F/moonbase-local-col-1/cfg/rococo-local.json \
	--execution wasm \
	--port 39795 \
	--rpc-port 34513
