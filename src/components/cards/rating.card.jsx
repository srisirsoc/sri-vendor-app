import { IconsReact } from "../../library/icons";
import { CalculateRating } from "../../library/math-calculations";

const RatingCard = ({ astrologer }) => {
    const rates = {};

    const { totalNoOf5Ratings = 0, totalNoOf4Ratings = 0, totalNoOf3Ratings = 0, totalNoOf2Ratings = 0, totalNoOf1Ratings = 0 } = astrologer;
    rates.rate1 = CalculateRating(totalNoOf1Ratings);
    rates.rate2 = CalculateRating(totalNoOf2Ratings);
    rates.rate3 = CalculateRating(totalNoOf3Ratings);
    rates.rate4 = CalculateRating(totalNoOf4Ratings);
    rates.rate5 = CalculateRating(totalNoOf5Ratings);
    const ratings = [{ rate: 5, ratings: rates.rate5 }, { rate: 4, ratings: rates.rate4 }, { rate: 3, ratings: rates.rate3 }, { rate: 2, ratings: rates.rate2 }, { rate: 1, ratings: rates.rate1 }];

    return (
        <div className="container">
            <div className="flex justify-between">
                <p className="text-xl font-bold text-var(--blue)">
                    Ratings ({astrologer?.averageRatings})
                </p>
                <div className="">
                    <div className="flex flex-row items-center gap-2 ">
                        <span className="text-[#FFB103] text-xl">{IconsReact.Star}</span>
                        <p className="text-neo-light-black dark:text-dark-light-gray">
                            ({astrologer?.rating?.length} Reviews)
                        </p>
                    </div>
                </div>
            </div>
            <br />
            <div className="flex flex-col gap-2">
                {ratings.map((x, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="font-medium">{x.rate}</span>
                        <div className="bg-[#E3E3E3] rounded-sm h-3 w-full">
                            <div style={{ maxWidth: `${x.ratings}%` }} className={`navbar h-3 rounded-sm`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingCard;
