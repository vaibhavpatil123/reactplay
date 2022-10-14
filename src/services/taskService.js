import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { Novu } from '@novu/node';

//@TOdo replace account with Novu
const novu = new Novu("");
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
const client = new ApolloClient({
  uri: "https://ABC.nhost.run/v1/graphql",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
const ADD_TODO = gql`
  mutation ($id: uuid!, $taskDetails: String!, $taskName: String!) {
    insert_tasks(
      objects: [{ id: $id, taskDetails: $taskDetails, taskName: $taskName }]
    ) {
      returning {
        id
      }
    }
  }
`;

const UPDATE_TASK_STATUS=gql`
mutation ($id: uuid!, $status: String!) {
  update_tasks(
    where: {id: {_eq: $id}}
    _set: {status: $status}
  ) {
    affected_rows
  }
}
`

export const loadTask = async () => {
  console.log("Load Task");
  let tasksResult = {
    pending: {
      title: "pending",
      items: [
      ],
    },
    ongoing: {
      title: "ongoing",
      items: [
       
      ],
    },
    completed: {
      title: "completed",
      items: [
       
      ],
    }
  };
  const taskDetails = await client
    .query({
      query: gql`
        query {
          tasks {
            id
            taskName
            taskDetails
            status
          }
        }
      `,
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
    if(taskDetails.data.tasks) {
      taskDetails.data.tasks.forEach(dbElement => {
        console.log("db object",dbElement)
       switch (dbElement.status) {
        case "pending" :
          case  "completed" :
            case "ongoing":
          tasksResult[dbElement.status].items.push(
            {
              id: dbElement.id,
              title: dbElement.taskName,
              comments: [],
          })
          break;
        default:
          break;
       }
      });
    }
 
  return [tasksResult];
};

export const addTask = async (task) => {
  const res = { ...task };
  console.log("add task service");

  client
    .mutate({
      mutation: ADD_TODO,
      variables: task
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));

  return res;
};

const sendNotification = async (user) => {
	try {
		const result = await novu.trigger("test", {
			to: {
				subscriberId: "63392236ee1316a5c8ae1b34",
			},
			payload: {
				userId: user,
			},
		});
		console.log(result);
	} catch (err) {
		console.error("Error >>>>", { err });
	}
};
export const updateTaskStatus = async (task) => {
  const res = { ...task };
  console.log("update task service");
  client
    .mutate({
      mutation: UPDATE_TASK_STATUS,
      variables: {id: task.id, status:task.status}
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));

  return res;
};