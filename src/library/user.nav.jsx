import {
    HiOutlineUser,
    HiOutlineHome,
    HiOutlineChatBubbleLeftRight,
    HiOutlinePhone,
    HiOutlineVideoCamera,
    HiOutlineShoppingCart,
    HiOutlineClock,
    HiOutlineWallet,
    HiOutlineQuestionMarkCircle,
    HiOutlineInformationCircle,
    HiOutlineShieldCheck,
    HiOutlineDocumentText
} from "react-icons/hi2";

const UserNav = [
    {
        title: "Home Page",
        icon: <HiOutlineHome />,
        link: "/",
    },
    {
        title: "User Profile",
        icon: <HiOutlineUser />,
        link: "/user",
    },
    {
        title: "Your Cart",
        icon: <HiOutlineShoppingCart />,
        link: "/history?tab=cart",
    },
    {
        title: "Call History",
        icon: <HiOutlinePhone />,
        link: "/calls",
    },
    {
        title: "VCall History",
        icon: <HiOutlineVideoCamera />,
        link: "/vcalls",
    },
    {
        title: "Chat History",
        icon: <HiOutlineChatBubbleLeftRight />,
        link: "/chats",
    },
    {
        title: "Wallet History",
        icon: <HiOutlineWallet />,
        link: "/history?tab=WALLET",
    },
];

/* ---------- GUEST / WITHOUT USER ---------- */
const WithoutUserLinks = [
    {
        title: "Home Page",
        icon: <HiOutlineHome />,
        link: "/",
    },
    {
        title: "Chat Page",
        icon: <HiOutlineChatBubbleLeftRight />,
        link: "/chats",
    },
    {
        title: "Call Page",
        icon: <HiOutlinePhone />,
        link: "/calls",
    },
    {
        title: "VCall Page",
        icon: <HiOutlineVideoCamera />,
        link: "/vcalls",
    },
    {
        title: "Our Support",
        icon: <HiOutlineQuestionMarkCircle />,
        link: "/support",
    },
    {
        title: "About Us",
        icon: <HiOutlineInformationCircle />,
        link: "/about-us",
    },
    {
        title: "Our Blogs",
        icon: <HiOutlineDocumentText />,
        link: "/blog",
    },
    {
        title: "Privacy policy",
        icon: <HiOutlineShieldCheck />,
        link: "/privacy-policy",
    },
    {
        title: "Terms of use",
        icon: <HiOutlineClock />,
        link: "/terms-of-use",
    },
];

/* ---------- SIMPLE NAV ---------- */
const Navs = [
    {
        title: "Chat",
        icon: <HiOutlineChatBubbleLeftRight />,
        link: "/chats",
    },
    {
        title: "Call",
        icon: <HiOutlinePhone />,
        link: "/calls",
    },
    {
        title: "VCall",
        icon: <HiOutlineVideoCamera />,
        link: "/vcalls",
    },
    {
        title: "Support",
        icon: <HiOutlineQuestionMarkCircle />,
        link: "/support",
    },
];
export { UserNav, WithoutUserLinks, Navs };
