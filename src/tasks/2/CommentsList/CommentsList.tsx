import React, { FC, useEffect, useState } from "react";
import getDataRequest from "../data/getDataRequest";
import { Comment, Author } from "./types";
import CommentItem from "./Comment";
import "./style.css";

const CommentsList: FC = () => {
    const [authors, setAuthors] = useState([] as Author[]);
    const [comments, setComments] = useState([] as Comment[]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            try {
                const { authors, comments } = await getDataRequest();
                setAuthors(authors);
                setComments(comments);
            } catch (e) {
                setError(e.message);
            }
        }());
    }, []);

    return (
        <div className="pageWrapper">
            <h2 className="pageTitle">
                Comments List
            </h2>
            {error && (
                <div className="errorBlock">
                    {error}
                </div>
            )}
            <div className="commentsList">
                {comments
                    .filter((c) => c.parent === null)
                    .map((c) => (
                        <CommentItem
                            comments={comments}
                            comment={c}
                            authors={authors}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default CommentsList;
