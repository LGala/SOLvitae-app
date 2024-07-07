import { ResumeData } from "./page";

export async function createResume() {
  // to simulate an API call
  return new Promise(resolve => setTimeout(resolve, 1 * 1000));
}

export async function uploadResume(resumeData: ResumeData) {
  console.log({ resumeData })

  // to simulate an API call
  return new Promise(resolve => setTimeout(resolve, 1 * 1000));
}