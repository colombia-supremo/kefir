import React, { FC, useState, useMemo } from "react";
import HeartIcon from "./HeartIcon";
import { Comment, Author } from "./types";
import "./style.css";

interface Props {
    comments: Comment[];
    comment: Comment;
    authors: Author[];
}

const CommentItem: FC<Props> = (props) => {
    const [liked, setLiked] = useState(false);

    const {
        comments,
        comment,
        authors,
    } = props;

    const d = new Date(comment.created);
    const formattedDate = comment?.created ? d.toLocaleString() : '';
    const a = authors.find((a) => a.id === comment.author);
    const childComments = comments.filter((c) => c.parent === comment.id);

    const handleLike = () => {
        setLiked((prev) => !prev);
    };

    let likesCount = useMemo(() => {
        let value = comment?.likes ? comment?.likes : 0;
        if (liked) {
            value += 1;
        }
        return value;
    }, [liked, comment?.likes]);

    return (
        <div
            key={comment.id}
            className="container"
        >
            <div className="commentContent">
                <div className="header">
                    <div
                        className="avatar"
                        style={{
                            backgroundImage: `url(${a?.avatar})`,
                        }}
                    />
                    <div className="authorBlock">
                        <div className="authorName">
                            {a?.name.toUpperCase()}
                        </div>
                        <div className="commentDate">
                            {formattedDate}
                        </div>
                    </div>
                    <div
                        className="likes"
                        onClick={handleLike}
                    >
                        <HeartIcon fill={liked ? 'red' : 'black'} />
                        <span className="likesNumber">
                            {likesCount}
                        </span>
                    </div>
                </div>
                <div
                    className="commentBody"
                    style={{
                        marginBottom: !!childComments.length ? 40 : 0,
                    }}
                >
                    {comment.text}
                </div>
            </div>
            {!!childComments.length && (
                <div className="childCommentsWrapper">
                    {childComments.map((c) => (
                        <CommentItem
                            key={c.id}
                            comment={c}
                            comments={comments}
                            authors={authors}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
