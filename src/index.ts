import 'global-agent/bootstrap';
import { ethers } from 'ethers';
import { getAddresses } from './addresses';
import fs from 'fs';

async function ETHBalance(addresses: string[], provider: ethers.Provider) {
  const balances = await Promise.all(addresses.map((address) => provider.getBalance(address)));
  let sum = 0;
  balances.forEach((balance) => sum += Number(ethers.formatEther(balance)));
  return sum;
}

async function ERC20Balance(addresses: string[], contractAddress: string, provider: ethers.Provider) {
  const contract = new ethers.Contract(contractAddress, ['function balanceOf(address addr) view returns (uint)'], provider);
  const balances = await Promise.all(addresses.map((address) => contract.balanceOf(address)));
  let sum = 0n;
  balances.forEach((balance) => sum += balance);
  return sum;
}

async function main() {
  const addresses = getAddresses(fs.readFileSync('./.addresses.txt', 'utf8'));
  const provider = new ethers.JsonRpcProvider('https://arbitrum-mainnet.infura.io/v3/89d62adb179b4b7a8f028347dd5a1cc5');
  const k = await ETHBalance(addresses, provider);
  console.log(k);
  // const k = await ERC20Balance(addresses, '0x912CE59144191C1204E64559FE8253a0e49E6548', provider)
}

main();
