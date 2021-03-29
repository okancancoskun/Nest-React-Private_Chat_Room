import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoom, afterPostMessage } from "../actions/Chat/ChatAction";
import { store } from "../store";
import { io } from "socket.io-client";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Row, Col, Comment } from "antd";
import useSocket from "use-socket.io-client";

const Chat = ({ match, socket }) => {
  console.log(socket);
  const dispatch = useDispatch();
  const { auth } = store.getState();

  const [message, setMessage] = useState("");
  const room = useSelector((state) => state.room);
  const { receiver } = match.params;
  useEffect(async () => {
    if (auth.token && room) {
      dispatch(getRoom(receiver, auth.token));
    }
  }, [auth.token]);

  useEffect(() => {
    socket.on("outputMessage", (messageFromBackend) => {
      dispatch(afterPostMessage(messageFromBackend));
    });
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("roomMessage", { receiver: receiver, txt: message, roomId: room.room._id });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join", {
      chatroom: room.room.name,
    });
    return;
  }, [room.room.name]);
  return (
    <div>
      <h1>asd</h1>
      <React.Fragment>
        <div>
          <h1>{receiver}</h1>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="infinite-container" style={{ height: "500px", overflowY: "scroll" }}>
            {room.messages &&
              room.messages.map((msg) => (
                <div key={msg._id}>
                  <Comment author={msg.username}>
                    <p>{msg.message}</p>
                  </Comment>
                </div>
              ))}
          </div>

          <Row>
            <Form layout="inline" onSubmit={sendMessage}>
              <Col span={18}>
                <Input id="message" placeholder="Let's start talking" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
              </Col>
              <Col span={2}></Col>

              <Col span={4}>
                <Button type="primary" style={{ width: "20%" }} onClick={sendMessage} htmlType="submit">
                  Gönder
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    </div>
  );
};
export default withRouter(Chat);
