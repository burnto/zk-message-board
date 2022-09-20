import { Field, isReady, PrivateKey, PublicKey, shutdown } from 'snarkyjs';
import { Message } from './message';

import { createLocalBlockchain, localDeploy } from './test-utils';

describe('Message', () => {
  let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey;

  beforeEach(async () => {
    await isReady;
    deployerAccount = createLocalBlockchain();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
  });

  afterAll(async () => {
    setTimeout(shutdown, 0);
  });

  it('generates and deploys the `Message` smart contract with zero values', async () => {
    const zkAppInstance = new Message(zkAppAddress);
    await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
    expect(zkAppInstance.message.get()).toEqual(Field.zero);
    expect(zkAppInstance.messageHistoryHash.get()).toEqual(Field.zero);
  });
});
