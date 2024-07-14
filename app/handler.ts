import { ResumeData } from "./page";
import { createMintAccountWithMetadataAndMintNFT } from "./scripts/create-mint-account-with-metadata";

export async function createResume(): Promise<void> {
  // Create new wallet with airdrop
  
  // To simulate an API call
  return new Promise(resolve => setTimeout(resolve, 1 * 1000));
}

export async function uploadResume(resumeData: ResumeData): Promise<void> {
  console.log({ resumeData })

  console.log("Creation of Mint Account with metadata...");
  return await createMintAccountWithMetadataAndMintNFT(resumeData.companyName, resumeData.contractType, resumeData.roleStartedDate, resumeData.roleEndedDate, resumeData.workModel, resumeData.jobPosition, resumeData.jobPositionDescription);
}