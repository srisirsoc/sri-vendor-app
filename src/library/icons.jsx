import { HiBan, HiBell, HiChatAlt, HiCheck, HiChevronDown, HiChevronLeft, HiChevronRight, HiChevronUp, HiMenuAlt1, HiMoon, HiOutlineExclamation, HiOutlineEye, HiOutlineEyeOff, HiOutlineRefresh, HiOutlineUserCircle, HiOutlineX, HiPencilAlt, HiPhone, HiSearch, HiShare, HiStar, HiSun, HiTrash, HiVideoCamera } from "react-icons/hi";
import { FaBloggerB, FaCalendarAlt, FaCartPlus, FaFacebook, FaGift, FaGraduationCap, FaHome, FaInfo, FaLanguage, FaLinkedin, FaMars, FaPlus, FaRegCalendarAlt, FaRegistered, FaTwitter, FaUserPlus, FaVenus, FaWallet, FaWhatsapp } from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";
import { HiLanguage } from "react-icons/hi2";
import { IoMdCall } from "react-icons/io";
import { CiLocationOn, CiLogin, CiLogout, CiPaperplane } from "react-icons/ci";
import { MdContactSupport, MdOutlinePrivacyTip } from "react-icons/md";
import { GrLike, GrShieldSecurity } from "react-icons/gr";
import { RiRefund2Line } from "react-icons/ri";
import { FcLike } from "react-icons/fc";


const IconsImg = {
    back: "/icons/back_icon.png",
    career: "/icons/career_icon.png",
    education: "/icons/education_icon.png",
    gift: "/icons/gift_icon.png",
    health: "/icons/health_icon.png",
    mail: "/icons/mail_icon.png",
    money: "/icons/money_icon.png",
    puja: "/icons/puja_icon.png",
    relationship: "/icons/relationship_icon.png",
    travel: "/icons/travel_icon.png",
    video_call: "/icons/video_call_icon.png",
    whatsapp: "/icons/whatsapp_white_icon.png",
    verifired: "/icons/verifired.png",
    secure_pay: "/icons/secure_pay.png",
    private_home: "/icons/private_home.png",
    ring: "/icons/rings.png",
    horoscope: "/icons/horoscope.png",
    kundli: "/icons/kundli.png",
    puja_icon: "/icons/puja_icon.png",
    paytm: "/icons/paytm.png",

    // horoscope
    scorpio: "/icons/horoscope/scorpio.png",
    sagittarius: "/icons/horoscope/sagittarius.png",
    libra: "/icons/horoscope/libra.png",

    capricorn: "/icons/horoscope/capricorn.png",
    virgo: "/icons/horoscope/virgo.png",
    aquarius: "/icons/horoscope/aquarius.png",
    leo: "/icons/horoscope/leo.png",
    pisces: "/icons/horoscope/pisces.png",
    cancer: "/icons/horoscope/cancer.png",
    aries: "/icons/horoscope/aries.png",
    gemini: "/icons/horoscope/gemini.png",
    taurus: "/icons/horoscope/taurus.png",
};

const IconsReact = {
    Left: <HiChevronLeft />,
    Right: <HiChevronRight />,
    Up: <HiChevronUp />,
    Down: <HiChevronDown />,
    Check: <HiCheck />,
    Menu: <HiMenuAlt1 />,
    Refresh: <HiOutlineRefresh />,
    User: <HiOutlineUserCircle />,
    Search: <HiSearch />,
    Video: <HiVideoCamera />,
    Bell: <HiBell />,
    Ban: <HiBan />,
    Chat: <HiChatAlt />,
    Eye: <HiOutlineEye />,
    EyeOff: <HiOutlineEyeOff />,
    Close: <HiOutlineX />,
    Star: <HiStar />,
    Phone: <HiPhone />,
    Pencil: <HiPencilAlt />,
    Exclamation: <HiOutlineExclamation />,
    Trash: <HiTrash />,
    Language: <HiLanguage />,
    Cap: <FaGraduationCap />,
    Share: <HiShare />,
    Gift: <FaGift />,
    Wallet: <FaWallet />,
    Calendar: <FaCalendarAlt />,
    Male: <FaMars />,
    Female: <FaVenus />,
    Sun: <HiSun />,
    Moon: <HiMoon />,
    Temple: <GiByzantinTemple />,
    CalendarAlt: <FaRegCalendarAlt />,
    Login: <CiLogin />,
    Logout: <CiLogout />,
    Registered: <FaUserPlus />,
    Plus: <FaPlus />,
    Support: <MdContactSupport />,
    Info: <FaInfo />,
    Blog: <FaBloggerB />,
    Privacy: <MdOutlinePrivacyTip />,
    Security: <GrShieldSecurity />,
    Cart: <FaCartPlus />,
    Home: <FaHome />,
    SendMsg: <CiPaperplane />,
    Refund: <RiRefund2Line />,
    Like: <FcLike />,
    Location: <CiLocationOn />,
    Call: <IoMdCall />,


    // socials medias
    Facebook: <FaFacebook />,
    Twitter: <FaTwitter />,
    Whatsapp: <FaWhatsapp />,
    Linkedin: <FaLinkedin />,
};

const IconsText = {
    Rupees: <span>&#8377;</span>,
    Dots: <span>&#8230;</span>,
}

export { IconsImg, IconsReact, IconsText };