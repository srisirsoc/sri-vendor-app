export default function ScrollTopCard({ hasScrollToTopButton }) {
    return (
        <>
            {hasScrollToTopButton && (
                <a className="scroll-top btn-hover" to="#">
                    <i className="lni lni-chevron-up"></i>
                </a>
            )}
        </>
    );
}
