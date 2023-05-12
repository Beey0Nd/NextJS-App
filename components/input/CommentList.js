import { useEffect, useState } from 'react';
import classes from './CommentList.module.css';

function CommentList({ eventId }) {
    const [comments, setComments] = useState();
    
    useEffect(() => {
        fetch(`/api/comments/${eventId}`)
            .then(res => res.json())
            .then(res => {
                const filteredComments = res.comments.filter(comm => {
                    return comm.eventId === eventId
                })
                setComments(filteredComments)
            })
    }, [])

    return (
        <ul className={classes.comments}>
            {comments ? (comments.map(comment => {
                return (
                    <li key={comment._id}>
                        <p>{comment.text}</p>
                        <div>
                            By <address>{comment.name}</address>
                        </div>
                    </li>
                )
            })) : null}
        </ul>
    );
}

export default CommentList;
