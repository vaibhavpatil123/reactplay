import { useSignUpEmailPassword } from '@nhost/react'
import {  Navigate ,useNavigate} from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useToast } from '@chakra-ui/react'
  const Signup = () => {
    const toast = useToast()
    let navigate = useNavigate();
    const statuses = ['success', 'error', 'warning', 'info']
    const color = useColorModeValue('white', 'gray.800');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const { signUpEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
      useSignUpEmailPassword()
  
    const handleSignup = (e) => {
      e.preventDefault()
      console.log("handleSignup",isLoading)
       signUpEmailPassword(email, password, {
        displayName: `${firstName} ${lastName}`.trim(),
        metadata: {
          firstName,
          lastName
        }
      })
      if (isSuccess && !isLoading) {
        toast({
          title: `Sign-up Successful`,
          status: 'success',
          isClosable: true,
        });
        navigate("/task");
      }else{
        toast({
          title: `Sign-up error ${error.message}`,
          status: 'error',
          isClosable: true,
        });
      }
    }

  
    const disableForm = false;
    return (
        <form onSubmit={handleSignup}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgGradient='linear(blue.100 0%, pink.100 25%,blue.100 50%)'>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
              {isError ? <p >{error?.message}</p> : null}
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Task execution made easy✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={color}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={disableForm}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text"  value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={disableForm}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disableForm}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                  <Input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disableForm}/>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  colorScheme={'green'}
                  onClick={handleSignup}
                  bg={'green.400'}
                  _hover={{ bg: 'green.500' }}>
                  Sign up 
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'green.400'} href='/login'>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      
      </Flex>
      </form>
    );
  };
  export default Signup;
