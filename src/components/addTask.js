/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo, useCallback, withReact, useId } from "react";
import  { useSelector,useDispatch } from "react-redux";
import * as Actions from "../actions/taskActions"
/* eslint-disable import/first */
import { Box } from "@chakra-ui/react";

import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { Textarea, Center, Tooltip } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
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
  Spinner
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// eslint-disable-next-line import/first
import { useAuthenticated, useAccessToken } from "@nhost/react";

import { v4 as uuidv4 } from 'uuid';

const AddTask = ({ socket }) => {
  const [taskName, setTaskName] = useState("");
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch=useDispatch(); 
  const [taskDetails, setTaskDetails] = useState("Some default content");
 // const [insert_tasks, { data },loading,error] = useMutation(ADD_TODO);
  const onCloseAction = (e) => {
    setTaskName("");
    setTaskDetails("");
    onClose();
  };

  const onOpenAction = (e) => {
    setTaskName("");
    setTaskDetails("");
    onOpen();
  };

  const onSave =  (e) => {
    e.preventDefault();

	dispatch(Actions.addTask( {
		id: uuidv4(),
		taskName:taskName,
		taskDetails:taskDetails
	   
  }))
  toast({
    title: `Successfully task added`,
    position: 'top',
    isClosable: true,
    status: 'success',
    });
    setTaskName("");
    setTaskDetails("");
    onClose();
    //socket.emit("createTask", { task });
    //const accessToken = useAccessToken();
	 
	 /*  try {
		// GQL method name , variables
		const id= uuidv4();
		insert_tasks({
			variables:  {
				  id: uuidv4(),
				  taskName:taskName,
				  taskDetails:taskDetails
				 
			}
		  })
		  if (loading) {
			return (
			  <Center >
				<Spinner
				  thickness="4px"
				  speed="0.36s"
				  emptyColor="gray.200"
				  color="green.500"
				  size="xl"
				/>
			  </Center>
			);
		  }
		  if (error) {
			toast({
			  title: `Error task add`,
			  position: 'top',
			  isClosable: true,
			  status: 'error',
			});
		  }else{
			toast({
				title: `Successfully task added with id ${id}`,
				position: 'top',
				isClosable: true,
				status: 'success',
			  });
			  setTaskName("");
			  setTaskDetails("");
			  onClose();
		  }
	  } catch (error) {
		return alert(`error: ${error}`)
	  } */
   
  };

  return (
    <Box w="100%" h="200px" colorScheme="green">
      <Modal colorScheme="green" isOpen={isOpen} onClose={onCloseAction}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input
                variant="outline"
                focusBorderColor="green.400"
                _placeholder={{ color: "inherit" }}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter Task name"
                colorScheme="green"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Task details</FormLabel>
              <ReactQuill
                theme="snow"
                value={taskDetails}
                onChange={setTaskDetails}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onSave}>
              Save
            </Button>
            <Button colorScheme="green" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Center h="100px" colorScheme="teal">
        <Tooltip
          hasArrow
          label="Click to add new task"
          bg="white.900"
          color="green"
        >
          <Button
            leftIcon={<AddIcon />}
            colorScheme="green"
            onClick={onOpenAction}
          >
            Add Task
          </Button>
        </Tooltip>
      </Center>
    </Box>
  );
};

export default AddTask;
