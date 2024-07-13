import { ResumeData } from "./page";
import { createMintAccountWithMetadata } from "./scripts/create-mint-account-with-metadata";

export async function createResume(): Promise<void> {
  // create new airdropped wallet 
}

export async function uploadResume(resumeData: ResumeData): Promise<void> {
  console.log({ resumeData })

  console.log("Creation of Mint Account with metadata...");
  await createMintAccountWithMetadata(resumeData.companyName, resumeData.contractType, resumeData.roleStartedDate, resumeData.roleEndedDate, resumeData.workModel, resumeData.jobPosition, resumeData.jobPositionDescription);

  // to simulate an API call
  return new Promise(resolve => setTimeout(resolve, 1 * 1000));
}