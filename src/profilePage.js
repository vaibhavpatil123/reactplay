import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Spinner,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
import { useAuthenticationStatus } from "@nhost/react";
import { useUserData } from "@nhost/react";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
  export default function UserProfileEdit(): JSX.Element {
    const { isAuthenticated, isLoading } = useAuthenticationStatus();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userProfile, setUserProfile] = useState(null);
    const toast = useToast()
    const navigate = useNavigate();
    const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName, metadata: $metadata }) {
      id
      displayName
      metadata
    }
  }
`
const changeValue = (e) => {
  e.preventDefault()
  console.log(e.target.id,e.target.value);
  if( e.target.id==="firstName"){
  setFirstName(e.target.value);
  }
  if( e.target.id==="lastName"){
    setLastName(e.target.value);
    }
    if( e.target.id==="email"){
      setEmail(e.target.value);
      }
}
    let user = useUserData();
  
      const [mutateUser, { data },loading,error] = useMutation(UPDATE_USER_MUTATION);

    const updateUserProfile = async (e) => {
      e.preventDefault()
  
      try {
        await mutateUser({
          variables: {
            id: userProfile.id,
            displayName: `${firstName} ${lastName}`.trim(),
            metadata: {
              firstName,
              lastName
            }
          }
        })
   
          if (error) {
          toast({
            title: `Error update profile`,
            position: 'top',
            isClosable: true,
            status: 'error',
          });
          }else{
          toast({
            title: `Successfully updated profile`,
            position: 'top',
            isClosable: true,
            status: 'success',
            });
            navigate("/task")
          }
      } catch (error) {
        toast({
          title: `Error update profile`,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      }
    }
    useEffect(() => {
      if (user != null) {
        setUserProfile(user);
        setFirstName(user.metadata.firstName);
        setLastName(user.metadata.lastName);
      }
    }, [user]);
    
    return (
      userProfile &&
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={ userProfile.avatarUrl || "https://bit.ly/sage-adebayo"}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="Frist Name"
              _placeholder={{ color: 'gray.500' }}   id="firstName"
              type="text"  value={firstName} onChange={changeValue}
            />
          </FormControl>
          <FormControl id="userLastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last Name"
              _placeholder={{ color: 'gray.500' }}  id="lastName"
              type="text"  value={lastName} onChange={changeValue}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email" value={userProfile.email} onChange={changeValue}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }} onClick={updateUserProfile}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }