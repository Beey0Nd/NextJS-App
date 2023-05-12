import { useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);
    const [newLoading, setNewLoading] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function updateList() {
    fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(res => {
            const filteredComments = res.comments.filter(comm => {
                return comm.eventId === eventId
            }) // Fetching all comments is a crutch => Update MongoDB database to fetch only specific event related comments
            setComments(filteredComments)
            setNewLoading(false)
        })
  }

  function addCommentHandler(commentData) {
    setNewLoading(true)
    fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(console.log).then(updateList)
    // send data to an API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList 
        newLoading={newLoading}
        comments={comments} 
        setComments={setComments}
        eventId={eventId}/>}
    </section>
  );
}

export default Comments;
