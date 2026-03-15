import { useBoard } from "../data/hooks";

export const GameStatus = () => {
    const { status } = useBoard();

    switch (status) {
        case 'playing':
            return (<StatusPanel status="2048" message="⬅️ ⬆️ Use arrow keys or swipe to play ⬇️ ➡️" color="#cccccc" />);
        case 'win':
            return (<StatusPanel status="🏆 Congratulations 🏆" message="You've reached 2048! Refresh the page to play again" color="green" />);
        case 'gameover':
            return (<StatusPanel status="💀 Game over! 💀" message="Refresh the page to try again" color="red" />);
    }
}

const StatusPanel = ({ status, message, color }: { status: string; message: string; color: string }) => {

    const headerStyle = {
        color,
        fontWeight: 'bold',
        fontSize: '2rem',
        padding: '0.5rem 0'
    }

    return (
        <div className="game-status">
            <div style={headerStyle}>{status}</div>
            <p>{message}</p>
        </div>
    );
}