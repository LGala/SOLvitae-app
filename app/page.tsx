"use client";
import {
  Button,
  Container,
  Loader,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { createResume, uploadResume } from "./handler";
import { DateInput } from "@mantine/dates";

export interface ResumeData {
  companyName: string;
  contractType: string;
  roleStartedDate: string;
  roleEndedDate: string;
  workModel: string;
  jobPosition: string;
  jobPositionDescription: string;
}

export default function HomePage() {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [isThirdPage, setIsThirdPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function FirstPage() {
    return isFirstPage ? (
      <Button
        onClick={async () => {
          setIsFirstPage(false);
          setIsLoading(true);
          await createResume();
          setIsLoading(false);
          setIsSecondPage(true);
        }}
        mt="sm"
      >
        Add you resume
      </Button>
    ) : null;
  }

  function SecondPage() {
    return isSecondPage ? (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData: any = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );
          setIsSecondPage(false);
          setIsLoading(true);
          await uploadResume(formData);
          setIsLoading(false);
          setIsThirdPage(true);
        }}
      >
        <TextInput
          name="companyName"
          label="Company name"
          placeholder="Company name"
        />
        <Select
          name="contractType"
          label="Contract type"
          placeholder="Contract type"
          data={["full-time", "contractor", "part-time"]}
        />
        <DateInput
          name="roleStartedDate"
          valueFormat="DD MMM YYYY"
          label="Role started"
          placeholder="Role started"
        />
        <DateInput
          name="roleEndedDate"
          valueFormat="DD MMM YYYY"
          label="Role ended"
          placeholder="Role ended"
        />
        <Select
          name="workModel"
          label="Work model"
          placeholder="Work model"
          data={["onsite", "hybrid", "remote"]}
        />
        <TextInput
          name="jobPosition"
          label="Job position"
          placeholder="Job position"
        />
        <TextInput
          name="jobPositionDescription"
          label="Job position description"
          placeholder="Job position description"
        />
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </Container>
      </form>
    ) : null;
  }

  function ThirdPage() {
    return isThirdPage ? <Title>Resume successfully uploaded</Title> : null;
  }

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoading && <Loader size={50} />}
      <FirstPage />
      <SecondPage />
      <ThirdPage />
    </Container>
  );
}
