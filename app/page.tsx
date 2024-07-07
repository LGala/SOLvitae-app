"use client";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  NumberInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { createResume, uploadResume } from "./handler";

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
        onSubmit={async () => {
          setIsSecondPage(false);
          setIsLoading(true);
          await uploadResume();
          setIsLoading(false);
          setIsThirdPage(true);
        }}
      >
        <TextInput label="Name" placeholder="Name" />
        <TextInput mt="sm" label="Email" placeholder="Email" />
        <NumberInput mt="sm" label="Age" placeholder="Age" min={0} max={99} />
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
