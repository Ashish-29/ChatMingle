import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
 
  useEffect(() => {
    const fetchData = async () => {
      const localKey = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!localKey) {
        navigate("/login");
        return;
      }
      
      const user = JSON.parse(localKey);
      if (!user.isAvatarImageSet) {
        navigate("/setAvatar");
        return;
      }
  
      try {
        const response = await axios.get(`${allUsersRoute}/${user._id}`);
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }

      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    };
  
    fetchData();
  }, []);  
  
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={(chat) => setCurrentChat(chat)} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px){
      grid-template-columns: 35% 65%;
    }
  }
`;
