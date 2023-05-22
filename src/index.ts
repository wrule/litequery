import 'global-agent/bootstrap';
import { ethers } from 'ethers';
import { getAddresses } from './addresses';
import fs from 'fs';

async function ethBalance(addresses: string[], provider: ethers.Provider) {
  const balances = await Promise.all(addresses.map((address) => provider.getBalance(address)));
  let sum = 0n;
  balances.forEach((balance) => sum += balance);
  return sum;
}

async function ERC20Balance(addresses: string[], contractAddress: string, provider: ethers.Provider) {
  const token = new ethers.Contract(contractAddress, ['function balanceOf(address addr) view returns (uint)'], provider);
}

async function main() {
  const addresses = getAddresses(fs.readFileSync('./.addresses.txt', 'utf8'));
  const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/89d62adb179b4b7a8f028347dd5a1cc5');
  const sum = await ethBalance(addresses, provider);
  console.log(ethers.formatEther(sum));
}

main();
