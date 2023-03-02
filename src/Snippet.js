import React, { useState } from 'react'
import Modal from './Modal'

export default function Snippet({
    title,
    author,
    firstPublished,
    publisher,
    isbn,
    cover,
}) {
    const [modalActive, setModalActive] = useState(false)

    return (
        <div>
            <div className="snippet" onClick={() => setModalActive(true)}>
                <div className="snippet__title">
                    <p className="snippet__book-title">{title}</p>
                    <p className="snippet__book-author">{author}</p>
                </div>
                <div className="snippet__cover">
                    <img
                        className="snippet__image"
                        src={cover}
                        alt="no cover available"
                    />
                </div>
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                title={title}
                author={author}
                firstPublished={firstPublished}
                publisher={publisher}
                isbn={isbn}
                cover={cover}
            />
        </div>
    )
}
