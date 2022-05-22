import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import useSound from "use-sound";
// import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
// import { providers } from "ethers";

// Infura endpoint
// const jsonRpcEndpoint =
//   "https://mainnet.infura.io/v3/5b0905fa75c540e4a2b04e3966e2a325";

const SwapView = () => {
  const [playYay] = useSound("/sounds/yay.mp3");
  const [playClick] = useSound("/sounds/click.mp3");
  const { setProgress, setAdventureState } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      playYay();
      setProgress(60);
    }
  }, [isCompleted]);

  return (
    <>
      <Container maxW="container.lg">
        <Heading pt="4" textAlign="center">
          Stake token
        </Heading>
      </Container>

      <Container maxW="container.lg">
        <Flex w="full" justify="center">
          {isCompleted ? (
            <>
              <Stack layerStyle="solid-card" align="center" spacing={8}>
                <Text>You have successfully staked the token</Text>
              </Stack>
            </>
          ) : (
            <VStack>
              {/* https://github.com/Uniswap/interface/issues/3674 */}
              {/* <SwapWidget
                provider={provider}
                jsonRpcEndpoint={jsonRpcEndpoint}
              /> */}
              <Button onClick={() => setIsCompleted(true)}>Swap token</Button>
            </VStack>
          )}
        </Flex>
      </Container>

      <Box position="relative" height="120px" w="full">
        <Stack
          w="full"
          bg={isCompleted ? "accent" : ""}
          py={4}
          position="absolute"
          bottom={0}
        >
          <Container maxW="container.lg">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              {isCompleted ? (
                <Flex>
                  <Text color="primary" fontWeight="bold" pb="4">
                    Excellent!
                  </Text>
                  <Spacer />
                  <Text color="primary" fontWeight="bold" pb="4">
                    +100 xp
                  </Text>
                </Flex>
              ) : (
                <Box></Box>
              )}
              <Button
                w={{ base: "full", md: "md" }}
                disabled={!isCompleted}
                onClick={() => {
                  playClick();
                  setAdventureState(AdventureEnum.liquidity);
                }}
              >
                Next
              </Button>
            </Flex>
          </Container>
        </Stack>
      </Box>
    </>
  );
};

export default SwapView;
