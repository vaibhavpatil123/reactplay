import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useParams } from "react-router-dom";
/* eslint-disable import/first */
const socket = socketIO.connect("http://localhost:4000");
import { Box, Wrap, WrapItem, Button, useToast } from "@chakra-ui/react";
const Comments = () => {
  const { category, id } = useParams();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const toast = useToast();
  useEffect(() => {
    socket.emit("fetchComments", { category, id });
  }, [category, id]);

  useEffect(() => {
    socket.on("comments", (data) => setCommentList(data));
  }, []);
  function ToastStatusExample() {
    toast({ title: "Successfully added new comments", status: "success" });
  }
  const addComment = (e) => {
    e.preventDefault();
    socket.emit("addComment", {
      comment,
      category,
      id,
      userId: localStorage.getItem("userId"),
    });
    setComment("");
    ToastStatusExample();
  };

  return (
    <Box w="100%" h="200px" m={[2, 3]}>
      <div className="comments__container">
        <form className="comment__form" onSubmit={addComment}>
          <label htmlFor="comment">Add a comment</label>
          <textarea
            placeholder="Type your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            id="comment"
            name="comment"
            required
          ></textarea>
          <Box
            as="button"
            p={4}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r, green.500, green.500)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
          >
            ADD COMMENT
          </Box>
        </form>
        <div className="comments__section">
          <h2>Existing Comments</h2>
          {commentList.map((comment) => (
            <div key={comment.id}>
              <p>
                <span style={{ fontWeight: "bold" }}>{comment.text} </span>by{" "}
                {comment.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Comments;
