"use client";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

export default function HomePage() {
  const [isFirstPage, setIsFirstPage] = useState(0);
  const [isSecondPage, setIsSecondPage] = useState(0);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={() => {}}>
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
    </Container>
  );
}
