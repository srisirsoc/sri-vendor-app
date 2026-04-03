'use client';

const IframeCard = ({ title, url, style }) => {
    return (
        <div>
            <iframe
                width="100%"
                height="100%"
                src={url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className={`${style} h-[300px] sm:h-[400px] rounded-md`}
            ></iframe>
        </div>
    )
}

export default IframeCard;