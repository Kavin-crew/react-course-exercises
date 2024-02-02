import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Heading as="h1">Hello</Heading>
      <Heading as="h2">Hello</Heading>
      <Heading as="h3">Hello</Heading>
      <Button>Test</Button>
      <Input placeholder="Number here..." />
    </>
  );
}

export default App;
