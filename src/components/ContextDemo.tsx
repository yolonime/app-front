import Profile from "./Profile";
import { UserProvider } from "./Context";

const ContextDemo = () => {
  return (
    <>
      <UserProvider value={{ name: "User1" }}>
        <Profile />
      </UserProvider>
    </>
  );
};

export default ContextDemo;
