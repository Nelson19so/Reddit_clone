import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// import maskGroup from "../../assets/images/Mask_Group.png";
// import maskGroup2 from "../../assets/images/Mask_Group2.png";
// import maskGroup3 from "../../assets/images/Mask_Group3.png";
// import maskGroup4 from "../../assets/images/Mask_Group4.png";

function App() {
  const [homepage, setIsHome] = useState(true);
  const location = useLocation();

  const posts = [
    {
      id: 1,
      img: maskGroup,
      title:
        "13 years ago today, a true patriot lost his life. Rest in Peace big guy.",
      author: "the_big_mothergoose",
      subreddit: "MURICA",
      slug: "hello",
    },
    {
      id: 2,
      title: "My cousin playing around with talk box.",
      img: maskGroup2,
      author: "bwa_ahki",
      subreddit: "Music",
      slug: "hello",
    },
    {
      id: 3,
      title:
        "IamA (Jörg Sprave, the bald crazy German who runs 'The Slingshot Channel' on YouTube.) AMA!",
      author: "JoergS",
      subreddit: "IAmA",
    },
    {
      id: 4,
      title:
        "Angela Merkel reportedly had to explain the 'fundamentals' of EU trade to Trump 11 times",
      author: "satosaison",
      subreddit: "worldnews",
      slug: "hello",
    },
    {
      id: 5,
      title: "Nice set!",
      img: maskGroup3,
      author: "IHaeTypos",
      subreddit: "whitepeoplegifs",
      slug: "hello",
    },
    {
      id: 6,
      img: maskGroup4,
      title:
        "PocketDerm lets you see a dermatologist online for prescription acen treatment. Redditors get their FIRST MONTH FREE!",
      author: "promoted by ashwin_3beauty",
      subreddit: "Ads",
      slug: "hello",
    },
  ];

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);
  return <></>;
}

export default App;
