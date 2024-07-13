import { ResumeData } from "./page";
import { createMintAccountWithMetadata } from "./scripts/create-mint-account-with-metadata";
import { createTokenAccountAndMintNFT } from "./scripts/create-token-account-and-mint-NFT";

export async function createResume(): Promise<void> {
  // to simulate an API call
  return new Promise(resolve => setTimeout(resolve, 1 * 1000));
}

export async function uploadResume(resumeData: ResumeData): Promise<void> {
  console.log({ resumeData })

  console.log("Creation of Mint Account with metadata...");
  await createMintAccountWithMetadata(resumeData.companyName, resumeData.contractType, resumeData.roleStartedDate, resumeData.roleEndedDate, resumeData.workModel, resumeData.jobPosition, resumeData.jobPositionDescription);
  
  console.log("Creation of Token Account and minting NFT...")
  await createTokenAccountAndMintNFT();
  
  // to simulate an API call
  return new Promise(resolve => setTimeout(resolve, 1 * 1000));
}