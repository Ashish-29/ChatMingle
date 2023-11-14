import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(
      JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  const printName = (name) => {
    if(name)return name.at(0).toUpperCase() + name.slice(1);
  }

  return (
    <Container>
      <div className="button">
        <Logout />
      </div>
      <div className="content">
        <img src={Robot} alt="robot" />
        <h1>
          Welcome, <span>{printName(userName)}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </div>   
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px){
    grid-template-rows: 15% 85%;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2rem;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
      height: 20rem;
    }
    span {
      color: #4e0eff;
    }
  }
`;
