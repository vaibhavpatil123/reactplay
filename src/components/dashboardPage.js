/* eslint-disable no-unused-vars */
import React from "react";
import AddTask from "./addTask";
import TasksContainer from "./taskBacklogPage";

import socketIO from "socket.io-client";
import { SimpleGrid, } from '@chakra-ui/react'
// eslint-disable-next-line import/first
import { gql, useQuery  } from '@apollo/client'
// eslint-disable-next-line import/first
import { useAuthenticated ,useAccessToken} from '@nhost/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Spinner,useToast,Center,Container,Box
} from "@chakra-ui/react";
import HeaderPage from "../headerPage";
const socket = socketIO.connect("http://localhost:4000");
const Task = () => {
  const toast = useToast()
  const positions = [
    'top',
    'top-right',
    'top-left',
    'bottom',
    'bottom-right',
    'bottom-left',
  ]
//const isAuthenticated = useAuthenticated()
const accessToken = useAccessToken()
	return (
    <Container maxW={'5xl'} >
    <Box  px={4}>
			<AddTask socket={socket} />
			<TasksContainer socket={socket} />
		</Box>
    </Container>
	);
};

export default Task;