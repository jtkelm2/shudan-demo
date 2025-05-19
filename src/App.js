import React, { useState } from 'react';
import { Goban } from '@sabaki/shudan';

// Create an empty 19x19 board
const createEmptyBoard = (size = 19) =>
    Array(size).fill().map(() => Array(size).fill(0));

function App() {
    const [boardState, setBoardState] = useState(createEmptyBoard());

    // Handle stone placement
    const handleVertexClick = (evt, [x, y]) => {
        const newBoardState = boardState.map(row => [...row]);

        // Left click = black stone (1), right click = white stone (-1)
        const sign = evt.button === 0 ? 1 : -1;

        // Place stone if position is empty
        if (newBoardState[y][x] === 0) {
            newBoardState[y][x] = sign;
            setBoardState(newBoardState);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Shudan Go Board Demo</h1>
            <p>Left click to place black stones, right click for white stones</p>

            <div style={{ display: 'inline-block' }}>
                <Goban
                    vertexSize={30}
                    signMap={boardState}
                    showCoordinates={true}
                    onVertexMouseUp={handleVertexClick}
                    innerProps={{
                        onContextMenu: (evt) => evt.preventDefault()
                    }}
                />
            </div>

            <button
                style={{ marginTop: '20px', padding: '8px 16px' }}
                onClick={() => setBoardState(createEmptyBoard())}
            >
                Clear Board
            </button>
        </div>
    );
}

export default App;