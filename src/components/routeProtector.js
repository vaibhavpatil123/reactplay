import { useAuthenticationStatus } from "@nhost/react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const location = useLocation();

  if (isLoading) {
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

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
