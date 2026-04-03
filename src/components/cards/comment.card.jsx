import { IconsReact } from "../../library/icons";
import ImgTags from "../tags/image.tag";
const CommentCard = ({ comment }) => {

  const rate = comment?.rating || 5;
  const rating = [];
  for (let i = 0; i < rate; i++) {
    rating.push(true);
  };

  return (
    <div className="shadow-neo-raised2 bg-[#ffaf03b1] py-2 px-4 rounded-md">
      <div className="flex gap-4">
        <div>
          <ImgTags
            src="/images/avatar.png"
            alt={comment?.customer?.name || "Srisir User"}
            height={100}
            width={100}
            className="rounded-full w-[50px] h-[50px]"
          />
        </div>
        <div>
          <span className="text-xl font-bold">{comment?.customer?.name || "Srisir User"}</span>
          <div className="flex">
            <span className={rating[0] ? "text-[var(--blue)]" : "text-slate-50"}>{IconsReact.Star}</span>
            <span className={rating[1] ? "text-[var(--blue)]" : "text-slate-50"}>{IconsReact.Star}</span>
            <span className={rating[2] ? "text-[var(--blue)]" : "text-slate-50"}>{IconsReact.Star}</span>
            <span className={rating[3] ? "text-[var(--blue)]" : "text-slate-50"}>{IconsReact.Star}</span>
            <span className={rating[4] ? "text-[var(--blue)]" : "text-slate-50"}>{IconsReact.Star}</span>
          </div>
        </div>
      </div>
      {comment?.feedback && <div className="mt-2">
        <p className="text-sm">
          {comment?.feedback}
        </p>
      </div>
      }
    </div>
  );
};

export default CommentCard;
