import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon, CloseIcon } from "@chakra-ui/icons";
import { useSignOut } from "@nhost/react";
import { useAuthenticationStatus } from "@nhost/react";
import { useUserData } from "@nhost/react";
import NotificationBar from "./components/navPage";
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function HeaderPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const [userProfile, setUserProfile] = useState(null);
  let user = useUserData();

  useEffect(() => {
    if (user != null) {
      setUserProfile(user);
    }
  }, [user]);
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.500")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {isAuthenticated && (
            <HStack spacing={20} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  href="/task"
                >
                  Dashboard
                </Link>

                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  href="/task"
                >
                  Projects
                </Link>
                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  href="/task"
                >
                  Documents
                </Link>
              </HStack>
            </HStack>
          )}
          <Stack direction={['column', 'row']} spacing='14px'
            flex={{ base: 1, md: 0 }}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
            {isAuthenticated && <NotificationBar></NotificationBar>}

            <Menu>
              {userProfile && (
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    bg="pink.500"
                    src={userProfile.avatarUrl}
                  />
                </MenuButton>
              )}
              <MenuList>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Sign-out</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
