import { useParams } from "react-router-dom";

const DemoGame = () => {
  const { id } = useParams();

  const demoGames = [
    {
      id: "aviator",
      gameLink: "https://demo.spribe.io/launch/aviator?currency=BDT&lang=EN",
    },
    {
      id: "super-ace",
      gameLink: "https://www.jopi.com/gam/summer-maze",
    },
  ];

  const game = demoGames.find((game) => game.id === id);

  return (
    <div>
      <iframe
        className="w-full h-[600px] max-h-screen"
        src={game.gameLink}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default DemoGame;
