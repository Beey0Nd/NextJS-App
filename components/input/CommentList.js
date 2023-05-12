import { useEffect } from 'react';
import classes from './CommentList.module.css';

function CommentList({ eventId, comments, setComments, newLoading }) {

    useEffect(() => {
        fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(res => {
            const filteredComments = res.comments.filter(comm => {
                return comm.eventId === eventId
            }) // Fetching all comments is a crutch => Update MongoDB database to fetch only specific event related comments
            setComments(filteredComments)
        })
    }, [])
    
    return (
        <ul className={classes.comments}>
            { newLoading && <div>New comment loading...</div>}
            {comments ? (comments.map(comment => {
                return (
                    <li key={comment._id}>
                        <p>{comment.text}</p>
                        <div>
                            By <address>{comment.name}</address>
                        </div>
                    </li>
                )
            })) : <div>Loading...</div>}
        </ul>
    );
}

export default CommentList;
