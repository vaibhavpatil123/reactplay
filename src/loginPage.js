import { useSignInEmailPassword } from '@nhost/react'
import {  Navigate, useNavigate } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useToast } from '@chakra-ui/react'
  const Login = () => {
    const color = useColorModeValue('white', 'gray.800');
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
      useSignInEmailPassword()
    const handleOnSubmit = (e) => {
      e.preventDefault()
      signInEmailPassword(email, password)
    
      if (isSuccess && !isLoading) {
        toast({
          title: `Sign-up Successful`,
          status: 'success',
          isClosable: true,
        });
        navigate("/task");
      }else{
        toast({
          title: `Sign-up error ${error?.message}.`,
          status: 'error',
          isClosable: true,
        });
      }
    }
  
    const disableForm = false;
    return (
        <form >
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'} 
        bgGradient='linear(blue.100 0%, pink.100 25%,blue.100 50%)'>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign in 
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={color}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
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
                  loadingText="wait your are great!"
                  size="lg"
                  colorScheme={'green'}
                  onClick={handleOnSubmit}
                  bg={'green.400'}
                  _hover={{ bg: 'green.500' }}>
                  Sign in 
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  No active account? <Link color={'green.400'} href='/signup'>Sign up</Link>
                </Text>
              </Stack>
            </Stack>

          </Box>
        </Stack>
       
      </Flex>
      </form>
    );
  };
  export default Login;
